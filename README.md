
# Islamik – Modern Islamic Platform 🌙

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/) 
[![License](https://img.shields.io/badge/License-Private-red)](#-license) 
[![Status](https://img.shields.io/badge/Status-Active-green)](#-features)

**Islamik** is a full-featured Islamic platform built with **React.js**, offering rich content across multiple sections: Quran, prayer times, fatwas, Seerah, Aqeedah, articles, Dar Iftaa, and charitable donations.  
This is a **private, closed-source project**, fully functional in the browser with precise API integrations.

---

## 🌟 Features

- **Fully responsive platform:**  
  Smooth user experience on desktop and mobile devices

- **Dynamic content:**  
  - Quran with Tafsir  
  - Accurate prayer times via Geolocation  
  - Fatwas, Aqeedah, Seerah  
  - Articles, guidance, and donation functionality  

- **Advanced React Hooks:**  
  - `useIslamicTime.js` → Live clock + Hijri date  
  - `usePrayerTimes.js` → Prayer times via API + geolocation  

- **Interactive Components:**  
  - `Navbar.js` → Responsive navigation  
  - `Footer.js` → Professional footer  
  - `Toast.js` → Success & error notifications  

- **Project Pages:**  
  - `QuranPage.js`  
  - `PrayerPage.js`  
  - `FatwasPage.js`  
  - `AqeedaPage.js`  
  - `SeerahPage.js`  
  - `ArticlesPage.js`  
  - `DarIftaaPage.js`  
  - `DonationsPage.js`  
  - `AllOtherPages.js`  
  *(15 fully functional pages)*

---

## 🗂️ Project Structure

```text
islamic-platform/
├── package.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.js
    ├── App.css
    ├── hooks/
    │   ├── useIslamicTime.js
    │   └── usePrayerTimes.js
    ├── data/
    │   └── islamicData.js
    ├── components/
    │   ├── Navbar.js
    │   ├── Footer.js
    │   └── Toast.js
    └── pages/
        ├── QuranPage.js
        ├── PrayerPage.js
        ├── FatwasPage.js
        ├── AqeedaPage.js
        ├── SeerahPage.js
        ├── ArticlesPage.js
        ├── DarIftaaPage.js
        ├── DonationsPage.js
        └── AllOtherPages.js
