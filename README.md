# NextStore

NextStore is a high-performance e-commerce catalog showcase built on the modern Next.js App Router stack. It integrates Mongoose database persistence, NextAuth.js credentials authorization, and a high-fidelity glassmorphic dark interface.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: NextAuth.js
- **Styling**: Vanilla CSS & Tailwind CSS v4
- **Typography**: Google Font Outfit

---

## Key Features

- **Mesh Gradient Dark UI**: A responsive, premium dark-themed design system featuring glassmorphic components, glowing states, and custom transitions.
- **Dynamic Seeding**: Automatically populates the local MongoDB instance with realistic seed data from DummyJSON upon first launch if empty.
- **Search & Sort Catalog**: Real-time client-side filter transitions for titles, ratings, and price sorting.
- **Hybrid Data Fetching**: Product details resolve from local database entities first, fallback to external APIs for legacy keys, and dynamically scale to on-demand requests.
- **Role-Based Admin Panels**: Restricts CRUD (Create, Update, Delete) product catalog adjustments to authenticated administrators.
- **Authentication Routes**: Built-in credential checks to quickly toggle between guest catalog browsing and administrative console privileges.
- **Floating Quote Toast Ticker**: Seamless, leak-free client-side quote notifications integrated into SSR lists.

---

## Directory Structure

```text
├── app
│   ├── (main)
│   │   ├── layout.tsx         # Header navigation, layout wrappers, & admin check
│   │   ├── page.tsx           # Home hero welcome showcase landing
│   │   ├── products           # Products catalog, form creator, and detail page routes
│   │   └── quotes             # Quotes SSR list and interactive ticker
│   ├── api
│   │   └── auth               # NextAuth endpoints and handlers
│   ├── globals.css            # Stylesheets, animation keyframes, and custom utility classes
│   └── layout.tsx             # Root layout and Outfit font optimizer
├── components
│   ├── ProductForm.tsx        # Product creation and modification form component
│   ├── ProductList.tsx        # Catalog listing layout with interactive search & filters
│   └── QuoteInterval.tsx      # Timer-safe quotes ticker toast notifications
├── lib
│   ├── actions.ts             # Server actions for product database mutations (CRUD)
│   └── db.ts                  # Mongoose MongoDB connection pooling logic
└── models
    └── Product.ts             # MongoDB Product document schema
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: `v18+` or later recommended
- **MongoDB**: A running local instance (defaulting to `mongodb://127.0.0.1:27017/my-next-store`)

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/my-next-store
NEXTAUTH_SECRET=rR3xNnrj0qdV9YEMWLjexG34DcGA3rIdn5WFUhbmO1k=
NEXTAUTH_URL=http://localhost:3000
```

### 3. Installation
Install the project dependencies:

```bash
npm install
```

### 4. Running the Development Server
Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Guest Limits**: Unauthenticated users see only the first 3 products, with edit/delete functions hidden.
- **Admin Authentication**: To login, click the "Sign In" button in the header and enter:
  - **Username**: `admin`
  - **Password**: `admin`

### 5. Production Compilation
Build and launch the optimized production bundle:

```bash
npm run build
npm run start
```
