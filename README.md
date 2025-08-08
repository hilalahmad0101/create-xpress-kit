# 🚀 create-xpress-kit

![npm version](https://badge.fury.io/js/create-xpress-kit.svg)
![downloads](https://img.shields.io/npm/dm/create-xpress-kit.svg)
![license](https://img.shields.io/npm/l/create-xpress-kit.svg)

A lightweight **Node.js CLI tool** to scaffold **Express.js applications** with **MongoDB integration**. Generate a ready-to-go Express boilerplate with CRUD operations in one command.

---

## 📦 Features

- ✅ **Express.js Boilerplate** - Complete MVC structure ready to use
- ✅ **MongoDB & Mongoose** - Database integration with ODM
- ✅ **CRUD Operations** - User controller with RESTful endpoints
- ✅ **Modern Node.js Setup** - ES6+ syntax and best practices
- ✅ **Environment Configuration** - Production-ready config management
- ✅ **Express Generator Alternative** - Faster and more opinionated setup

---

## 📥 Installation

Install the CLI tool globally using npm:

```bash
npm install -g create-xpress-kit
```

---

## ⚙️ Usage

Create a new Express project with a single command:

```bash
create-xpress-kit myapp
```

This will create a new folder `myapp/` with your starter project.

**Next steps:**

```bash
cd myapp
npm install
npm start
```

Your Express server will be running on `http://localhost:5000` 🎉

---

## 📁 Project Structure

```
myapp/
├── config/
│   └── connectDB.js          # Database connection setup
├── controllers/
│   └── user.controller.js    # User CRUD operations
├── models/
│   └── User.model.js         # User database model
├── app.js                    # Main Express application
├── package.json              # Project dependencies
└── .env                      # Environment variables (create manually)
```

---

## 🛠️ Environment Setup

Create a `.env` file in your project root with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
```

**Required Environment Variables:**
- `PORT` - The port your server will run on
- `MONGO_URI` - Your MongoDB connection string

---

## 🚦 Getting Started

1. **Create your project:**
   ```bash
   create-xpress-kit my-awesome-app
   ```

2. **Navigate to your project:**
   ```bash
   cd my-awesome-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

5. **Start development server:**
   ```bash
   npm start
   ```

---

## 📚 What's Included

Your generated project includes:

- **Express.js server** with basic middleware
- **MongoDB integration** with Mongoose
- **User model and controller** with example CRUD operations
- **Environment configuration** for different deployment stages
- **Clean project structure** following Node.js best practices

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the Node.js community
- Inspired by create-react-app and similar CLI tools
- Thanks to all contributors who make this project better

---

**Happy coding! 🎯**

*Made with ❤️ by Hilal Ahmad*