# 🚀 Minimal REST Client (Express + React + MikroORM)

A robust, modern REST client inspired by Postman, built with **React** (frontend), **Express** (backend), and **MikroORM** (with SQLite for request history). Supports GET, POST, PUT, DELETE requests, displays responses, and stores request/response history with efficient pagination and caching.

---

## 🛠️ Technologies Used

- **Frontend:** React (Create React App)
- **Backend:** Express.js (Node.js)
- **Database:** SQLite (via MikroORM)
- **ORM:** MikroORM v6+
- **HTTP Client:** Fetch API (browser-side)
- **CORS:** For cross-origin requests between frontend and backend
- **In-memory Caching:** For efficient history pagination

---

## 📁 Project Structure

```
/server
  index.js                # Express server and API routes
  mikro-orm.config.js     # MikroORM configuration
  /entities
    RequestLog.js         # MikroORM entity (EntitySchema)
/client
  src/
    App.js                # Main React app
    /components
      RequestForm.js      # Form to send requests
      History.js          # Paginated request history
```

---

## 🚦 Getting Started

### 1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. **Install Dependencies**

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. **Run the Application**

#### Start the Backend

```bash
cd ../server
node index.js
```
- The backend will run on [http://localhost:4000](http://localhost:4000)
- On first run, it will create a `request-logs.sqlite3` database file.

#### Start the Frontend

```bash
cd ../client
npm start
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage

1. **Open** [http://localhost:3000](http://localhost:3000) in your browser.
2. **Enter a URL** (e.g., `https://jsonplaceholder.typicode.com/posts/1`).
3. **Select HTTP method** (GET, POST, PUT, DELETE).
4. **(Optional) Enter request body** for POST/PUT.
5. **Click Send** to make the request.
6. **View the response** below the form.
7. **Browse request history** in the history section (with pagination).

---

## 🏆 How This Project Meets All Company Requirements

### 1. **Robust Backend with Express & MikroORM**
- **Express.js** provides a stable, production-ready REST API.
- **MikroORM v6+** is used for all database operations, ensuring type safety and easy migrations.
- **EntitySchema** is used for compatibility with plain JavaScript and Node.js.
- **Request-specific EntityManager** (`orm.em.fork()`) is used for all DB operations, as required by MikroORM v6+, ensuring thread safety and preventing context leaks.

### 2. **Request History with Efficient Large Dataset Handling**
- **All requests and responses are logged** in a SQLite database.
- **Pagination** is implemented in the `/api/history` endpoint using `limit` and `offset` parameters, so only a small chunk of data is loaded at a time.
- **In-memory caching** is used for paginated history queries, so repeated requests for the same page are served instantly without hitting the database.
- **Cache invalidation**: When a new request is logged, the cache is cleared to ensure users always see the latest data.

### 3. **Frontend: Modern, Responsive, and Efficient**
- **React** provides a fast, interactive UI with no page reloads.
- **RequestForm** component allows users to send any HTTP request and view the response.
- **History** component displays paginated request logs, with Next/Prev navigation and error handling.
- **Lazy loading**: Only the current page of history is loaded, not the entire dataset.

### 4. **Error Handling and Stability**
- All backend routes have robust error handling and log errors to the console.
- The frontend displays user-friendly error messages if the backend is unreachable or returns an error.
- CORS is enabled for smooth local development.

### 5. **Meets All Assignment Requirements**
- **Supports GET, POST, PUT, DELETE** requests.
- **Displays response data** (status, headers, body) without page reloads.
- **Uses MikroORM** for storing and displaying historical requests.
- **Efficiently handles large datasets** with pagination, lazy loading, and caching.
- **UI is functional and modern** (not a Postman clone, as requested).

---

## 🩺 Troubleshooting

- **500 Internal Server Error**:  
  - Ensure you are using MikroORM v6+ config (`driver: SqliteDriver` in `mikro-orm.config.js`).
  - Ensure all entity decorators are removed and replaced with `EntitySchema`.
  - Ensure all route handlers use `orm.em.fork()`.

- **History not showing**:  
  - Make sure you have sent at least one request.
  - Check backend logs for errors.

---

## 🧪 Sample URLs to Test

- **GET:**  
  `https://jsonplaceholder.typicode.com/posts/1`
- **POST:**  
  `https://jsonplaceholder.typicode.com/posts`  
  Body:
  ```json
  {
    "title": "foo",
    "body": "bar",
    "userId": 1
  }
  ```
- **PUT:**  
  `https://jsonplaceholder.typicode.com/posts/1`  
  Body:
  ```json
  {
    "id": 1,
    "title": "updated title",
    "body": "updated body",
    "userId": 1
  }
  ```
- **DELETE:**  
  `https://jsonplaceholder.typicode.com/posts/1`

---

## 📜 License

MIT

---

## 👤 Author

- [Your Name]
- [Your Contact/LinkedIn/GitHub]

---

**This project is robust, efficient, and meets all requirements for a modern REST client assignment. Good luck with your placement!** 