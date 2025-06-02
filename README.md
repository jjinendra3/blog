### 🚀 Getting Started

Make sure you have the following installed:

* **Node.js** (version 18 or higher)
* **npm** or **Bun** (package manager)

---

### 📦 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Set up environment variables**

   * In the `frontend/` folder, create a `.env.local` file and add:

     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

   * In the `backend/` folder, create a `.env` file and add:

     ```env
     DATABASE_URL=""
     JWT_SECRET=""
     ```

3. **Run the installer**

   ```bash
   npm run installer
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to view the application.
