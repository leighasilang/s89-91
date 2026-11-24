# MEVN Blog Application

## Description

A full-stack Blog Application developed using the MEVN stack (MongoDB, Express.js, Vue.js, and Node.js).

The application allows users to register and log in, create and manage blog posts, view published stories, and interact through comments. It includes JWT-based authentication, password hashing, and role-based permissions.

The frontend is built with Vue.js and Bootstrap, providing a responsive and organized interface for users.

## Technologies Used

### Frontend
- Vue.js – Frontend framework
- Vue Router – Client-side navigation
- Axios – HTTP requests to the backend API
- Bootstrap – Responsive layout and styling
- CSS – Custom styling

### Backend
- Node.js – JavaScript runtime
- Express.js – Backend framework
- MongoDB – Database
- Mongoose – MongoDB object modeling
- bcrypt – Password hashing
- JSON Web Token (JWT) – User authentication
- dotenv – Environment variable management
- CORS – Cross-origin resource sharing

### Development Tools
- Visual Studio Code
- Postman – API testing
- Git and GitHub – Version control

## Features

### User Authentication
- User registration using email, username, and password.
- User login and logout.
- Password hashing using bcrypt.
- JWT-based authentication.
- User roles (User and Admin).
- Protected operations for authenticated users.

### Blog Management
- Create new blog posts.
- View all published blog posts.
- View individual blog posts.
- Display post title, content, author, and publication date.
- Update own blog posts.
- Delete own blog posts.
- Administrators can delete any blog post.

### Comments
- Authenticated users can add comments to blog posts.
- Display comments with the commenter's username.
- Display comment creation dates.
- Guests can view comments but must log in to add one.

### User Interface
- Responsive homepage with a blog navigation bar.
- Login and registration pages.
- Blog post cards.
- Individual post details page.
- Comments section.
- Consistent color palette and custom styling.

## Project Structure

```text
s90/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── pages/
│   │   │   ├── BlogPage.vue
│   │   │   ├── LoginPage.vue
│   │   │   ├── RegisterPage.vue
│   │   │   └── PostDetailsPage.vue
│   │   │
│   │   ├── router/
│   │   │   └── index.js
│   │   │
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   │
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## Development Steps

### Step 1: Create the Project Folder

1. Create a folder named `s90`.
2. Inside it, create two folders:
   - `server`
   - `client`
3. Open the project folder in Visual Studio Code.

### Step 2: Set Up the Backend

Open the terminal inside the `server` folder.

Initialize Node.js:

```bash
npm init -y
```

### Step 3: Install Backend Dependencies

```bash
npm install express mongoose dotenv cors bcrypt jsonwebtoken
```

Install nodemon:

```bash
npm install --save-dev nodemon
```

### Step 4: Configure the Backend

Configure the scripts in `server/package.json`:

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
}
```

Create a `.env` file inside the server folder:

```env
PORT=4000
MONGO_URI="----------"
JWT_SECRET="----------"
```

Create a `.gitignore` file:

```gitignore
node_modules/
.env
```

### Step 5: Create the Backend Files

Create the following folders and files:

- `models/` – User and Post schemas.
- `routes/` – Authentication and blog post routes.
- `middleware/` – JWT authentication middleware.
- `index.js` – Express server configuration.

### Step 6: Implement User Authentication

Create the User model with the following fields:

- email
- username
- password
- role

Implement the registration and login routes.

**Registration**
- Accept email, username, and password.
- Check for existing email or username.
- Hash the password using bcrypt.
- Save the new user in MongoDB.

**Login**
- Find the user using their email.
- Compare the entered password with the hashed password.
- Generate a JWT token after successful authentication.

### Step 7: Implement Authentication Middleware

Create `middleware/auth.js`.

The middleware:
- Checks for an Authorization token.
- Verifies the JWT using the secret key.
- Retrieves the authenticated user's information.
- Allows authorized requests to proceed.

### Step 8: Create the Post Model

Create `models/Post.js`.

The Post Schema contains:

- title
- content
- author
- comments
- createdAt
- updatedAt

The author references the User model.

Comments contain:
- user reference
- comment text
- creation date

Mongoose timestamps are used to automatically record post creation and update dates.

### Step 9: Create Blog Post Routes

Create `routes/posts.js`.

Implement the following operations:

**Create Post**
- Requires authentication.
- Accepts a title and content.
- Saves the authenticated user's ID as the author.

**Get All Posts**
- Public route.
- Retrieves all blog posts.
- Displays author information using `populate()`.

