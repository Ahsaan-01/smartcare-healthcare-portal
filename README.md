# SmartCare — Healthcare Appointment & Patient Portal

> **Zynvex Solutions — Batch 3 Frontend Development Internship**  
> **Intern**: Muhammad Ahsaan Khan  
> **Internship ID**: ZYNVEX-CERT-1176  
> **Domain**: Frontend Development  
> **Project Target**: SmartCare — Healthcare Appointment & Patient Portal (Pakistan)

---

## 🏥 Project Overview

**SmartCare** is a modern, responsive healthcare appointment and patient portal specifically engineered for Pakistan's healthcare ecosystem. It provides patients with transparent access to PMDC-verified specialists across Karachi, Lahore, Islamabad, and nationwide, supporting both in-clinic visits and confidential online video consultations.

### Core Objectives:
1. **Patient Discovery**: Search, filter, and compare doctors by specialization, city, sub-area, consultation fee in PKR, and patient ratings.
2. **Pakistan-First Context**: Realistic Pakistani medical profiles, PMDC registration badges, transparent PKR currency (`Rs. 2,500`), and localized areas (Clifton, DHA, Gulshan, Gulberg, Blue Area).
3. **Multi-Portal Architecture**: Unified foundation structured for Patient Portal, Doctor Portal, and Admin Portal.

---

## 🗺️ 4-Module Internship Roadmap

- [x] **MODULE 1: Foundation & Patient Discovery** *(Current Phase)*
  - React 19 + TypeScript + Vite + Tailwind CSS 4 setup.
  - Bespoke SmartCare clinical design system & tokens (Teal `#0D7A5F`, Slate, White, Soft Mint).
  - Public marketing website (Hero with live search, 12+ specialties, featured doctors, trust metrics, testimonials).
  - Complete Authentication system (Login, Signup with `+92 3XX XXXXXXX` validation, Forgot Password, 1-Click Demo switchers).
  - Patient Dashboard (Upcoming consultation banner, health metrics, quick actions).
  - Advanced Doctor Discovery (`/find-doctors`) with multi-faceted filtering, fee slider, rating filter, and sorting.
  - Comprehensive Doctor Profile (`/doctors/:id`) with qualifications, PMDC badge, hospital history, clinic schedule, and reviews.
  - Saved / Favourite Doctors (`/patient/favourites`) with persistent `localStorage` bookmarking.
- [ ] **MODULE 2: Appointment & Healthcare Workflows** *(Upcoming)*
  - Doctor slot availability engine, 6-step appointment booking flow, in-clinic vs video consultation selection, appointment management (upcoming, completed, cancelled), and notification center.
- [ ] **MODULE 3: Doctor Portal & Analytics** *(Upcoming)*
  - Doctor dashboard, schedule manager (working hours, breaks, slot toggles), patient records list, and revenue analytics in PKR.
- [ ] **MODULE 4: Admin Portal, QA & Final Optimization** *(Upcoming)*
  - Platform management (doctors, patients, appointments, specialties), platform-wide analytics, settings, accessibility audit, and final polish.

---

