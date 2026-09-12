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

- [x] **MODULE 1: Foundation & Patient Discovery** *(Completed)*
  - React 19 + TypeScript + Vite + Tailwind CSS 4 setup.
  - Bespoke SmartCare clinical design system & tokens (Teal `#0D7A5F`, Slate, White, Soft Mint).
  - Public marketing website (Hero with live search, 12+ specialties, featured doctors, trust metrics, testimonials).
  - Complete Authentication system (Login, Signup with `+92 3XX XXXXXXX` validation, Forgot Password, 1-Click Demo switchers).
  - Patient Dashboard (Upcoming consultation banner, health metrics, quick actions).
  - Advanced Doctor Discovery (`/find-doctors`) with multi-faceted filtering, fee slider, rating filter, and sorting.
  - Comprehensive Doctor Profile (`/doctors/:id`) with qualifications, PMDC badge, hospital history, clinic schedule, and reviews.
  - Saved / Favourite Doctors (`/patient/favourites`) with persistent `localStorage` bookmarking.
- [x] **MODULE 2: Appointment & Healthcare Workflows** *(Completed)*
  - 4-step dynamic appointment booking wizard (`/patient/book/:doctorId`) with In-Clinic vs Video toggle (10% online discount).
  - 7-day rolling slot availability engine with Morning, Afternoon, and Evening PKT consultation slots.
  - Booking confirmation summary card and instant reference number generator (`SC-2026-XXXX`).
  - Appointment Management Hub (`/patient/appointments`) with 3 tabs: Upcoming & Confirmed, Completed History, and Cancelled.
  - Cancellation modal with 6 predefined reasons, custom notes, and automatic notification dispatch.
  - Notification Center (`/patient/notifications`) and interactive topbar popover with unread badges.
  - Live patient dashboard sync displaying real-time upcoming appointment cards and counters.
