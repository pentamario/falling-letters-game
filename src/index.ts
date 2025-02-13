import Phaser from "phaser";
import GameScene from "./game"; 

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: "game-container",
    scene: [GameScene]
};

// Prevent duplicate game instances
if (!window.hasOwnProperty("__phaser_game")) {
    (window as any).__phaser_game = new Phaser.Game(config);
}
