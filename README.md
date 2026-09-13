# BALAJI CHAIRS™ — INNOVATIVE CREATIONS
### Premium Commercial Web Application & API Service

An Apple-inspired commercial web application and REST API built for **Balaji Chairs™ (Innovative Creations)**, Unnao, Uttar Pradesh.

---

## 📁 Fullstack Architecture

The project is structured with separate frontend and backend directories:

```
balji_chairs/
├── frontend/                     # React + Vite + TypeScript + Tailwind CSS
│   ├── public/                   # Robots.txt, sitemap.xml, favicon.svg, images
│   │   └── images/
│   │       ├── brand/            # Official Balaji Chairs logo & showroom assets
│   │       ├── products/         # Commercial product imagery
│   │       ├── categories/       # Category banners
│   │       └── solutions/        # Architectural workspace photography
│   ├── src/
│   │   ├── components/           # Navbar, MobileMenu, ProductCard, Lightbox, EnquiryModal, etc.
│   │   ├── sections/             # 13 Homepage narrative sections
│   │   ├── pages/                # Home, Products, Solutions, Repair, About, Contact, Privacy, Terms
│   │   ├── data/                 # Centralized structured data (products, categories, services, faqs)
│   │   ├── lib/                  # WhatsApp link generators, API client
│   │   └── styles/               # index.css (Inter/Manrope, design tokens, glassmorphism)
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                      # Node.js + Express + TypeScript REST API
    ├── src/
    │   ├── server.ts             # Express server with CORS & security middleware
    │   ├── routes/               # /api/catalog, /api/enquiries, /api/repairs
    │   ├── controllers/          # Business logic & request validation
    │   ├── data/                 # enquiries.json, repairs.json, catalog.json (Persistent DB)
    │   └── types/                # TypeScript interfaces
    ├── tsconfig.json
    └── package.json
```

---

## 🚀 How to Run the Application

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm run build
npm start
```
*Dev mode:* `npm run dev` (runs live with `tsx watch`)

### 2. Start the Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173/** in your browser.

---

## 🔌 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, brand details, server timestamp |
| `GET` | `/api/catalog` | Serves categories, products, solutions, services, faqs |
| `GET` | `/api/catalog/products/:id` | Detailed product specifications by ID |
| `POST` | `/api/enquiries` | Validates & saves customer quotation enquiry to `enquiries.json` |
| `GET` | `/api/enquiries` | Retrieves all logged enquiries |
| `POST` | `/api/repairs` | Validates & logs chair repair requests to `repairs.json` |
| `GET` | `/api/repairs` | Retrieves all logged repair requests |

---

## 🏢 Business Information (Truth Reference)
- **Brand**: BALAJI CHAIRS™
- **Tagline**: INNOVATIVE CREATIONS
- **Specialization**: Revolving Chairs, Visitor Chairs, Revolving Stools, Office Tables
- **Address**: 941, Anwar Market, Daroga Bagh, Civil Lines, Unnao, Uttar Pradesh – 209801
- **Phone**: +91 78803 53900
- **WhatsApp**: +91 78803 53900