**Get Single Post**
- Public route.
- Retrieves an individual post using its ID.

**Update Post**
- Requires authentication.
- Checks whether the logged-in user owns the post.
- Only the original author can update it.

**Delete Post**
- Requires authentication.
- Allows the original author to delete their own post.
- Allows administrators to delete any post.

**Add Comment**
- Requires authentication.
- Checks whether the post exists.
- Saves the comment and authenticated user's ID.

### Step 10: Connect the Backend Routes

Inside `server/index.js`, import and register the routes:

```javascript
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);
```

Configure Express, CORS, JSON parsing, MongoDB connection, and the server port.

### Step 11: Test the Backend Using Postman

Start the backend server:

```bash
npm run dev
```

Test the following operations:

1. Register a new user.
2. Log in and retrieve a JWT token.
3. Create a blog post.
4. Retrieve all blog posts.
5. Retrieve a single blog post.
6. Update your own blog post.
7. Add a comment.
8. Delete your own blog post.
9. Test whether another user is prevented from updating or deleting your post.
10. Test whether an administrator can delete another user's post.

For protected routes, use:

`Authorization → Bearer Token → Paste JWT Token`

### Step 12: Set Up the Vue Frontend

Open a separate terminal inside the `client` folder.

Create the Vue application:

```bash
npm create vue@latest .
```

Configure the project with:
- TypeScript: No
- JSX: No
- Vue Router: Yes
- Pinia: No
- Vitest: No
- End-to-End Testing: No
- ESLint: No
- Prettier: No

Install the dependencies:

```bash
npm install
npm install axios bootstrap
```

### Step 13: Configure the Frontend

Create the Axios instance in `src/api/axios.js`.

Configure the backend API base URL:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api"
});

export default api;
```

Configure an Axios request interceptor to automatically attach the stored JWT token to protected requests.

Import Bootstrap and the custom stylesheet in `src/main.js`:

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./style.css";
```

### Step 14: Set Up Vue Router and Pages

Create the following pages:

- `BlogPage.vue` – Displays blog posts and provides post management.
- `LoginPage.vue` – Allows users to log in.
- `RegisterPage.vue` – Allows new users to register.
- `PostDetailsPage.vue` – Displays an individual post and its comments.

Configure Vue Router to navigate between the homepage, login, registration, and post details pages.

### Step 15: Implement Frontend Functionality

Connect the Vue pages to the backend using Axios.

Implement:
- User registration and login.
- JWT token and user information storage using localStorage.
- Logout functionality.
- Displaying all blog posts.
- Creating, editing, and deleting blog posts.
- Viewing individual blog posts.
- Adding and displaying comments.
- Displaying publication and comment dates.
- Showing or hiding features depending on the user's authentication and permissions.

### Step 16: Apply the User Interface Design

Use Bootstrap and custom CSS to create a responsive layout.

The application uses the following color palette:

- Seashore – `#83A0A4`
- Lavender – `#B2A1C0`
- Blue Petals – `#88A9B5`
- Yellow Flowers – `#F2C666`
- Soft Green – `#989568`

The interface includes a navigation bar, hero section, blog post cards, authentication forms, post details, comments, and footer.

### Step 17: Run the Complete Application

Open two separate terminals.

**Terminal 1 – Backend**

```bash
cd server
npm install
npm run dev
```

**Terminal 2 – Frontend**

```bash
cd client
npm install
npm run dev
```

Open the local URL provided by Vite, usually:

`http://localhost:5173`

Make sure MongoDB is connected and the backend is running before testing the frontend.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a user |
| POST | `/api/users/login` | Log in |
| POST | `/api/posts` | Create a post |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get a single post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |
| POST | `/api/posts/:id/comments` | Add a comment |

## How to Run the Project

## Test Accounts

The following accounts can be used to test the application's login and user-specific features.

| Account | Email | Password |
|---|---|---|
| User 1 | silver.mist@mail.com | silver123 |
| User 2 | tinker.bell@mail.com | tinker123 |
| Admin | admin@mail.com | admin123 |
| User 3 | lily.garden@mail.com | lily123 |

**Note:** Enter the corresponding test passwords when logging in. Keep actual passwords private if the repository is public.

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Configure the MongoDB connection string and JWT secret in `server/.env`.
4. Open a terminal inside the `server` folder and run:

```bash
npm install
npm run dev
```

5. Open another terminal inside the `client` folder and run:

```bash
npm install
npm run dev
```

6. Open the local frontend URL provided by Vite.
7. Register or log in to start using the application.

## Developer

Silang | S89-90 Activity 🪷