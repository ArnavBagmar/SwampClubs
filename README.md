# SwampClubs

SwampClubs is a web application designed to connect University of Florida students with clubs and organizations on campus. The platform provides features for discovering, joining, and engaging with clubs through group chats, event management, and student networking.


## Features

- **Club Discovery**: Browse and search through all official UF clubs and organizations
- **Club Chat Rooms**: Join dedicated chat spaces for specific clubs
- **Event Management**: Find and RSVP to upcoming club events (Coming Soon)
- **Student Networking**: Connect with like-minded Gators who share your interests

## Tech Stack

- **Frontend**:
  - Next.js 14 (React framework)
  - Tailwind CSS (styling)
  - shadcn/ui (component library)
  - Framer Motion (animations)
  - Lucide React (icons)

- **Backend**:
  - Next.js API routes
  - MongoDB (database)
  - Mongoose (ODM)
  - JWT (authentication)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB connection string

### Installation

1. Clone the repository
   ```
   git clone https://github.com/ArnavBagmar/swampclubs.git
   cd swampclubs
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
