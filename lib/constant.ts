type InputName = "fullname" | "email" | "password" | "confirm_password";
export const SignUpProp: {
  input_name: InputName;
  label: string;
  placeholder: string;
  type: string;
}[] = [
  {
    input_name: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    label: "Full name",
  },
  {
    input_name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    input_name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
  {
    input_name: "confirm_password",
    type: "password",
    placeholder: "Confirm your password",
    label: "Confirm Password",
  },
] as const;

export const SignInProp = [
  {
    input_name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    input_name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
] as const;

export const navItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    url: "/dashboard",
  },
  {
    name: "Documents",
    icon: "/assets/icons/documents.svg",
    url: "/dashboard/documents",
  },
  {
    name: "Images",
    icon: "/assets/icons/images.svg",
    url: "/dashboard/images",
  },
  {
    name: "Media",
    icon: "/assets/icons/video.svg",
    url: "/dashboard/media",
  },
  {
    name: "Others",
    icon: "/assets/icons/others.svg",
    url: "/dashboard/others",
  },
];
export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const AvatarUrl =
  "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg";
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const myAvatar = [
  "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-vector/gradient-avatar-illustration_52683-142438.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-vector/gradient-avatar-illustration_52683-142426.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-psd/smiling-3d-cartoon-man_975163-762.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-vector/young-girl-with-pigtails_1308-176684.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869121.jpg?semt=ais_hybrid",
  //"https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869121.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/3d-cartoon-character-young-black-man-with-dreadlocks-sunglasses-gold-chain_605905-126815.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/portrait-african-male-student_684058-2123.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100279.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/occupational-therapist-digital-avatar-generative-ai_934475-9352.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-vector/man-with-glasses-vector-illustration_1308-177892.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/portrait-beautiful-smiling-woman-with-curly-hair-glasses_481311-7.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/embrace-diversity-with-this-vector-illustration-confident-black-girl-glasses-celebrating-individuality-every-design_972440-325.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303080.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/smiling-cartoon-character-with-dreadlocks-sunglasses-gold-chain-with-dollar-sign-pendant-1_605905-128721.jpg?semt=ais_hybrid",
  "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?semt=ais_hybrid",
];
