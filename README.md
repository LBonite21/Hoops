# Hoops 🏀

<p align="center">
  <img src="Hoops/images/logo.png" alt="Hoops basketball logo" width="150" />
</p>

**Hoops** is a basketball-focused mobile app prototype built with **React Native** and **Expo**. It brings together a location-based court map, a way to mark a basketball court on the map, and links to basketball news—all in one interface.

The app runs on **iOS and Android**, with a simplified browser experience for finding courts through Google Maps.

## Features

### 🗺️ Basketball court map
- **Location-aware map (iOS/Android):** Asks for foreground location access and centers the interactive map on the user's current location when permitted.
- **Graceful location fallback:** Displays a default map region and an explanatory message if location access is unavailable.
- **Add Court marker:** Drops a draggable marker at the map's current center so users can position a potential new court. **This marker is local to the current screen; it is not saved or shared.**
- **Web court search:** Uses browser location to open a Google Maps search for nearby basketball courts. The interactive in-app map is currently native-only.

### 📰 Basketball news
- Quick access to **NBA**, **WNBA**, and **USA Basketball** news through cards that open the organizations' websites.
- These are external news links, **not an in-app news feed or live news API**.

### 👤 Account screens and navigation
- Login and sign-up interfaces with basic client-side validation.
- A local demonstration login state stored with **AsyncStorage**, keeping users signed in between app launches.
- Bottom tabs for **Map** and **News**, plus drawer navigation and sign-out.
- Custom branding, fonts, and mobile-friendly screen layouts.

> **Prototype note:** Login and sign-up currently use local demo session handling, not server-side credential verification or persistent account registration. Do not use a real password.

## Tech stack

| Area | Technologies |
| --- | --- |
| Mobile and web UI | React, React Native, Expo, JavaScript |
| Navigation | React Navigation (native stack, drawer, bottom tabs) |
| Maps and location | React Native Maps, Expo Location; Google Maps links on web |
| Local session state | React Context, `useReducer`, AsyncStorage |
| UI assets | Expo Vector Icons, Expo Font, custom images and typefaces |
| Separate legacy server prototype | Node.js, Express, MongoDB/Mongoose, bcrypt |

The `Hoops/server/` directory contains an older server-side prototype. **It is not integrated with the current Expo app**, and the steps below do not require it. The legacy server currently offers only a localhost-bound `/health` endpoint; account listing and legacy authentication routes are disabled.

## Getting started

### Prerequisites
- **Node.js** and **npm**
- For mobile: **Expo Go** on a compatible device, or an iOS/Android simulator
- For browser use: a modern web browser

### Install and run

1. Clone the repository and enter the Expo application directory:

   ```bash
   git clone https://github.com/LBonite21/Hoops.git
   cd Hoops/Hoops
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npm start
   ```

3. Open the app using the Expo terminal instructions, or use a platform-specific script:

   ```bash
   npm run android  # Android emulator
   npm run ios      # iOS simulator (requires macOS)
   npm run web      # Browser
   ```

On a physical device, Expo may request permission to access your location for the map features.

## Using the app

1. Open the app and use the **Login** or **Sign Up** screen to enter the demo experience.
2. Select **Map** to view the native interactive map or the browser-based court search.
3. On iOS/Android, tap **Add Court** and drag the marker to the desired spot. This previews a location only; it does not create a database record.
4. Open **News** for basketball news links.
5. Use the navigation drawer to switch sections or **Sign out**.

## Project structure

```text
Hoops/
├── README.md
├── Hoops/                    # Expo / React Native application
│   ├── App.js                # Entry component and font loading
│   ├── app.json              # Expo configuration
│   ├── package.json          # App dependencies and scripts
│   ├── src/components/
│   │   ├── Hoops.js          # Local session state and top-level navigation
│   │   ├── MapScreen.native.js # Interactive iOS/Android court map
│   │   ├── MapScreen.web.js  # Browser location and Google Maps search
│   │   ├── NewsScreen.js     # Basketball news links
│   │   ├── LoginScreen.js    # Login interface
│   │   ├── SignUpScreen.js   # Registration interface
│   │   └── ...               # Tab, drawer, stack, and context components
│   ├── assets/               # App icon and splash assets
│   ├── fonts/                # Custom fonts
│   ├── images/               # UI and branding images
│   ├── server/               # Separate legacy Express/Mongoose prototype
│   └── Importing/            # Legacy import utilities
├── UX_UI Design/             # Original design files (Adobe XD and graphics)
└── Fonts/                    # Additional font asset
```

## Current limitations and future improvements

Hoops is a **prototype**, not a production court directory or authentication service.

- **Persistent courts:** Store submitted court coordinates in a database and load verified courts as map markers.
- **Real accounts:** Replace local demo sessions with secure, server-validated authentication and registration.
- **Court details:** Add names, amenities, photos, reviews, and search/filter tools.
- **News integration:** Add an in-app news feed if a supported API becomes available.
- **Cross-platform parity:** Bring a richer interactive court map to the web experience.
- **Server modernization:** Rework the legacy backend before connecting it to the application, including secure environment-based configuration and up-to-date dependencies.

## Design

The [UX/UI design directory](UX_UI%20Design/) contains the original **Adobe XD** design file and supporting graphics. The application also includes custom logos, icons, and fonts.

## Author

Created by [Lemuel Bonite](https://github.com/LBonite21).

## Security and privacy

- **Demo authentication only:** The app's login/signup flow creates a locally stored demonstration session; it does not authenticate against the server or create real accounts. Do not enter real passwords.
- **Legacy API:** The optional backend listens on `127.0.0.1` by default and exposes only `GET /health`. Set `HOST` only when you intentionally need a different bind address; it has no production authentication endpoints.
- **Private configuration:** Never commit database credentials, keys, or user CSV exports. The optional import utility requires `MONGODB_URI` supplied through the environment and a private CSV path supplied at runtime.
- **Production readiness:** Server-validated authentication, role-based authorization, secure credential storage, input validation, dependency maintenance, and abuse protections must be designed and tested before deploying account features.
