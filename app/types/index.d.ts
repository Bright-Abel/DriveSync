interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

type FileType = "document" | "image" | "video" | "audio" | "other";

interface ActionType {
  label: string;
  icon: string;
  value: string;
}

interface RenameFileProps {
  fileId: string;
  name: string;
  extention: string;
  path: string;
}

interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}

interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}
interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}

interface CreateUserParams {
  phone?: string;
  password: string;
  email: string;
  fullname?: string;
  avatar_url?: string;
  accountId?: string;
}
