import * as Phaser from "phaser";

export default class Letter extends Phaser.GameObjects.Container {
    private textObject: Phaser.GameObjects.Text;
    private background: Phaser.GameObjects.Graphics;
    private letter: string;
    private size: number;

    constructor(scene: Phaser.Scene, x: number, y: number, letter: string) {
        super(scene, x, y);
        this.letter = letter;

        // Generate a random font size and background size
        this.size = Phaser.Math.Between(30, 60);
        const bgSize = this.size * 1.8;

        // Define a set of background colors for variety
        const bgColors = [0xff5733, 0x33ff57, 0x3380ff, 0xffc733, 0xa833ff]; 
        const bgColor = Phaser.Utils.Array.GetRandom(bgColors);

        // Create a rounded background rectangle behind the letter
        this.background = scene.add.graphics();
        this.background.fillStyle(bgColor, 1);
        this.background.fillRoundedRect(-bgSize / 2, -bgSize / 2, bgSize, bgSize, 15);

        // Create the text object for the letter
        this.textObject = scene.add.text(0, 0, letter, {
            fontSize: `${this.size}px`,
            fontFamily: "Arial",
            color: "#ffffff"
        }).setOrigin(0.5);

        // Add background and text to the container and display it
        this.add([this.background, this.textObject]);
        scene.add.existing(this);
    }

    // Update the position of the letter to simulate falling
    updateLetter(fallSpeed: number) {
        this.y += fallSpeed;
    }

    // Return the letter's text for comparison when a key is pressed
    getLetter() {
        return this.letter;
    }
}
