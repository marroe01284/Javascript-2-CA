## Social Media App - Javascript CA 
This project is a client-side application for a social media platform. It allows users to create, read, update, and delete (CRUD) posts, as well as manage their profiles. The app interacts with an API for social media functionality and ensures users are authenticated before accessing certain features.

# Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Event Listeners](#event-listeners)
- [Authentication](#authentication)
- [Profile Management](#profile-management)
- [Posts Management](#posts-management)
- [Error Handling](#error-handling)


## Features
User authentication (Login, Logout, Register)

Profile management (View and update profile details, including bio, avatar, and banner images)

CRUD operations for posts (Create, read, update, and delete posts)

Pagination for posts

Responsive design (HTML, CSS)

Form validation and error handling

## Technologies
- HTML5: Markup language for structuring the web content.
- CSS3: Styling the application.
- JavaScript (ES6+): Core language used for functionality.
- Fetch API: For making HTTP requests to the backend API.
- Vite: Development environment and build tool.
- LocalStorage: For storing tokens and user data on the client-side.

# Getting Started

## Prerequisites
Node.js (v14+)
NPM or Yarn

## Installation
Clone the project repository to your local machine.
```bash
git clone https://github.com/marroe01284/Javascript-2-CA.git
```

## Install the dependencies:
```bash
cd Javascript-2-CA
npm install
```
## Running the App
To start the development server:
```bash
npm run dev
```

The app will be running on http://localhost:5181/

## Folder Structure
The project is organized as follows:
```plaintext
src/
│
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   ├── post/
│   │   ├── create.js
│   │   ├── delete.js
│   │   ├── read.js
│   │   ├── update.js
│   ├── profile/
│       ├── read.js
│       ├── update.js
│
├── js/
│   ├── ui/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   ├── global/
│   │   │   ├── logout.js
│   │   ├── post/
│   │   │   ├── create.js
│   │   │   ├── update.js
│   │   │   ├── delete.js
│   │   ├── profile/
│       │   ├── update.js
│
├── styles/
│   ├── style.css
│
└── index.html
└── app.js
```

Key Directories
- api/: Handles API interaction and data fetching.
- js/ui/: Contains UI logic, event handlers for various functionalities.
- styles/: CSS for styling the app.
- API Endpoints
- The app interacts with an external API for CRUD operations and authentication:

- Login: /auth/login/
- Register: /auth/register/
- Create Post: /social/posts/
- Read Post: /social/posts/:id
- Update Post: /social/posts/:id
- Delete Post: /social/posts/:id
- User Profile: /social/profiles/:username
- Update Profile: /social/profiles/:username
## Project Structure
- authGuard(): Ensures the user is authenticated before accessing certain pages.
- onLogin(), onRegister(), onLogout(): Handles user authentication and registration.
- CRUD functions: For creating, reading, updating, and deleting posts and profiles.
## Event Listeners
- Login Form Submission: Attaches the onLogin function to the form submit event.
- Post Creation: Attaches the onCreatePost function to the create post form.
- Profile Update: Attaches the onUpdateProfile function to the profile update form.
- Post Deletion: Attaches the onDeletePost function to delete buttons on posts.
## Authentication
- Login: Users can log in with their email and password. On successful login, a token is stored in localStorage.
- Logout: Removes the token and user data from localStorage, and redirects the user to the login page.
- Register: Handles user registration with optional fields for bio, avatar, and banner images.
## Profile Management
- View Profile: Displays the user's profile, including bio, avatar, and banner.
- Update Profile: Allows the user to update their profile information (bio, avatar, banner).
## Posts Management
- Create Post: Users can create a new post by providing a title, body, tags, and media.
- Edit Post: Users can edit their own posts, and the form is pre-filled with the post data.
- Delete Post: Users can delete their own posts.
## Error Handling
- Alerts are displayed to the user for failed login, registration, or post operations.
Console logging is used to capture and debug errors during API calls.
