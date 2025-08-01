# OneEarth - Wedding Venue Booking App

A modern React Native app for booking wedding venues, built with Expo Router and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo Go app on your phone

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Setup Supabase Database
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Run the SQL commands from `create-tables.sql`

## 📱 App Structure

```
app/
├── (auth)/               # Authentication screens
│   ├── login.tsx
│   ├── register.tsx
│   └── profile-setup.tsx
├── (main)/               # Main app screens
│   ├── dashboard.tsx
│   ├── search.tsx
│   ├── bookings.tsx
│   ├── favorites.tsx
│   └── profile.tsx
├── _layout.tsx          # Root layout
└── index.tsx            # Welcome screen

src/
├── components/ui/       # UI components
├── hooks/              # Custom hooks
├── services/           # API services
├── types/              # TypeScript types
├── utils/              # Utilities
└── theme/              # App theme
```

## 🔧 Features

- ✅ Authentication with Supabase
- ✅ Venue browsing and search
- ✅ Booking management
- ✅ Favorites system
- ✅ User profile management
- ✅ Modern UI with React Native Paper

## 🛠️ Tech Stack

- **React Native** with Expo
- **Expo Router** for navigation
- **Supabase** for backend
- **TypeScript** for type safety
- **React Native Paper** for UI components