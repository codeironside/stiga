Here's the complete markdown version with enhanced formatting:

```markdown
# 🚀 Striga - Modern Business Solutions Platform

<div align="center">
  <img src="https://via.placeholder.com/1200x400.png?text=Striga+Business+Solutions" alt="Project Banner">
  
  ![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
  ![Tech Stack](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
  ![Tech Stack](https://img.shields.io/badge/MongoDB-7-orange?logo=mongodb)
  ![Tech Stack](https://img.shields.io/badge/TailwindCSS-3-blueviolet?logo=tailwind-css)
</div>

## 🌟 Features

- 🛠️ Full-stack business management solution
- 🔐 Role-based access control (Admin/Users)
- 📊 Interactive dashboard with real-time analytics
- ✍️ Blog management system
- 🖼️ Dynamic gallery management
- 🔄 RESTful API architecture

## 🚦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm 9+

```bash
git clone https://github.com/yourusername/striga.git
cd striga
```

## 🖥 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

🌐 **Access:** <http://localhost:3000>

![Frontend Preview](https://via.placeholder.com/600x300.png?text=Striga+Frontend+Preview)

## ⚙️ Backend Setup

```bash
cd backend
npm install
npm run dev
```

🔌 **API Endpoint:** <http://localhost:5000>

## 🌱 Database Initialization

```bash
cd backend
npm run seed
```

🔑 **Default Admin Credentials**

```plaintext
| Username | Password    |
|----------|-------------|
| admin1   | password123 |
| admin2   | password456 |
```

## ⚠️ Important Security Note

For initial login with seeded accounts:

```javascript
// In backend/controllers/userController.js
// TEMPORARILY COMMENT OUT PASSWORD VALIDATION
/*
if (!validatePassword(password)) {
  return res.status(400).json({ message: 'Invalid password format' });
}
*/
```

## 🔒 Password Validation Configuration

Customize validation rules in:

```javascript
// backend/controllers/userController.js
const validatePassword = (password) => {
  // Example validation:
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecial = /[!@#$%^&*]/;
  
  return password.length >= minLength && 
         hasNumber.test(password) && 
         hasSpecial.test(password);
};
```

## 🛠️ Project Structure

```bash
striga/
├── frontend/         # React application
│   ├── src/
│   └── public/
├── backend/          # Node.js server
│   ├── controllers/
│   ├── models/
│   └── routes/
└── README.md         # This document
```

## 🚨 Troubleshooting Guide

| Issue               | Solution                          |
|---------------------|-----------------------------------|
| Connection refused  | Verify MongoDB service is running |
| Invalid credentials | Check seed data and validation    |
| CORS errors         | Validate frontend .env configuration |
| Missing modules     | Run `npm install` in both directories |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📜 License

MIT License © 2024 [Codeironside]  
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

<div align="center">
  Made with ❤️ by oluwatobi ayoolao jolaosho | 📧 ayoola.oluwatobi.dev@gmail.com
</div>
```


