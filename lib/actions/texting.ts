"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "../appwrite/config";
import { parseStrignify } from "../utils";

// const getUserByEmail = async (email: string) => {
//   const { databases } = await createAdminClient();

//   const result = await databases.listDocuments(
//     appwriteConfig.databaseId,
//     appwriteConfig.userCollectionId,
//     [Query.equal("email", email)]
//   );

//   return result.total > 0 ? result.documents[0] : null;
// };

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const verificationEmail = async () => {
  const { account } = await createSessionClient();
  try {
    await account.createVerification(
      `${process.env.NEXT_PUBLIC_APP_URL}/verify/verification-link`
    );
  } catch (error) {
    return error;
  }
};

export const signupUser = async (data: CreateUserParams) => {
  const { email, password, fullname: name, avatar_url: AvatarUrl } = data;

  const { account: adminAccount, databases } = await createAdminClient();
  try {
    const user = await adminAccount.create(ID.unique(), email, password, name);

    if (!user.$id) throw new Error("User not created");

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullname: name,
        email,
        avatar_url: AvatarUrl,
        accountId: user.$id,
      }
    );
    // }
    const session = await adminAccount.createEmailPasswordSession(
      email,
      password
    );
    if (!session) throw new Error("Session not created");

    if (session) {
      (await cookies()).set("appwrite-session", session.secret, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 60 * 24,
      });
    }
    await verificationEmail();

    return parseStrignify({ user });
  } catch (error) {
    handleError(error, "Error creating user");
  }
};

export const verifyEmail = async (userId: string, secret: string) => {
  const { account } = await createSessionClient();
  try {
    await account.updateVerification(userId, secret);
    console.log("Email verified successfully");
  } catch (error: any) {
    console.error("Verification error:", error.message);
    throw error;
  }
};

export const loginUser = async (data: CreateUserParams) => {
  const { email, password } = data;
  const { account } = await createAdminClient();

  try {
    // const existingUser = await getUserByEmail(email);

    // if (existingUser) {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error("Session not created");

    if (session) {
      (await cookies()).set("appwrite-session", session.secret, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 60 * 24,
      });
    }

    const user = await getMiddleWareUser();
    if (!user) throw new Error("User not found");

    console.log(user);

    if (!user.emailVerification) {
      console.log("Sending email.....");
      await verificationEmail();
    }

    return parseStrignify({ session });
  } catch (error: any) {
    handleError(error, "Error creating user");
  }
};

export const getMiddleWareUser = async () => {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) throw new Error("Session client is undefined");

    const user = await sessionClient.account.get();

    return parseStrignify(user);
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", result.$id)]
  );
  if (user.total <= 0) return null;
  return parseStrignify(user.documents[0]);
};
