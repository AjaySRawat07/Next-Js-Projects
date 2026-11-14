# TrueFeedback ✉️

> **Real feedback from real people, completely anonymous.**  
> A production-grade, secure anonymous feedback and mystery messaging platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **MongoDB (Mongoose)**, and **NextAuth**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://truefeedback-eight.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 🌐 Live Production Deployment

🔗 **Live URL:** [https://truefeedback-eight.vercel.app/](https://truefeedback-eight.vercel.app/)

---

## 📸 Application Preview

<div align="center">

### 1. Landing Page (Dark Mode & Interactive Feedback Carousel)
*Clean hero section with auto-sliding community feedback carousel and responsive theme toggle.*
![Landing Page Dark Mode](public/screenshots/landing-dark.png)

<br/>

### 2. User Dashboard (Cal.com Monochromatic Light Mode)
*Manage your unique public link with one-click clipboard copy, real-time message toggle, and optimistic inbox updates.*
![User Dashboard Light Mode](public/screenshots/dashboard-light.png)

<br/>

### 3. Public Feedback & AI Suggestions Portal
*Visitors send anonymous feedback with character limits and click AI-suggested prompts generated via Gemini AI.*
![Public Profile Portal](public/screenshots/profile-light.png)

</div>

---

## ✨ Core Features & Highlights

- 🎭 **100% Anonymous Messaging:** Visitors can send untraceable messages to any registered user without needing an account.
- ⚡ **Optimistic UI:** Toggling message acceptance and deleting messages updates the interface instantaneously with automated rollback on API failure.
- 🤖 **AI-Powered Prompts (Google Gemini API):** One-click message suggestions generate fresh, engaging questions dynamically using Google's generative AI.
- 🎨 **Cal.com Monochromatic Aesthetic:** Crisp black-and-white theme featuring dynamic light, dark, and system browser preference modes powered by `next-themes` and Tailwind CSS v4.
- 🛡️ **Edge Route Protection:** Edge middleware intercepts unauthorized access to `/dashboard` and redirects logged-in users away from auth pages.
- ⏱️ **Real-Time Username Debouncing:** Debounced validation checks username uniqueness live against MongoDB as the user types (`useDebounceValue`).
- 📧 **Resend Email Verification:** 6-digit OTP verification sent during registration to verify accounts before activation.
- 📋 **One-Click Shareable Link:** Automatic copy-to-clipboard for personal public links (`/u/[username]`).
- 🗑️ **Radix UI Delete Confirmation:** Accessible modal dialog ensuring no accidental feedback deletion.

---

## 🏗️ Architecture & Production Engineering

### 1. Next.js 16 App Router & Partial Prerendering (PPR)
- Built on the cutting-edge Next.js 16 engine with Turbopack.
- Leverages client/server component separation (`"use client"` vs Server Components) to minimize client-side bundle size.
- Dynamic route segments (such as `/verify/[username]` and `/u/[username]`) are wrapped in `<Suspense>` boundaries to satisfy Next.js Partial Prerendering constraints.

### 2. Strict Type Safety Across the Entire Stack
- **NextAuth Augmentation (`types/next-auth.d.ts`):** Augmented the core `User`, `Session`, and `JWT` interfaces to natively support custom MongoDB user attributes (`_id`, `username`, `isVerified`, `isAcceptingMessages`).
- **Zod Schema Synchronization:** Shared validation schemas (`signUpSchema`, `signInSchema`, `messageSchema`, `verifySchema`, `acceptMessageSchema`) ensure strict input contracts on both client forms (`react-hook-form`) and API route handlers.

### 3. MongoDB Aggregation Pipeline
- Messages are stored as embedded subdocument arrays on the user model.
- The `GET /api/get-messages` route uses a high-performance MongoDB aggregation pipeline (`$match` ➔ `$unwind` ➔ `$sort` by `createdAt: -1` ➔ `$group`) with empty-inbox guards to prevent unwanted 404/401 edge cases.

### 4. Zero-Flicker Monochromatic Theme System
- Built to match the minimalist developer aesthetic of **Cal.com** and **Vercel**.
- Contrast inversion:
  - **Light Mode:** Crisp white surfaces (`bg-white`), neutral borders (`border-neutral-200`), dark neutral typography, and solid black primary buttons (`bg-neutral-900 text-white`).
  - **Dark Mode:** Deep neutral surfaces (`dark:bg-neutral-900`), subtle dark borders (`dark:border-neutral-800`), and crisp white primary buttons (`dark:bg-white dark:text-neutral-900`).

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Component Primitives** | [Shadcn UI](https://ui.shadcn.com/) / Radix UI |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) + Autoplay |
| **Theme Management** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + `@hookform/resolvers` |
| **Schema Validation** | [Zod](https://zod.dev/) |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (Credentials Provider) |
| **Password Hashing** | [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) |
| **Email Delivery** | [Resend](https://resend.com/) + React Email |
| **Generative AI** | [Google Gemini API](https://ai.google.dev/) (`@google/genai`) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Hooks Utility** | [usehooks-ts](https://usehooks-ts.com/) |

---

## 📂 Project Structure

```bash
04.truefeedback.io/
├── app/
│   ├── (app)/                       # Core application route group
│   │   ├── dashboard/page.tsx       # Authenticated user feedback inbox & controls
│   │   ├── u/[username]/page.tsx    # Public profile page for sending messages
│   │   ├── layout.tsx               # App layout with sticky Navbar and Footer
│   │   └── page.tsx                 # Home landing page with live feedback carousel
│   ├── (auth)/                      # Authentication route group
│   │   ├── sign-in/page.tsx         # User login form (NextAuth credentials)
│   │   ├── sign-up/page.tsx         # User registration with live username debounce
│   │   └── verify/[username]/       # 6-digit OTP verification page
│   ├── api/                         # Backend API Route Handlers
│   │   ├── accept-messages/route.ts # GET/POST message acceptance switch status
│   │   ├── auth/[...nextauth]/      # NextAuth options & JWT route
│   │   ├── check-username-unique/   # GET debounced username availability
│   │   ├── delete-message/[id]/     # DELETE message from MongoDB subdocument
│   │   ├── get-messages/route.ts    # Aggregated inbox fetch sorted by timestamp
│   │   ├── send-message/route.ts    # POST anonymous feedback to user
│   │   ├── signup/route.ts          # POST user creation & OTP dispatch
│   │   ├── suggest-messages/        # POST Gemini AI dynamic question generation
│   │   └── verify-code/route.ts     # POST 6-digit OTP verification check
│   ├── helpers/                     # Email sending helpers
│   ├── model/                       # Mongoose User & Message schemas
│   ├── schemas/                     # Shared Zod validation schemas
│   ├── globals.css                  # Tailwind CSS v4 styling & theme variants
│   └── layout.tsx                   # Root HTML layout with NextAuth & Theme providers
├── components/
│   ├── ui/                          # Shadcn UI reusable primitives (Button, Card, Switch, etc.)
│   ├── MessageCard.tsx              # Individual message card with delete modal
│   ├── Navbar.tsx                   # Top navigation with user badge & theme switcher
│   ├── ThemeToggle.tsx              # Sun / Moon / System monitor 3-way toggle
│   └── theme-provider.tsx           # next-themes client wrapper
├── context/
│   └── AuthProvider.tsx             # NextAuth SessionProvider client wrapper
├── lib/                             # Shared utilities (dbConnect, resend, utils)
├── public/                          # Static assets and screenshot previews
├── types/                           # Global TypeScript declarations & NextAuth augmentation
├── middleware.ts                    # Edge authentication guard
└── package.json
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance
- [Resend](https://resend.com/) API Key for email verification
- [Google AI Studio](https://aistudio.google.com/) Gemini API Key

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/your-username/truefeedback.git
cd truefeedback
npm install
```

### 3. Environment Variables Configuration

Create a `.env` file in the root directory (refer to `.env.sample`):

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/truefeedback?retryWrites=true&w=majority

# Resend API Key for Email Delivery
RESEND_API_KEY=re_your_resend_api_key

# NextAuth Secret Key (Generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google Gemini API Key for AI suggestions
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production bundle |
| `npm run start` | Boots production server |
| `npx tsc --noEmit` | Executes full TypeScript type-checking verification |

---

## 🔒 Security Best Practices Implemented

- **Password Hashing:** Passwords are never stored in plaintext — securely salted and hashed using `bcryptjs` (salt rounds: 10).
- **Edge Guarding:** Route middleware shields protected endpoints from unauthorized access without server overhead.
- **Input Sanitization:** All payload structures are validated using Zod schemas before touching database models.
- **Session Security:** NextAuth sessions run in secure HTTP-only cookies with JWT encryption.
- **Controlled Message Ingestion:** Users have granular control to toggle message acceptance on or off at any moment.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  Crafted with care by <strong>Ajay</strong> • Built for the modern web.
</div>
