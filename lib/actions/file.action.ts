"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStrignify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./texting";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const fileUpload = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();
  try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucket = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      fileType: getFileType(file.name).type,
      name: bucket.name,
      url: constructFileUrl(bucket.$id),
      extention: getFileType(file.name).extension,
      size: bucket.sizeOriginal,
      accountId,
      owner: ownerId,
      // path,
      users: [],
      bucketFileId: bucket.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.fileCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucket.$id);
        handleError(error, "Failed to upload file");
      });
    revalidatePath(path);
    return parseStrignify(newFile);
  } catch (error) {
    console.error("Detailed Error:", error);
    handleError(error, "Failed to upload file");
  }
};

const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) {
    queries.push(Query.equal("fileType", types));
  }
  if (searchText) {
    queries.push(Query.contains("name", searchText));
  }
  if (limit) {
    queries.push(Query.limit(limit));
  }

  const [sortBy, orderBy] = sort.split("-");

  queries.push(
    orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
  );

  return queries;
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser, types, searchText, sort, limit);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      queries
    );
    return parseStrignify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const renameFile = async ({
  extention,
  path,
  fileId,
  name,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extention}`;
    const updateFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      fileId,
      {
        name: newName,
      }
    );
    revalidatePath(path);
    return parseStrignify(updateFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const deleteFile = async ({
  path,
  bucketFileId,
  fileId,
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deleteFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,

      fileId
    );

    // delete from the bucket storage
    if (deleteFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }
    revalidatePath(path);
    return parseStrignify(deleteFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const shareFile = async ({
  path,
  fileId,
  emails,
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updateFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      fileId,
      {
        users: emails,
      }
    );
    revalidatePath(path);
    return parseStrignify(updateFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const getUserTotalSpace = async () => {
  const { databases } = await createSessionClient();
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");
    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      [Query.equal("owner", [currentUser.$id])]
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
    };
    files.documents.forEach((file) => {
      const TypeFile = file.fileType as FileType;
      totalSpace[TypeFile].size += file.size;
      // totalSpace[TypeFile].latestDate = file.updatedAt;
      totalSpace.used += file.size;

      if (
        !totalSpace[TypeFile].latestDate ||
        file.$updatedAt > totalSpace[TypeFile].latestDate
      ) {
        totalSpace[TypeFile].latestDate = file.$updatedAt;
      }
    });
    return parseStrignify(totalSpace);
  } catch (error) {
    handleError(error, "Failed to get user total space");
  }
};
