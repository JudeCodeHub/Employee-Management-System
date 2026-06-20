# 👥 Employee Management System (CRUD Portal)

A sleek, modern Employee Management System. This is a full-stack CRUD (Create, Read, Update, Delete) application that allows you to easily manage employee records with an elegant user interface.

## ✨ Features

- **Full CRUD Functionality**: Add, view, edit, and delete employee records instantly.
- **Auto-Generating IDs**: The backend automatically scans the database and assigns a sequential, unique Employee Number to every new hire.
- **Premium UI/UX Design**: Fully responsive, compact dashboard view with smooth micro-animations, glassmorphism modal effects, and a sleek modern color palette powered by Google's Inter font.
- **Robust Error Handling**: Frontend validation combined with backend database checks to ensure data integrity.

## 💻 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript (Zero frontend frameworks for maximum performance).
- **Backend**: Node.js & Express.js (REST API).
- **Database**: MongoDB (via Mongoose ODM).

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone <your-github-repo-url>
   cd employee-management-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0...
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

5. **View the App**
   Open your browser and navigate to: `http://localhost:3000`
