# 🚀 FUTURE_FS_02 — Lead Management CRM

A modern full-stack Lead Management CRM application developed as part of the **Future Interns Full Stack Web Development Internship**.

The application allows users to create, view, update, and delete leads through a clean and responsive dashboard. Lead data is stored in **MongoDB Atlas**, while the backend API and frontend are deployed on **Render**.

---

## 🌐 Live Demo

### Frontend
https://future-fs-02-frontend-mtme.onrender.com

### Backend API
https://future-fs-02-cxjq.onrender.com

### GitHub Repository
https://github.com/ishakamalih-blip/FUTURE_FS_02

---

## ✨ Features

- ➕ Create new leads
- 📋 View all leads
- ✏️ Update existing leads
- 🗑️ Delete leads
- 🔄 REST API integration
- 🍃 MongoDB Atlas database integration
- ☁️ Cloud deployment
- 📱 Responsive user interface
- ⚡ Fast React + Vite frontend
- 🔐 Environment-variable based database configuration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- Vite

### Backend

- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Render
- GitHub

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │      Vite + Axios    │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Node.js + Express │
                    │       Backend API    │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │   Leads Collection   │
                    └──────────────────────┘
📌 CRUD Operations

The application implements complete CRUD functionality.

Create

Users can add a new lead using the lead form.

Read

All stored leads are displayed in the dashboard.

Update

Existing lead information can be edited and updated.

Delete

Leads can be permanently removed from the database.

🔗 API Endpoints
Get All Leads
GET /api/leads
Create a Lead
POST /api/leads
Update a Lead
PUT /api/leads/:id
Delete a Lead
DELETE /api/leads/:id
📂 Project Structure
FUTURE_FS_02/
│
├── server/
│   ├── models/
│   │   └── Lead.js
│   │
│   ├── routes/
│   │   └── leadRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── assets/
│   ├── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── package-lock.json
└── README.md
⚙️ Local Installation
1. Clone the Repository
git clone https://github.com/ishakamalih-blip/FUTURE_FS_02.git
2. Open the Project
cd FUTURE_FS_02
3. Install Frontend Dependencies
npm install
4. Install Backend Dependencies
cd server
npm install
5. Configure Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
6. Start Backend
node server.js
7. Start Frontend

Open another terminal in the project root:

npm run dev
🔐 Environment Variables

The MongoDB connection string is stored using an environment variable instead of hard-coding database credentials.

Example:

MONGODB_URI=your_mongodb_connection_string

Never commit your .env file or database password to GitHub.

☁️ Deployment
Frontend

The React/Vite frontend is deployed on Render.

Live URL:

https://future-fs-02-frontend-mtme.onrender.com

Backend

The Node.js/Express backend is deployed on Render.

Backend URL:

https://future-fs-02-cxjq.onrender.com

Database

Lead information is stored in MongoDB Atlas.

🧪 Testing

The following functionality has been tested successfully:

✅ Create Lead
✅ View Leads
✅ Update Lead
✅ Delete Lead
✅ REST API communication
✅ MongoDB data persistence
✅ Production deployment
✅ Frontend and backend integration
🎯 Project Objective

The objective of this project is to develop a practical full-stack CRM application that demonstrates:

Frontend development
Backend development
REST API development
Database integration
CRUD operations
API communication
Cloud deployment
Environment configuration
Full-stack application architecture
🚀 Future Enhancements

Possible future improvements include:

🔐 User authentication and authorization
👥 Role-based access control
📊 CRM analytics dashboard
🔎 Advanced search and filtering
📄 Lead export to CSV/PDF
📧 Email notifications
📱 Improved mobile experience
📈 Lead conversion analytics
👩‍💻 Developer

Isha Kamalia

B.Tech Computer Engineering

🎓 Internship

Developed as part of the:

Future Interns — Full Stack Web Development Internship

🙏 Acknowledgement

Thanks to Future Interns for providing the opportunity to work on a practical full-stack web development project.

📜 License

This project is developed for educational and internship purposes.
## 📸 Screenshots

### Lead Management Dashboard

The Lead Management Dashboard provides an overview of total leads and allows users to search, add, edit, and delete lead records.

![Lead Management Dashboard](screenshots/dashboard.png)