- [x] **MODULE 3: Doctor Portal & Analytics** *(Completed)*
  - Dedicated Doctor Portal Layout (`DoctorLayout`, `DoctorNavbar`, `DoctorSidebar`, `DoctorMobileNav`) with PMDC verification status (`PMDC # 48291-S`) and real-time duty status switcher (`Available`, `In Consultation`, `Break`, `Emergency Off`).
  - Doctor Dashboard (`/doctor/dashboard`) featuring today's patient queue, active waiting count, "Next Patient Ready" action card, and daily gross revenue in PKR (`Rs. 9,750`).
  - Comprehensive Consultation Workflow (`/doctor/consultations/:id`) with high-risk allergy alert banners, encrypted tele-health video call simulation, chief complaint & vitals entry, and interactive digital prescription pad writer.
  - Official Clinical Prescription Pad (`PrescriptionModal`) featuring clinic letterhead, PMDC stamp, digital signature, Rx table, and print/save PDF action.
  - Schedule & Availability Manager (`/doctor/schedule`) with shift timings (morning/evening), Friday prayer breaks, consultation duration/buffer options, emergency day-off trigger, and 7-day rolling slot availability matrix.
  - Patient Medical Records Directory (`/doctor/patients`) with search by name/MRN/diagnosis, allergy filters, blood group tags, and patient clinical history drawers (`PatientDrawer`).
  - Practice Revenue & Performance Analytics (`/doctor/analytics`) in PKR with gross revenue (`Rs. 485,000`), net clinic payout (90%), monthly comparative bars, consultation modality breakdown (In-Clinic vs Video), peak consultation hours, and CSV export.
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
│   │   ├── layout/             # PublicHeader, PublicFooter, PatientNavbar, PatientSidebar, DoctorNavbar, DoctorSidebar, DoctorMobileNav, MobileNav
│   │   ├── doctor/             # DoctorCard, DoctorFilterSidebar, SpecialtyCard, PrescriptionModal, PatientDrawer, ConsultationCancelModal
│   │   └── appointment/        # BookingStepIndicator, ConsultationTypeSelector, DatePicker, TimeSlotGrid, BookingConfirmCard, AppointmentCard, CancellationModal, NotificationItem
│   ├── data/
│   │   ├── mockDoctors.ts      # 12+ realistic Pakistani doctors (Karachi, Lahore, Islamabad, etc.)
│   │   ├── mockSpecialties.ts  # 12 medical specialties with clinical descriptions
│   │   ├── mockCities.ts       # Pakistani cities & sub-localities (Clifton, DHA, Gulshan, Blue Area)
│   │   ├── mockReviews.ts      # Verified Pakistani patient reviews
│   │   ├── mockPatients.ts     # Demo patient profile (Muhammad Tariq)
│   │   ├── mockAppointments.ts # Rich appointment history for patient and Dr. Ayesha Khan
│   │   ├── mockNotifications.ts# Mock notification feed entries
│   │   ├── mockSlots.ts        # 7-day rolling slot availability generator
│   │   └── mockDoctorPortal.ts # Doctor schedule configs, patient records, initial prescriptions, analytics
│   ├── layouts/
│   │   ├── PublicLayout.tsx    # Header + Outlet + Footer + Toasts
│   │   ├── AuthLayout.tsx      # Centered card layout for Auth
│   │   ├── PatientLayout.tsx   # Patient Navbar + Sidebar + MobileNav + Toasts
│   │   ├── DoctorLayout.tsx    # Doctor Navbar + Sidebar + MobileNav + Out-of-Office Banner + Toasts
│   │   └── ProtectedRoute.tsx  # Role-based route guard
│   ├── pages/
│   │   ├── public/             # LandingPage, AboutPage, ContactPage
│   │   ├── auth/               # LoginPage, SignupPage, ForgotPasswordPage
│   │   ├── patient/            # PatientDashboard, DoctorDiscoveryPage, DoctorProfilePage, FavouriteDoctorsPage, BookAppointmentPage, AppointmentHistoryPage, NotificationsPage
│   │   ├── doctor/             # DoctorDashboard, DoctorAppointmentsPage, DoctorConsultationDetailPage, DoctorSchedulePage, DoctorPatientsPage, DoctorAnalyticsPage
│   │   └── errors/             # NotFoundPage, UnauthorizedPage
│   ├── services/
│   │   ├── doctorService.ts    # Filter, search, sort, and profile data service layer
│   │   └── appointmentService.ts # Slot fetching, date formatting, countdown, filtering
│   ├── store/
│   │   ├── useAuthStore.ts     # Auth state, login/signup/logout, demo switcher
│   │   ├── useFavouritesStore.ts # Saved doctors state with localStorage persistence
│   │   ├── useFilterStore.ts   # Active discovery search & filter state
│   │   ├── useAppointmentStore.ts # Booking wizard, appointment management, notification feed
│   │   ├── useDoctorStore.ts   # Doctor schedule, slot overrides, prescriptions, patient records, duty status
│   │   └── useToastStore.ts    # Global notification toast queue
│   ├── types/
│   │   ├── doctor.ts           # Doctor, Specialty, PakistaniCity, Review types
│   │   ├── doctorPortal.ts     # MedicationItem, DigitalPrescription, DoctorScheduleConfig, DoctorPatientRecord, DoctorAnalyticsSummary
│   │   ├── user.ts             # User, PatientProfile, HealthProfile
│   │   ├── filter.ts           # DoctorFilterState, SortOption
│   │   └── appointment.ts      # Appointment, TimeSlot, DoctorSlotDay, Notification types
│   ├── utils/
│   │   ├── formatters.ts       # formatPKR, formatPhonePK
│   │   ├── constants.ts        # Pakistani cities, default filters, demo credentials
│   │   └── cn.ts               # clsx + twMerge utility
│   ├── App.tsx                 # Full route configuration (Public, Auth, Patient, Doctor)
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
| **Doctor** | `doctor@smartcare.pk` | `doctor123` | `/doctor/dashboard` *(Module 3 Live)* |
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
