# React To-Do List & NASA Media Search

## Description
This is a simple React application that consists of two pages:
1. A **To-Do List** where users can add items to a list.
2. A **NASA Media Search** page where users can search for images, videos, and audio files using the NASA API and select items to display.

## Features
- **To-Do List:**
  - Users can add items to a list via an input field.
  - The list persists across page reloads using Redux and local storage.
- **NASA Media Search:**
  - Users can search for media using the NASA API.
  - Users can select and display images, videos, or audio files from the search results.
- **State Management with Redux:**
  - Uses Redux for state management.
  - Implements a custom Redux middleware to persist data in local storage.
- **No External State Persistence Libraries:**
  - Redux Persist is not used.

## Technologies Used
- React
- Redux & React-Redux
- Custom Redux Middleware for local storage persistence
- NASA API

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project folder:
   ```sh
   cd your-repo
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Justification of Technical Choices
- **Redux for State Management:** Ensures predictable state updates and centralizes application data.
- **Custom Middleware for Local Storage:** Prevents the need for third-party solutions like Redux Persist while ensuring data persistence.
- **NASA API Integration:** Demonstrates handling API calls and managing asynchronous data fetching.
- **Minimal Dependencies:** Only React, Redux, and React-Redux are used.
