# 葵 To-Do (Frontend)

## Screenshots

<img src="https://github.com/user-attachments/assets/56a4d826-e5d3-477e-b5e1-7bec1477ce3b" alt="Login Page" height="400" />
<img src="https://github.com/user-attachments/assets/a1748833-5613-4929-8c9a-3ee38fc260d0" alt="Signup Page" height="400" />
<img src="https://github.com/user-attachments/assets/99b5a5ce-8404-4dc9-81e1-77b8253a18aa" alt="Main-Page" height="400" />
<img src="https://github.com/user-attachments/assets/2e9117c7-13f1-4072-8938-a43152ec21c2" alt="Categories-SideBar" height="400" />


**Live Demo:** [葵 To-Do](https://aoi-todo-list-keeping-it-simple.vercel.app)
**Backend Repository:** [葵 To-Do-Backend](https://github.com/sj-learns/aoi-todo-list-backend)



## The Story Behind Aoi To-Do

Hello there!

Many of us like to organize our tasks using different to-do list apps, focus apps, or Notion templates. These tools can help us create structure and plan our day. However, for people with ADHD or ADHD-like symptoms, some productivity systems—especially complex Notion templates—can feel overwhelming. Instead of making things easier, they can create confusion and sometimes lead to even more procrastination.

That’s what inspired me to build this To-Do List App.

Taking inspiration from apps like **Todoist**, which focuses on a simple and easy-to-understand task structure, and **Habitica**, which uses rewards and gamification to provide extrinsic motivation, I wanted to create something that combines simplicity with a little bit of fun.

The app has a straightforward structure inspired by Todoist, while also featuring anime characters from *Jujutsu Kaisen* (for now) that randomly give you motivating lines while you work through your tasks. The idea is to provide a small extra push of extrinsic motivation without making the app complicated or overwhelming. I’ve kept the interface simple to use and styled it with a soothing background theme to make managing tasks feel a little more enjoyable.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js, React (Vite)
* **Database:** MongoDB (Atlas)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **Deployment:** Render & Vercel
* **Styling:** Tailwind

## 🛠️ Local Setup Instructions

To run this project locally on your machine, you will need to set up both the backend and frontend.

### 1. Backend Setup
First, clone the backend repository and start the server.

```bash
git clone [https://github.com/sj-learns/aoi-todo-list-backend.git](https://github.com/sj-learns/aoi-todo-list-backend.git)
cd aoi-todo-list-backend
npm install
```
Create a .env file in the root of the backend directory and add your credentials:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```
node server.js
```

### 2. Frontend Setup
Open a new terminal, clone the frontend repository, and start the React development server.

```bash
git clone [https://github.com/sj-learns/aoi-todo-list-app-frontend.git](https://github.com/sj-learns/aoi-todo-list-app-frontend.git)
cd aoi-todo-list-app-frontend
npm install
```
Create a .env file in the root of the frontend directory and link it to your local backend:

```Code snippet
VITE_API_URL=http://localhost:5000
```

Start the frontend app:

```bash
npm run dev
```
Do try it out! Thank you!
