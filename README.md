# Student Team Members Management App

A full-stack web application for managing student team members, built with MERN

## Features

- Home page with welcome message and team introduction
- Add new team members with profile image upload
- View all team members in a responsive grid layout
- View detailed information for each team member
- Secure storage of member data and images with Supabase

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- TailwindCSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- Multer for file upload handling

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn



### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development servers:
   ```
   npm run dev:full
   ```

## API Endpoints

- `GET /api/members` - Fetch all team members
- `GET /api/members/:id` - Fetch a single team member by ID
- `POST /api/members` - Add a new team member (with multipart form data)

## Project Structure

```
/
├── public/                 # Static files
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── config/             # Configuration files
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── server/                 # Backend source code
│   └── index.js            # Express server setup
└── package.json            # Project dependencies and scripts
```

## Running the App

- Development mode: `npm run dev:full`
- Frontend only: `npm run dev`
- Backend only: `npm run server`
- Build for production: `npm run build`
