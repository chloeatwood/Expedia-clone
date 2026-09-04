# Chalo Ghume (Expedia Clone)

A React + Redux web application that replicates the core functionality of Expedia — search, filter, and book hotels, flights, and train tickets. Built as a class project for SE 3290 – Software Project Management (Fall 2026) by a team of 5: Kumkum (Team Lead), Ashish, Amit, Sagar Balsaraf, and Sarim.

## Overview

Chalo Ghume lets users search and book flights, hotels, and holiday packages, manage a cart, and sign in with phone-based (OTP) authentication via Firebase. An admin panel is included for managing listings and bookings. The project showcases the team's work with HTML, CSS, JavaScript, React, Redux, and JSON Server.

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

- HTML
- CSS
- JavaScript
- React
- Redux
- JSON Server
- Firebase

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

## Known Limitations / Future Work

- No sign-out option is currently exposed in the UI after a successful login.
- [Add any other known issues or planned improvements here.]


## Acknowledgements

Referencing [Expedia.com](https://www.expedia.com/) for feature inspiration. Originally built as an open-source project by Kumkum, Ashish, Amit, Sagar Balsaraf, and Sarim; extended here as part of the SE 3290 – Software Project Management course project.