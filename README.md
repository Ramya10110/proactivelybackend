# Ramya’s Collaborative Form System:

A modern, real-time collaborative form builder and editor, inspired by Google Docs but for structured forms.
Built with Node.js, Express, PostgreSQL, React, Socket.io, and a beautiful teal-themed UI.

🚀 Features
Admins:

Register/login securely

Create forms with dynamic fields (text, number, dropdown, etc.)

Instantly get an invite code to share with collaborators

Users:

Register/login securely

Join a shared form with an invite code

Collaboratively fill out a single shared response in real-time

See live typing and edits from others

Real-time Collaboration:

Socket.io powers instant updates

Field-level locking to prevent overwrite conflicts

Modern UI:

Professional, responsive, and themed in blush green/teal

Clean navigation bar, animated landing video, and smooth forms

🛠️ Tech Stack
Backend: Node.js, Express, PostgreSQL (Sequelize ORM), Socket.io, JWT Auth

Frontend: React, React Router, Axios, Socket.io-client

Styling: CSS (custom, with gradients and responsive design)

Deployment-ready: Dockerizable, or run locally

📦 Folder Structure
text
collab-form-app/
├── backend/
│   └── ... (Express, Sequelize, Socket.io backend)
├── frontend/
│   └── ... (React app with all components)
⚡ Quick Start
1. Clone the Repo
bash
git clone https://github.com/yourusername/collab-form-app.git
cd collab-form-app
2. Backend Setup
bash
cd backend
npm install
# Set up your PostgreSQL database and .env file as described below
npm run dev
.env Example
text
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=collabuser
DB_PASS=yourpassword
DB_NAME=collabform
DB_PORT=5432
Create your database and user in PostgreSQL as per instructions in the repo.

3. Frontend Setup
bash
cd ../frontend
npm install
npm start
The app will run at http://localhost:3000

The backend runs at http://localhost:5000

📝 Usage
Register as an Admin or User.

Admins can create forms, add dynamic fields, and get invite codes.

Users can join a form using the invite code.

Collaborate in real-time:

All users see each other's changes instantly.

Field-level locking prevents accidental overwrites.

Navigation bar lets you switch between Home, Login, Register, Create/Join Form, and Collaborative Form.

🎨 Customization
Landing Page Video:
Place your banner.mp4 in frontend/src/components/ and it will show on the home page.

Theme:
All colors and gradients are easily adjustable in App.css.

🧩 API Endpoints
See backend API docs or use the included Postman collection.

🏆 Key Design Decisions
Real-time editing: Socket.io for fast, reliable updates

Field locking: Prevents race conditions and conflicting edits

JWT Auth: Secure, stateless authentication for both roles

Responsive UI: Works on desktop and mobile

Separation of concerns: Cleanly separated backend and frontend

🐞 Troubleshooting
Port conflicts? Change PORT in .env or package.json.

DB errors? Make sure PostgreSQL is running and credentials are correct.

Socket.io not updating? Ensure both frontend and backend are running and CORS is allowed.

📄 License
MIT.
Feel free to fork, use, and contribute!

🙏 Credits
Made with ❤️ by Ramya and contributors.
Inspired by Google Docs, Typeform, and modern collaborative tools.
