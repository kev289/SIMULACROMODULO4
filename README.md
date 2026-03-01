# Database Project with MySQL and MongoDB

This project is a simple application that combines relational and non-relational databases, along with a basic frontend for interaction.

## 🧱 Architecture

- **MySQL**: Used for storing structured, relational data.
- **MongoDB**: Employed for information that benefits from a flexible schema.
- **Basic Frontend**: Interface in `public/index.html` for manual testing of features.

## 📁 Project Structure

```
/Users/mac/Desktop/MODULE4
├── config/
│   ├── db.js         # Connection configuration for MySQL and MongoDB
│   └── multer.js     # File upload configuration (if applicable)
├── models/
│   └── history.js    # Example MongoDB model
├── public/
│   └── index.html    # Basic static frontend
├── uploads/          # Directory for uploaded files
├── index.js          # Main Node.js server file
├── package.json      # Dependencies and scripts
├── database.sql      # MySQL table creation script
├── prueba_migracion.csv
├── simulation_saludplus_data.csv
└── README.md         # Project documentation
```

## 🚀 Installation and Usage

1. **Clone the repository**
   ```bash
   git clone <repo-url> && cd MODULE4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure databases**
   - Adjust MySQL credentials and MongoDB URI in `config/db.js`.
   - Run `database.sql` on your MySQL server to create the necessary tables.

4. **Start the server**
   ```bash
   node index.js
   ```
   The server will be running at `http://localhost:3000` (or another configured port).

5. **Test the frontend**
   - Open `public/index.html` in a browser and make requests to the API.

## 📝 Current Features

- Simultaneous connections to MySQL and MongoDB.
- Example MongoDB schema in `models/history.js`.
- Basic endpoints defined in `index.js` (presumed).
- Rudimentary frontend for manual interaction.

## 🎯 Pending Tasks

1. **MongoDB URI**: Resolve connection issues.
2. **Frontend improvements**: Modularize and refine the interface.
3. **Deliverables**: Optimize documentation and overall structure.

## 📌 Additional Notes

- The application uses `multer` for file handling if needed.
- The `uploads` folder stores files uploaded by users.

---

This README now provides a clear overview of the project and guides to get started. Feel free to tweak it as features evolve.
