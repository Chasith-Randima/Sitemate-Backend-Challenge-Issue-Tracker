# Sitemate Issue Tracker - Installation Guide

## Technologies Used
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, JWT Authentication
- **Frontend**: Next.js, React, Tailwind CSS
- **Containerization**: Docker, Docker Compose
- **Database**: MongoDB (Hosted on MongoDB Atlas)

## Key Features
### Backend
- User authentication (JWT)
- Issue tracking (CRUD operations)
- MongoDB as database with Mongoose ORM

### Frontend
- UI built with React and Next.js
- Tailwind CSS for styling
- Axios for API requests

## Folder Structure Overview

```plaintext
backend/
    src/
        config/
            db.ts
            dotenv.ts
        controllers/
            authController.ts
            issueController.ts
            userController.ts
        models/
            issueModel.ts
            userModel.ts
        routes/
            issueRoutes.ts
            userRoutes.ts
        utils/
            responseHandler.ts
        types/
            models/
                issueModel.ts
                userModel.ts
            utils/
                responseHandler.ts
            index.ts
        app.ts
        index.ts
    .dockerignore
    .env
    .gitignore
    Dockerfile
    nodemon.json
    package-lock.json
    package.json
    tsconfig.json

frontend/
    public/
    src/
    .dockerignore
    .env.local
    .gitignore
    Dockerfile
    next-env.d.ts
    next.config.mjs
    package-lock.json
    package.json
    postcss.config.mjs
    tailwind.config.ts
    tsconfig.json
```



## 1. Clone the Repository and Run Locally

### Prerequisites:
- Node.js installed (v20 or later)
- MongoDB Atlas (Set up a free cluster)
- Docker (Optional for Docker setup)

### Steps to Clone and Run Locally:
1. Clone the repository:
    ```bash
    git clone https://github.com/Chasith-Randima/Sitemate-Backend-Challenge-Issue-Tracker.git
    cd Sitemate-Backend-Challenge-Issue-Tracker
    ```
2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create an `.env` file:
     ```bash
     touch .env
     ```
   - Add the following environment variables to `.env`:
     ```env
     MONGO_URI=mongodb+srv://issue-tracker-sitemate:d8LFAnPXAj0ImgKb@cluster0.3mhko.mongodb.net/issue-tracker-sitemate?retryWrites=true&w=majority&appName=Cluster0
     SESSION_SECRET=your-secret-key
     PORT=3002
     NODE_ENV = development
     JWT_SECRET = thisismyverystrongjwtsecret
     JWT_EXPIRES_IN = 90d
     JWT_COOKIE_EXPIRES_IN = 90
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create an `.env.local` file:
     ```bash
     touch .env.local
     ```
   - Add the following environment variable to `.env.local`:
     ```env
     NEXT_PUBLIC_API_DEVELOPMENT=http://localhost:3002/api/v1
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```

Now, the frontend will be running on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:3002](http://localhost:3002).

## 2. Build Production Build and Run

### Backend:
- Navigate to the backend directory:
    ```bash
    cd backend
    ```
- Create a production build:
    ```bash
    npm run build
    ```
- Start the production build:
    ```bash
    npm run start:build
    ```

### Frontend:
- Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
- Build the production files:
    ```bash
    npm run build
    ```
- Start the production build:
    ```bash
    npm start
    ```

## 3. Create Docker Images and Use docker-compose up

### Steps to Use Docker Compose:
1. Ensure Docker is installed and running.
2. Build and run the containers using Docker Compose:
    ```bash
    docker-compose up --build
    ```
   This will:
   - Build Docker images for both the frontend and backend.
   - Start the backend at port 3002 and frontend at port 3000.

3. Stop the containers: To stop the services, press `CTRL + C` and then:
    ```bash
    docker-compose down
    ```

## 4. Use Existing Images from Docker Hub

pull images from docker hub

```
    docker pull randimasilva/sitemate-frontend-isuue-tracker
```
```
    docker pull randimasilva/sitemate-backend-isuue-tracker
```

then run
```
docker run -d -p 3000:3000 randimasilva/site-frontend-image
```
```
docker run -d -p 3002:3002 randimasilva/site-backend-image
```


## Key Commands Summary
- **Run Locally:**
  - Backend: `npm run dev` (in `backend/`)
  - Frontend: `npm run dev` (in `frontend/`)
  
- **Build for Production:**
  - Backend: `npm run build && npm run start:build`
  - Frontend: `npm run build && npm start`
  
- **Docker Compose:**
  - Build and run: `docker-compose up --build`
  - Stop: `docker-compose down`

