"use strict";

var game_menu = function(game) {};

game_menu.prototype = {
    create: function() {
        this.start_game_text = this.game.add.text(this.game.world.width / 2, 270, "Start Game",
                                                  { fontSize: "32px", fill: "#FFF" });
        this.start_game_text.anchor.set(0.5);
        this.start_game_text.inputEnabled = true;
        this.start_game_text.events.onInputDown.add(function() {
            this.game.state.start("Game Main");
        }, this);
        
        this.fullscreen_text = this.game.add.text(this.game.world.width / 2, 320, "Switch to Fullscreen",
                                                  { fontSize: "32px", fill: "#FFF" });
        this.fullscreen_text.anchor.set(0.5);
        this.fullscreen_text.inputEnabled = true;
        this.fullscreen_text.events.onInputDown.add(function() {
            this.game.scale.startFullScreen(false);
        }, this);
        
//         if (x_rotation != 0 || y_rotation != 0) {
//             this.calibrate_text = this.game.add.text(this.game.world.width / 2, 370, "Calibrate Gryoscope",
//                                                      { fontSize: "32px", fill: "#FFF" });
//             this.calibrate_text.anchor.set(0.5);
//             this.calibrate_text.inputEnabled = true;
//             this.calibrate_text.events.onInputDown.add(function() {
//                 x_rotation_calibrate = x_rotation;
//                 y_rotation_calibrate = y_rotation;
//             
//                 let calibrated_text = this.game.add.text(0, 0, "Gryoscope Calibrated",
//                                                          { fontSize: "32px", fill: "#FFF" });
//                 calibrated_text.anchor.set(0.0, 0.0);
//                 let text_kill_timer = this.game.time.create(true);
//                 text_kill_timer.add(5000, function() {
//                     calibrated_text.destroy();
//                 }, this);
//                 text_kill_timer.start();
//             }, this);
//         }
    }
};