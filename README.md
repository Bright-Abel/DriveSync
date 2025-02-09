# Store It - README

## Overview

Store It is a cloud-based document storage platform, similar to Google Drive, that allows users to securely upload, manage, and access their documents from anywhere. Built with Next.js, Appwrite, and Tailwind CSS, it ensures a seamless and intuitive experience.

## Features

- **Secure Document Upload**: Users can upload and store documents securely.
- **User Authentication**: Secure login and registration using Appwrite authentication.
- **Email Verification**: Users must verify their emails before accessing the dashboard.
- **Role-based Access**: Restrict access to certain pages based on user verification status.
- **Dark Mode Support**: Fully responsive UI with theme switching.
- **Dashboard**: A user-friendly dashboard for managing uploaded documents.
- **Cloud Storage**: Efficient and scalable document management with Appwrite.

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Appwrite as a backend-as-a-service (BaaS)
- **State Management**: Redux Toolkit
- **Authentication**: Appwrite authentication & cookies for session management
- **Styling**: Tailwind CSS with custom theme support

## Installation

### Prerequisites

- Node.js (>= 18)
- npm
- Appwrite instance configured

### Steps

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/store_it.git
   cd store_it
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables** Create a `.env.local` file and configure it with the required values:

   ```env
   NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_DATABASE=database_id
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=user_coection_id
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=files_collection_id
   NEXT_PUBLIC_APPWRITE_BUCKET=bucket_id
   NEXT_APPWRITE_KEY=appwrite_project_key

   ```

4. **Run the Development Server**

   ```sh
   npm run dev  # or npm run dev / yarn dev
   ```

   The app will be available at `http://localhost:3000`

## Middleware Handling

The app uses Next.js middleware to enforce authentication:

- **Unauthenticated users** are redirected to `/auth/sign-in`.
- **Unverified users** are redirected to `/verify/email-verification`.
- **Verified users** are redirected to `/dashboard` when they try to access `/auth` pages.

## Deployment

### Vercel

1. Install Vercel CLI:
   ```sh
   npm i -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

## License

MIT License
