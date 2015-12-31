"use strict";

//var game = new Phaser.Game(1280, 720, Phaser.CANVAS, "", "Boot", false, false)
var game = new Phaser.Game(1280, 720, Phaser.AUTO, "", "Boot", false, false)
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("Game Menu", game_menu);
game.state.add("Game Main", game_main);
game.state.add("Game Over", game_over);
