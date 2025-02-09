"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStrignify } from "../utils";
import { cookies } from "next/headers";
import { AvatarUrl } from "../constant";
import { redirect } from "next/navigation";
// import { Account } from "node-appwrite";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};
// GET AN EXISTING USER
const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", email)]
  );

  return result.total > 0 ? result.documents[0] : null;
};

// SENDING OTP
export const sendEmailOtp = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Error creating email token");
  }
};

export const createAccount = async ({
  fullname,
  email,
  password,
}: {
  fullname?: string;
  email: string;
  password: string;
}) => {
  const getExistingUser = await getUserByEmail(email);

  const accountId = await sendEmailOtp(email);

  if (!accountId) throw new Error("Error sending OTP");

  if (!getExistingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullname,
        email,
        password,
        avatar_url: AvatarUrl,
        accountId,
      }
    );
  }

  return parseStrignify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 24,
    });
    console.log(session);
    return parseStrignify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
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

export const signOutUser = async () => {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out");
  } finally {
    redirect("/auth/sign-in");
  }
};

export const signinUser = async ({
  email,
}: // password,
{
  email: string;
  // password: string;
}) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOtp(email);
      return parseStrignify({ accountId: existingUser.accountId });
    }
    return parseStrignify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in");
  }
};
