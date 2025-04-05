cat << 'EOF' > README.md
# 🌐 INSAIGHT - Frontend

**INSAIGHT** is a dynamic platform designed to showcase student creativity and promote institutional talent. The platform enables students to share their projects, performances, and creative work, which can be reviewed and selected by members of the INSAIGHT Department for featuring in the institute's monthly magazine. In addition, the platform hosts a dedicated Eco Einstein Club section to highlight environmental initiatives and sustainability efforts — bridging creativity with conscious living and responsible citizenship.



This repository holds the **frontend code**, built with **React.js** using **Vite**, **Tailwind CSS**, and **modular architecture**.

---

## 🚀 Features

- 🔐 Auth UI (login/register) 
- 📰 Post announcements with optional media attachments
- 🧑‍🏫 Role-based access and navigation
- 📲 Responsive UI 
- ♻️ Reusable component structure for maintainability
- 🌓 Light/dark theme support (coming soon)

---

## 🏗️ Project Structure

\`\`\`
front-end-INSAIGHT/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   ├── bg.png
│   │   └── logos/
│   │       ├── crlogo.png
│   │       └── faclogo.png
│   │
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── PostCard.jsx
│   │   └── ...
│   │
│   ├── constants/
│   │   └── index.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── CRSection.jsx
│   │   └── FacultySection.jsx
│   │
│   ├── utils/
│   │   └── validateUser.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
\`\`\`

---

## 🧰 Tech Stack

- **React.js** 
- **React Router DOM**
- **React Context API**
- *in other repository*

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js (v16+)
- npm 
### 📥 Installation

\`\`\`bash
git clone https://github.com/tusaaaaar/front-end-INSAIGHT.git
cd front-end-INSAIGHT
npm install
\`\`\`

### ▶️ Run Locally

\`\`\`bash
npm run dev
\`\`\`



---

## 🎯 Roles (Planned)


- **📝 INSAIGHT Department:**  
  Acts as the content review committee. Responsible for evaluating student submissions, curating exceptional entries, and selecting top content for publication in the institute’s monthly magazine.

- **🎓 Students:**  
  Primary contributors to the platform. Can upload academic projects, creative works, artwork, and performances. They can also explore submissions by peers to foster a collaborative and inspiring environment.

- **🌱 Eco Einstein Club Members:**  
  Share regular updates on the club’s sustainability initiatives, including environmental campaigns, awareness drives, plogging sessions, and campus eco-activities to promote green living.


---

## 🧩 To-Do (Upcoming Features)

- 🌓 Theme switcher (light/dark)
- 📱 Mobile optimization
- 📨 Notifications & bookmarking system

---

## 🤝 Contributing

\`\`\`bash
# Fork the repo
# Create a new branch
git checkout -b feature/newComponent
# Make changes, then commit
git commit -m "Added new reusable button component"
# Push and open a PR
git push origin feature/newComponent
\`\`\`

---

## 📸 Screenshots (Optional)

> Screen shot idhr aaye ga
---

## 🧑‍💻 Authors

- [Tushar](https://github.com/tusaaaaar)
- [Sugam Rai]
- [T Charan Kumar]

---

## 📜 License

This project is licensed under the **MIT License** — use it, modify it, build on it.

---

## 💬 Questions?

Feel free to raise an issue or drop a message at  
📧 **tushar@example.com** (replace with your real one)
EOF
