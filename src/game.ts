import Letter from "./Letter";

export default class GameScene extends Phaser.Scene {
    private letters: Letter[] = []; 
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private gameOver: boolean = false;
    private fallSpeed: number = 0.1;
    private speedIncreaseThreshold: number = 5;
    private gameStarted: boolean = false;
    private startText!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        // Display the game title and initial instructions
        const title = this.add.text(500, 150, "Falling Letters Game!", { fontSize: "32px", color: "#fff" }).setOrigin(0.5);
        this.startText = this.add.text(500, 250, "Press any key to start", { fontSize: "24px", color: "#ffcc00" }).setOrigin(0.5);
    
        // Add fade-in animation for title and instructions
        title.setAlpha(0);
        this.startText.setAlpha(0);
        
        this.tweens.add({
            targets: [title, this.startText],
            alpha: 1,
            duration: 1000,
            ease: "Power2"
        });
    
        // Wait for the player to press any key to start the game
        this.input.keyboard!.once("keydown", () => {
            this.startGame();
        });
    }

    startGame() {
        this.gameStarted = true; 
        this.startText.destroy(); 

        // Initialize or reset score display
        if (this.scoreText) {
            this.scoreText.setText(`Score: ${this.score}`);
        } else {
            this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, { fontSize: "24px", color: "#fff" });
        }

        // Spawn initial letters
        for (let i = 0; i < 3; i++) {
            this.spawnLetter();
        }

        // Set up a loop to spawn new letters every second
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnLetter,
            callbackScope: this,
            loop: true
        });

        // Remove any existing key listeners and set up new ones
        this.input.keyboard?.removeAllListeners();
        
        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            this.handleKeyPress(event.key.toUpperCase());
        });
    }

    spawnLetter() {
        if (this.gameOver || !this.gameStarted) return;

        // Determine the number of letters to spawn based on the score
        const baseNumLetters = 2 + Math.floor(this.score / 5);
        const numLetters = Phaser.Math.Clamp(baseNumLetters, 2, 8);

        const lettersToSpawn: string[] = [];

        // Generate pairs of random letters
        for (let i = 0; i < Math.floor(numLetters / 2); i++) {
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            lettersToSpawn.push(randomLetter, randomLetter);
        }

        Phaser.Utils.Array.Shuffle(lettersToSpawn);

        // Spawn the letters at random positions
        for (const letterText of lettersToSpawn) {
            const x = Phaser.Math.Between(50, 950);
            const yOffset = Phaser.Math.Between(-200, -100);

            const letter = new Letter(this, x, yOffset, letterText);
            this.letters.push(letter);
        }
    }

    update() {
        if (this.gameOver || !this.gameStarted) return;

        // Move letters downward and check if any have reached the bottom
        this.letters.forEach(letter => {
            if (!letter.active) return;
            letter.updateLetter(this.fallSpeed);

            if (letter.y > 600) {
                this.endGame();
            }
        });

        // Adjust falling speed based on score progression
        if (this.score < 5) {
            this.fallSpeed = 0.5; 
        }

        if (this.score >= 5 && this.score % this.speedIncreaseThreshold === 0) {
            this.fallSpeed += 0.1; 
            this.speedIncreaseThreshold += 5;
        }
    }

    handleKeyPress(key: string) {
        if (this.gameOver || !this.gameStarted) return;

        const matchingLetters = this.letters.filter(letter => letter.getLetter() === key);

        // If at least two matching letters exist, remove them and increase the score
        if (matchingLetters.length >= 2) {
            this.score += 1;
            this.scoreText.setText(`Score: ${this.score}`);

            matchingLetters.forEach(letter => {
                letter.destroy();
                this.letters.splice(this.letters.indexOf(letter), 1);
            });

            // Trigger win condition at score 50
            if (this.score >= 50) {
                this.winGame();
            }
        } else {
            // Deduct points for incorrect presses
            this.score -= 2;
            if (this.score < 0) this.score = 0;
            this.scoreText.setText(`Score: ${this.score}`);
        }
    }

    restartGame() {
        // Clear all existing letters
        this.letters.forEach(letter => letter.destroy());
        this.letters = [];

        // Reset game state
        this.score = 0;
        this.gameOver = false;
        this.gameStarted = false;
        this.fallSpeed = 0.1;
        this.speedIncreaseThreshold = 5;

        // Remove all UI elements
        this.children.removeAll();

        // Reinitialize the start screen
        this.create();

        // Reset score display
        if (this.scoreText) {
            this.scoreText.destroy();
        }
        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, { fontSize: "24px", color: "#fff" });

        // Ensure new key listeners are set up
        this.input.keyboard?.removeAllListeners();
        
        this.input.keyboard!.once("keydown", () => {
            this.startGame(); 
        });
    }

    endGame() {
        this.gameOver = true;

        // Display the game over message
        this.add.text(500, 300, "Game Over!", { fontSize: "40px", color: "#ff0000" }).setOrigin(0.5);

        // Create a restart button
        const restartButton = this.add.text(500, 400, "Restart", { 
            fontSize: "30px", 
            color: "#ffffff", 
            backgroundColor: "#444444", 
            padding: { x: 10, y: 5 } 
        }).setOrigin(0.5).setInteractive();

        restartButton.on("pointerdown", () => {
            this.restartGame();
        });

        this.letters.forEach(letter => letter.destroy());
        this.letters = [];
    }

    winGame() {
        this.gameOver = true;

        // Display win message
        this.add.text(500, 300, "You Win!", { fontSize: "40px", color: "#00ff00" }).setOrigin(0.5);

        // Create a restart button
        const restartButton = this.add.text(500, 400, "Restart", { 
            fontSize: "30px", 
            color: "#ffffff", 
            backgroundColor: "#444444", 
            padding: { x: 10, y: 5 } 
        }).setOrigin(0.5).setInteractive();

        restartButton.on("pointerdown", () => {
            this.restartGame();
        });

        this.letters.forEach(letter => letter.destroy());
        this.letters = [];
    }
}
