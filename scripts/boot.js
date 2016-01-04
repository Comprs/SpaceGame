"use strict";

/* This state loads in the assets which will be used in the load state. It also
 * sets up the correct constant state of the program */

// var x_rotation = 0;
// var y_rotation = 0;
// 
// var x_rotation_calibrate = 0;
// var y_rotation_calibrate = 0;
// 
// window.addEventListener("deviceorientation", function(event) {
//     x_rotation = event.beta;
//     y_rotation = -event.gamma;
// });

var boot = function(game) {};

boot.prototype = {
    init: function() {
        console.log("Booting the game");
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.canvas.id = "game_canvas";
    },
    
    preload: function() {
        
    },
    
    create: function() {
        // Start loading the rest of the game
        this.game.state.start("Preload");
    }
};
