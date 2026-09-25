# SonicStore Backend

Node.js + Express + MongoDB (Mongoose) REST API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI` — your MongoDB connection string (local or MongoDB Atlas — Atlas has a free tier, no install needed)
   - `JWT_SECRET` — any random string, used to sign login tokens
   - `PORT` — defaults to 5000

3. (Optional but recommended) Seed the database with sample products:
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm run dev
   ```
   Server runs at http://localhost:5000

## Folder structure

```
backend/
├── config/db.js          - connects to MongoDB
├── models/                - Mongoose schemas (User, Product, Order)
├── middleware/             - JWT auth middleware (protect routes)
├── controllers/            - the actual logic for each route
├── routes/                 - maps URLs to controller functions
├── seed.js                 - fills the DB with sample products
└── server.js                - app entry point
```

## API Routes

| Method | Route                     | Access  | Description                       |
|--------|---------------------------|---------|------------------------------------|
| POST   | /api/auth/register        | Public  | Register new user (bcrypt-hashed password) |
| POST   | /api/auth/login           | Public  | Login, returns a JWT token         |
| GET    | /api/auth/profile         | Private | Get logged-in user's profile       |
| GET    | /api/products             | Public  | Get all products (supports ?keyword= and ?category=) |
| GET    | /api/products/categories/all | Public | Get list of all categories     |
| GET    | /api/products/:id         | Public  | Get single product                 |
| POST   | /api/orders                | Private | Place an order (simulated checkout) |
| GET    | /api/orders/myorders        | Private | Get logged-in user's past orders   |

"Private" routes need a header: `Authorization: Bearer <token>` (the frontend already handles this automatically).

## Key concepts used (good for interview talking points)

- **bcrypt** — passwords are hashed with `bcryptjs` inside a Mongoose `pre("save")` hook in `models/User.js`, so plain-text passwords are never stored.
- **JWT (JSON Web Tokens)** — on login/register we sign a token containing the user's id (`generateToken()` in `authController.js`). The frontend sends this token on every request; `middleware/authMiddleware.js` verifies it and blocks the request if invalid.
- **MVC-style structure** — routes → controllers → models, kept separate so each file has one job.
- **REST routing** — resources (`/products`, `/orders`, `/auth`) each get their own Express router.
