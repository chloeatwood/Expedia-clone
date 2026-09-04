# Chalo Ghume (Expedia Clone)

An Expedia-style travel booking web app built for SE 3290 – Software Project Management (Fall 2026). This project is a fork of [Expedia-clone by kumkumdutta](https://github.com/kumkumdutta/Expedia-clone), extended and maintained by our team for this course.

## Overview

Chalo Ghume is a React + Redux web application that replicates core Expedia functionality: searching, filtering, and booking flights and hotels, cart management, and an admin panel for managing listings. Phone-number sign-in and one-time-password (OTP) verification are handled through Firebase Authentication; all other application data is served locally through a `json-server` mock API.

This project was built as the Prelude Project for SE 3290. It is **not connected to a live production backend** — it's designed to run and be evaluated locally.


## Features

### User
- Landing page
- Login and signup via Firebase Phone Authentication (OTP)
- View flight and hotel details
- Search flights, hotels, and holiday packages
- Sort, filter, and search results
- Book flights and hotels
- Cart section

### Admin Panel
- Manage hotel and booking listings
- Access booking requests and user details
- Oversee cart and transaction workflows

## Tech Stack

| Category | Technology |
|---|---|
| Frontend framework | React 18 |
| State management | Redux + React-Redux 8 + Redux Thunk |
| Routing | React Router v6 |
| UI / Styling | Chakra UI, Emotion, styled-components, Framer Motion |
| Auth | Firebase 9 (Phone Authentication only) |
| Mock backend | json-server (`db.json`) |
| HTTP client | Axios |
| Other libraries | react-datepicker, react-toastify, react-search-autocomplete, Font Awesome |
| Build tooling | react-scripts (Create React App) 5 |

## Dependencies

- axios
- redux
- react-redux
- redux-thunk
- Chakra UI
- firebase
- font-awesome
- json-server
- react-router-dom
- better-react-carousel


## Architecture

```
src/
├── 01_firebase/           # Firebase app initialization (phone auth only)
├── Components/             # Shared UI components (Navbar, Footer, etc.)
├── Pages/
│   ├── Admin/               # Admin dashboard, flights, stays, products, hotels
│   ├── Flights/              # Flight search & detail pages
│   ├── Stay/                 # Hotel/stay search & detail pages
│   ├── ThingsTodo/          # Destination/activity pages
│   ├── Login.jsx / Register.jsx
│   ├── HomePage.jsx
│   ├── CheckoutPage.jsx
│   └── AllRoutes.js         # Central route definitions
├── Redux/
│   ├── AdminFlights/         # action / actionType / reducer
│   ├── AdminHotel/           # action / actionType / reducer
│   ├── StayReducer/          # action / actionType / reducer
│   ├── Authantication/       # login/register/session state
│   └── store.js
└── App.js
```

**Data flow:** the app has **two backends running side by side locally**:
1. **Firebase Authentication** — handles phone number verification and OTP sign-in only.
2. **`json-server` + `db.json`** — a local mock REST API that serves everything else: user profiles, flights, hotels, cart contents, gift cards, and "Things to Do" data.

There is **no cloud database** (Firestore, Realtime Database, or Storage) in use. All persisted data lives in `db.json` and resets whenever that file is reset.


## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended) and npm
- No separate installation is needed for the JSON Server — it's installed as a project dependency via `npm install` and run with `npm run server` (see step 4 below).
- A [Firebase](https://console.firebase.google.com/) project with:
  - **Phone** sign-in enabled under Authentication → Sign-in method
  - **SMS region policy** set to Allow for the region(s) you'll test with (Authentication → Settings)
  - A [test phone number and verification code](https://firebase.google.com/docs/auth/web/phone-auth#test-with-fictional-phone-numbers) configured, so you can test OTP login without sending real SMS or enabling billing

## Getting Started (Local Deployment)

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumkumdutta/Expedia-clone.git
   cd Expedia-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This also installs `json-server` as a project dependency — no separate global install is required.

3. **Configure Firebase**

   Create a Firebase project at the [Firebase Console](https://console.firebase.google.com/), enable Phone Authentication, and add your web app to get a config object. Update the Firebase config at:
   ```
   src/01_firebase/config_firebase.js
   ```
   with your project's credentials:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

4. **Start the JSON Server** (provides mock/local data the app reads from)
   ```bash
   npm run server
   ```

5. **Run the app locally** (in a separate terminal)
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Build for production**
   ```bash
   npm run build
   ```
   This generates an optimized build in the `build/` folder. You can serve it locally with:
   ```bash
   npm install -g serve
   serve -s build
   ```

## Firebase Setup

This app uses Firebase **only** for phone number (OTP) authentication — there is no Firestore, Realtime Database, or Storage usage.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use the team's existing project).
2. In **Build → Authentication → Sign-in method**, enable the **Phone** provider.
3. (Recommended for development/demo) In the same tab, scroll to **Phone numbers for testing** and add a test number with a fixed OTP code, so you can log in repeatedly without using real SMS quota. [CONFIRM AND DOCUMENT THE TEAM'S TEST NUMBER/CODE HERE]
4. In **Project Settings → General → Your apps**, add a Web app (or use the existing one) and copy the config object.
5. Create a `.env` file in the project root (see `.env.example`) and populate it with your Firebase config:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Spark plan note:** the free tier caps phone-auth SMS at **10 messages per day per project**. Budget test logins accordingly, especially before recording a demo video.


## Project Structure

```
Expedia-clone/
├── public/                 # Static assets
├── src/
│   ├── 01_firebase/         # Firebase configuration
│   ├── Redux/                # Redux store, actions, and reducers
│   ├── components/            # Shared UI components (Navbar, etc.)
│   ├── pages/                  # Route-level pages (Login, Register, Flights, Hotels, Admin, etc.)
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

> Note: adjust this tree to match your actual folder layout before submitting.

## Testing the Authentication Flow

Since real SMS requires a Firebase Cloud Billing account, this project is set up to use Firebase's fictional test phone numbers during development:

1. In the Firebase Console, go to **Authentication → Sign-in method → Phone → Phone numbers for testing**.
2. Add a test number (e.g. `+1 555 123 4567`) and a fixed verification code (e.g. `123456`).
3. In the app, register using the test number's 10 digits (e.g. `5551234567`).
4. Log in with the same number and enter the fixed test code when prompted — no real SMS will be sent.

## Deployment

This project can be deployed locally (as above) or to a cloud platform such as Vercel, GCP, or AWS. If deploying to the cloud, add your Firebase credentials as environment variables on the hosting platform and verify authentication, search, booking, and admin panel features after deployment.

> A previous version of this project was deployed on Vercel. If you deploy this version, update this section with your live URL.

## Known Issues

**Functionality**
- Filtering does not work correctly across search results.
- The hotel section has significant functional and UX issues and needs rework.
- Mock database records (flights, hotels, etc.) don't reliably populate on load — in some cases data only appears after the user adds their own flight entry first.
- The sign-in page does not correctly update authentication state after a successful login.
- Session is not persisted across page refresh — logging in and then refreshing the browser logs the user out.
- The UI does not consistently populate values pulled from the mock database across pages.
- Train ticket booking is not implemented, despite being referenced in some course materials for this project category.

**Code Quality**
- DOM structure and markup are incorrect/non-semantic throughout large parts of the app.
- Multiple typos and syntax errors are present in the JSX/HTML markup across components.
- The mock API routes (Redux actions calling into `json-server`) are outdated and inconsistently structured, and should be refactored.
- No automated test coverage. The only existing test file (`src/App.test.js`) is the unmodified Create React App default and does not reflect this application — it will fail if run. See [CONTRIBUTING.md](./CONTRIBUTING.md) for testing expectations going forward.

**Security**
- `npm audit` reports **102 known vulnerabilities in the dependency tree** (6 critical, 52 high, 29 moderate, 15 low), mostly in transitive build-tooling dependencies pulled in by `react-scripts`. Dependencies should be updated and `npm audit fix` run before any production/cloud deployment.
- Firebase config was previously hardcoded in `src/01_firebase/config_firebase.js`; this has been/needs to be migrated to environment variables (see [Firebase Setup](#firebase-setup)). [CONFIRM THIS MIGRATION IS COMPLETE BEFORE SUBMISSION]
- Seed data in `db.json` contains real-looking names and phone numbers carried over from the original repo. Recommend replacing with obviously fake placeholder data before making this repository public, both for privacy and to avoid triggering real SMS sends.
- Firebase Spark plan SMS quota (10/day) can be exhausted quickly during testing or demo recording — see [Firebase Setup](#firebase-setup).

**Design**
- Overall UI is visually unpolished and inconsistent across pages; needs a design pass.

## Future Work

- **Deploy to a cloud platform** (Vercel, GCP, or AWS) in addition to the current local-only deployment.
- **Fix the known issues above**, roughly in this priority order:
  1. Dependency security vulnerabilities (`npm audit fix`, update outdated packages)
  2. Core functional bugs — filtering, sign-in state updates, database population, session persistence
  3. Code quality — DOM/markup correctness, typos/syntax errors, mock API/Redux refactor
  4. UI/UX and visual design pass, especially the hotel section
- Replace the `json-server` mock backend with a real cloud database (Firestore or similar) if moving toward an actual production deployment.
- Add automated test coverage.
- Implement train ticket booking, if brought back into scope.


## Contributing
 
Contributions are welcome. To contribute:
 
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear messages.
4. Push to your fork and open a pull request describing your changes.
Please open an issue first for significant changes so they can be discussed before implementation.


## Contributors
[Claire Miller, Grace White, Chloe Atwood, Paul Zell]


## Acknowledgements

Referencing [Expedia.com](https://www.expedia.com/) for feature inspiration. Originally built as an open-source project by Kumkum, Ashish, Amit, Sagar Balsaraf, and Sarim; extended here as part of the SE 3290 – Software Project Management course project.