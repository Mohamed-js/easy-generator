# Easy Generator Test

A simple full-stack application for user authentication built with **Nest.js** on the backend and **React.js/Vite** on the frontend.

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js (>= 18.x)
- npm (>= 9.x)
- MongoDB (>= 6.x)

## Folder Structure

```
.
├── backend/    # Nest.js Backend API
└── frontend/   # React.js Frontend App
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Mohamed-js/easy-generator.git
cd easy-generator-test
```

2. Install all dependencies:

```bash
npm run install
```

This will install dependencies for both **backend** and **frontend**.

## Environment Variables

### Backend
Create a `.env.development` file inside the `backend/` directory with the following environment variables:

```
MONGO_URI=mongodb://localhost:27017/EasyGenDB
JWT_SECRET=JWT_Secret_KEY_IS_NOT_SECRET_NOW_AS_I_KNOW_IT_HAHAHAHA
PORT=3000
FRONT_SECRET_KEY=SOME_SORT_OF_SECRET_KEYYYYY
```

### Frontend
Create a `.env` file inside the `frontend/` directory with the following environment variables:

```
VITE_API_URL=http://localhost:3000
VITE_FRONT_SECRET_KEY=SOME_SORT_OF_SECRET_KEYYYYY
```

## Running the Project

To start both the **backend** and **frontend** in development mode, run:

```bash
npm run dev
```

- Backend API will run on: `http://localhost:3000`
- Swagger API Docs will be available at: `http://localhost:3000/api/docs`
- Frontend App will run on: `http://localhost:5173`

## Usage

1. Go to `http://localhost:5173`
2. Sign up for a new account.
3. Log in with your credentials.
4. Navigate to the protected **Profile** page.

## Tech Stack

### Backend
- Nest.js
- Mongoose
- JWT Authentication
- Swagger Documentation
- Winston Logging

### Frontend
- React.js with Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Zod Validation
- React Toastify

## License
This project is licensed under the **ISC** License.

## Author
Mohamed Atef