## 🛠️ Technology Stack & Installed Versions

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.0.0` | Core UI Component Framework |
| **TypeScript** | `~5.7.3` | Type Safety & Domain Modeling |
| **Vite** | `^6.2.0` | High-Performance Build Tool & Dev Server |
| **Tailwind CSS** | `^4.0.9` | Utility-First Clinical Styling & Design Tokens |
| **React Router DOM** | `^7.2.0` | Client-Side Routing & Protected Route Layouts |
| **Zustand** | `^5.0.3` | Lightweight Client State Management |
| **Lucide React** | `^0.475.0` | Consistent Healthcare & UI Iconography (No emojis) |
| **React Hook Form** | `^7.54.2` | High-Performance Form Handling |
| **Zod** | `^3.24.2` | Schema Validation & Phone/Email Checking |
| **date-fns** | `^4.1.0` | Date & PKT Timezone Formatting |
| **clsx / tailwind-merge** | `^2.1.1` / `^3.0.1` | Dynamic Class Composition Utilities |

---

## 📂 Project Architecture

```
smartcare-healthcare-portal/
├── public/
│   └── favicon.svg             # SmartCare brand medical shield logo
├── src/
│   ├── components/
│   │   ├── common/             # Button, Input, Select, Badge, Card, Avatar, Modal, ToastContainer, SkeletonLoader, EmptyState, Breadcrumb, RatingStars, Logo
│   │   ├── layout/             # PublicHeader, PublicFooter, PatientNavbar, PatientSidebar, MobileNav
│   │   └── doctor/             # DoctorCard, DoctorFilterSidebar, SpecialtyCard
│   ├── data/
│   │   ├── mockDoctors.ts      # 12+ realistic Pakistani doctors (Karachi, Lahore, Islamabad, etc.)
│   │   ├── mockSpecialties.ts  # 12 medical specialties with clinical descriptions
│   │   ├── mockCities.ts       # Pakistani cities & sub-localities (Clifton, DHA, Gulshan, Blue Area)
│   │   ├── mockReviews.ts      # Verified Pakistani patient reviews
│   │   └── mockPatients.ts     # Demo patient profile & upcoming appointment
│   ├── layouts/
│   │   ├── PublicLayout.tsx    # Header + Outlet + Footer + Toasts
│   │   ├── AuthLayout.tsx      # Centered card layout for Auth
│   │   ├── PatientLayout.tsx   # Navbar + Sidebar + MobileNav + Toasts
│   │   └── ProtectedRoute.tsx  # Role-based route guard
│   ├── pages/
│   │   ├── public/             # LandingPage, AboutPage, ContactPage
│   │   ├── auth/               # LoginPage, SignupPage, ForgotPasswordPage
│   │   ├── patient/            # PatientDashboard, DoctorDiscoveryPage, DoctorProfilePage, FavouriteDoctorsPage
│   │   └── errors/             # NotFoundPage, UnauthorizedPage
│   ├── services/
│   │   └── doctorService.ts    # Filter, search, sort, and profile data service layer
│   ├── store/
│   │   ├── useAuthStore.ts     # Auth state, login/signup/logout, demo switcher
│   │   ├── useFavouritesStore.ts # Saved doctors state with localStorage persistence
│   │   ├── useFilterStore.ts   # Active discovery search & filter state
│   │   └── useToastStore.ts    # Global notification toast queue
│   ├── types/
│   │   ├── doctor.ts           # Doctor, Specialty, PakistaniCity, Review types
│   │   ├── user.ts             # User, PatientProfile, HealthProfile
│   │   ├── filter.ts           # DoctorFilterState, SortOption
│   │   └── appointment.ts      # Appointment models & status types
│   ├── utils/
│   │   ├── formatters.ts       # formatPKR, formatPhonePK
│   │   ├── constants.ts        # Pakistani cities, default filters, demo credentials
│   │   └── cn.ts               # clsx + twMerge utility
│   ├── App.tsx                 # Route configuration
│   ├── index.css               # Clinical CSS tokens & Tailwind imports
│   └── main.tsx                # Entry point
├── index.html                      # Root HTML entry point (Google Fonts, app mount)
├── package.json                    # Project dependencies & npm scripts (dev, build, preview)
├── package-lock.json               # Exact dependency version lock (do NOT delete)
├── .gitignore                      # Excludes node_modules/, dist/, *.tsbuildinfo from Git
├── tsconfig.json                   # Root TypeScript config (references app + node configs)
├── tsconfig.app.json               # TypeScript config for src/ application code
├── tsconfig.node.json              # TypeScript config for vite.config.ts (Node environment)
├── vite.config.ts                  # Vite dev server & Tailwind CSS v4 plugin config
└── README.md                       # Project documentation (this file)
```

---

## 🔑 Demo Accounts for Evaluation

Quick **1-Click Demo Login** buttons are embedded directly on the Login page (`/login`):

| Role | Email | Password | Default Landing |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@smartcare.pk` | `patient123` | `/patient/dashboard` |
| **Doctor** | `doctor@smartcare.pk` | `doctor123` | `/patient/dashboard` (Module 1 preview) |
| **Admin** | `admin@smartcare.pk` | `admin123` | `/patient/dashboard` (Module 1 preview) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node `v24.15.0`)
- npm `v9+` or `v10+`

### Installation & Development
```bash
# 1. Clone the repository
git clone https://github.com/Ahsaan-01/smartcare-healthcare-portal.git
cd smartcare-healthcare-portal

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Production Build & Type Verification
```bash
# Compile TypeScript & build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🇵🇰 Pakistan-First Localization & Context
- **Currency**: All consultation charges and fees are explicitly in Pakistani Rupees (`Rs. 2,500` / `PKR 2,500`).
- **Medical Credentials**: PMDC (Pakistan Medical & Dental Council) verification badges and license numbering.
- **Cities & Areas**: Karachi (Clifton, DHA, Gulshan-e-Iqbal, North Nazimabad, PECHS), Lahore (Gulberg, DHA, Model Town), Islamabad (Blue Area, F-7, G-11), Rawalpindi, and Faisalabad.
- **Phone Formatting**: Standard Pakistani cellular format (`+92 3XX XXXXXXX` / `03XX XXXXXXX`).
- **Timezone**: Pakistan Standard Time (PKT / UTC+5) for all appointment timings.

---

## 📄 License & Disclaimer
This project is developed by **Muhammad Ahsaan Khan** (ID: `ZYNVEX-CERT-1176`) for the **Zynvex Solutions Batch 3 Frontend Internship**. All doctor, patient, clinic, address, and review details are fictional demo data created for demonstration purposes.
