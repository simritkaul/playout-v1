# PlayOut Web App

**PlayOut** is a web application designed to simplify the creation and management of football games. The app enables users to host, join, and administer friendly matches effortlessly.

## **Project Overview**

PlayOut provides an intuitive interface for football enthusiasts to organize games with features like:

- **Create Game Flow:**

  - Host a game by entering essential details (game size, duration, match fee, date & time, etc.).
  - Generate a unique sharable game link.

- **Join Game Flow:**

  - Join using the shared game link or enter the game ID manually.
  - View match details and submit participant names.

- **Admin Flow:**
  - Game hosts have admin rights to manage participant entries.
  - Admins can add/remove participants and lock games when full.

## **Tech Stack**

| **Category**     | **Technology**            |
| ---------------- | ------------------------- |
| Frontend         | React + Vite + TypeScript |
| State Management | Redux Toolkit             |
| Styling          | TailwindCSS + ShadCN UI   |
| Backend (TBD)    | Firebase (planned)        |
| Authentication   | Firebase Authentication   |

---

## **Folder Structure**

```plaintext
src
├── api/                    # Firebase service files
├── app/                    # Redux store and hooks
├── components/             # Reusable UI components
├── features/               # Feature-specific modules
├── pages/                  # Main page components
├── routes/                 # App route definitions
├── styles/                 # Global styles (Tailwind)
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

---

## **Getting Started**

### **Prerequisites**

- Node.js (>= 14.x)
- npm or yarn package manager

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/simritkaul/playout-v1.git
   cd playout-v1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## **Available Scripts**

- `npm run dev`: Start the development server
- `npm run build`: Build the app for production
- `npm run preview`: Preview the production build

---

## **Features in Progress**

- [ ] Create game flow UI
- [ ] Join game flow UI
- [ ] Admin controls UI
- [ ] Firebase backend integration (Firestore, Auth)

---

## **Contributing**

1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

Feel free to reach out for questions or feedback:

- **Email:** kaulsimrit@gmail.com
- **GitHub:** [simritkaul](https://github.com/simritkaul)

Happy Playing!
