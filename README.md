# Falling Letters Game

A **Phaser 3** game where letters fall from the top of the screen, and the player must press matching keys to clear them. The game increases in difficulty as the player progresses.

## Features
- Randomly generated letters with different sizes and background colors.
- Gradual difficulty increase (faster falling speed, more letters spawning).
- Score tracking with **win** and **game over** conditions.
- Fully responsive canvas with a centered UI.
- Built using **TypeScript** and **Webpack**.

## Installation & Setup

### 1️⃣ Clone the repository
```sh
https://github.com/pentamario/falling-letters-game.git
cd falling-letters-game
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Build the project
```sh
npm run build
```

### 4️⃣ Start the development server
```sh
npm start
```
This will launch the game at **http://localhost:8080/**.

## How to Play
- When the game starts, **press any key** to begin.
- Letters will start falling from the top of the screen.
- Press the corresponding key on your keyboard to remove matching letters.
- If a letter reaches the bottom, **you lose**.
- Pressing the wrong key or a letter with no match **reduces your score by 2**.
- The game gets **faster and spawns more letters** as you progress.
- Reach **50 points** to win.

## Technologies Used
- **Phaser 3** - Game framework
- **TypeScript** - Strongly typed JavaScript
- **Webpack** - Module bundler
- **HTML/CSS** - UI and styling

## Troubleshooting
If you run into issues:
1. Ensure you have **Node.js** and **npm** installed.
2. Delete `node_modules` and reinstall dependencies:
```sh
rm -rf node_modules package-lock.json
npm install
```
3. Check if Webpack is correctly building your files:
```sh
npm run build
```
4. If styles are not applying, ensure **Webpack is copying `styles.css`** correctly.

## License
This project is open-source and available under the **MIT License**.

## Contact & Contributions
Feel free to submit **issues, feature requests, or pull requests**.
