# GitHub Repository Search Web Application

This web application allows users to search for repositories on GitHub.

## Getting Started

To get started with the development server, follow these steps:

1. Copy the `.env.example` file and create a new file named `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Open the newly created `.env.local` file in a text editor and set the following configurations:

   ```env
   # GitHub API 金鑰
   GITHUB_TOKEN=your-api-key

   # GitHub API 版本日期
   X_GITHUB_API_VERSION=2022-11-28
   ```

   Replace `your-api-key` with your actual GitHub API key.

3. Run the development server:

   ```bash
   npm run dev
   ```

   This will launch the application's development server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can now start working on the GitHub repository search functionality.

## Building and Running the Application

Once you have made the necessary changes and are ready to build and run the application for production, use the following commands:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the application:

   ```bash
   npm run start
   ```

These commands will compile the application for production and start the server to serve the optimized build. Make sure to test the production version to ensure everything is working as expected.
