# SonicStore — Full-Stack E-Commerce Platform

MERN Stack (MongoDB, Express.js, React.js, Node.js) audio-gear store with JWT
authentication, bcrypt password hashing, and a persistent shopping cart.

The project is split into two independent folders:

```
sonicstore/
├── backend/     Node.js + Express + MongoDB REST API
└── frontend/    React + Tailwind CSS client
```

Each folder has its own `package.json` and its own README with setup steps.

## Quick start

**1. Backend** (terminal 1)
```
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI if needed
npm run seed               # adds sample products
npm run dev
```
Runs at http://localhost:5000

**2. Frontend** (terminal 2)
```
cd frontend
npm install
npm run dev
```
Runs at http://localhost:3000 — open this in your browser.

## What it does

- Browse products, search, and filter by category
- Register / login (JWT + bcrypt-hashed passwords)
- Add items to a persistent cart (Context API + localStorage)
- Checkout with a shipping address (simulated payment, no real gateway)
- View order confirmation

## Tech stack

| Layer     | Tech                                            |
|-----------|--------------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, React Router, Axios, Context API |
| Backend   | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |

## Talking points for your interview

1. **Authentication flow**: register/login → password hashed with bcrypt before saving → JWT issued on success → token stored in localStorage → sent as `Authorization: Bearer <token>` header on every protected request → backend middleware (`protect`) verifies it.
2. **Why Context API instead of prop-drilling**: cart and user state are needed in the Navbar, product pages, and checkout — Context lets any component read/update them directly.
3. **REST API design**: resources (`/api/auth`, `/api/products`, `/api/orders`) each have their own router → controller → model, keeping responsibilities separated (a mini MVC pattern).
4. **Mongoose schemas**: `Order` embeds `orderItems` as sub-documents but references `User` and `Product` by ObjectId — a common relational pattern in MongoDB.
5. **Simple things kept simple**: no payment gateway integration (checkout is simulated and marked `isPaid: true` immediately) — a deliberate scope choice to keep the project focused and demoable.
