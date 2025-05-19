# 🏛️ Citizen Engagement System

A full-stack platform designed to empower citizens to report complaints, track their status, and engage with government or administrative bodies transparently. The system includes intelligent features like NLP-based categorization, analytics dashboards, and notification services to ensure efficient communication between citizens and administrators.

---

## 📁 Project Structure

Citizen-Engagement-System/
├── Backend/
│ ├── Frontend/ # React + Vite + TypeScript Frontend
│ │ ├── src/
│ │ │ ├── App.tsx
│ │ │ ├── index.tsx
│ │ │ ├── types.ts
│ │ │ ├── index.css
│ │ │ ├── components/
│ │ │ │ ├── ComplaintForm.tsx
│ │ │ │ ├── ComplaintTracker.tsx
│ │ │ │ ├── AdminInterface.tsx
│ │ │ │ ├── AnalyticsDashboard.tsx
│ │ ├── index.html
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── vite.config.ts
│ │ ├── tailwind.config.js
│ │ ├── postcss.config.js
│ │ ├── lighthouse.config.js
│
│ ├── src/ # Node.js + TypeScript Backend
│ │ ├── index.ts
│ │ ├── types.ts
│ │ ├── nlpRouter.ts
│ │ ├── notificationService.ts
│ │ ├── routes/
│ │ │ ├── complaints.ts
│ ├── package.json
│ ├── tsconfig.json
│ ├── .env


---

## 🚀 Key Features

- 📝 **Complaint Submission** – Citizens can submit complaints categorized by type.
- 🧠 **NLP Classification** – Automatically tags and routes complaints using natural language processing.
- 📈 **Analytics Dashboard** – Admins can view trends and statistics of submitted issues.
- 🔔 **Notification Service** – Citizens receive updates on complaint status.
- 🔐 **Secure Admin Interface** – Admins can track, resolve, and manage reports efficiently.
- 📦 **Built with modern stacks** – Vite, Tailwind CSS, TypeScript, Node.js

---

## 🛠️ Tech Stack

| Frontend               | Backend                     |
|------------------------|-----------------------------|
| React + TypeScript     | Node.js + Express + TypeScript |
| Tailwind CSS           | REST API                    |
| Vite                   | NLP Processing (Custom)     |
| React Router DOM       | Notification Service        |

---

## 📦 Installation Instructions

### Prerequisites

- Node.js & npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Gemimah/Citizen_Engagement_System.git
cd Citizen-Engagement-System/Backend



