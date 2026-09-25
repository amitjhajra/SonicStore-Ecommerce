# SonicStore Frontend

React (Vite) + Tailwind CSS + React Router + Context API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the backend is running first at http://localhost:5000
   (see backend/README.md)

3. Start the dev server:
   ```
   npm run dev
   ```
   App runs at http://localhost:3000

## Folder structure

```
frontend/
├── src/
│   ├── api/axios.js        - central axios instance, auto-attaches JWT token
│   ├── context/              - React Context API (AuthContext, CartContext)
│   ├── components/           - reusable UI pieces (Navbar, ProductCard, PrivateRoute)
│   ├── pages/                 - one file per route/page
│   ├── App.jsx                 - all routing lives here (React Router)
│   └── main.jsx                 - app entry point, wraps app in providers
```

## Pages / Routes

| Route             | Page              | Notes                      |
|--------------------|-------------------|-----------------------------|
| /                   | Home              | product grid, search, category filter |
| /product/:id         | ProductDetail     | add to cart                  |
| /cart                 | Cart              | update qty, remove item        |
| /login                 | Login             |                                |
| /register               | Register          |                                |
| /checkout                | Checkout          | **protected** - must be logged in |
| /order-success             | OrderSuccess      | **protected**                  |

## Key concepts used (good for interview talking points)

- **Context API** — `AuthContext` (who's logged in) and `CartContext` (what's in the cart) are provided once in `main.jsx` and consumed anywhere with `useContext()`, so there's no manual prop-drilling.
- **React Router** — client-side routing in `App.jsx`; `PrivateRoute.jsx` guards pages that need login.
- **JWT handling** — after login, the token is saved to `localStorage` and automatically attached to every API request by an axios interceptor (`src/api/axios.js`).
- **Persistent cart** — cart state is saved to `localStorage` via a `useEffect`, so it survives a page refresh.
- **Tailwind CSS** — utility-first styling, no separate CSS files per component.
