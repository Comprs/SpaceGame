"use strict";

var game_over = function(game) {};

game_over.prototype = {
    init: function(score) {
        this.score = score
    },

    create: function() {
        this.main_text = this.game.add.text(this.game.world.width / 2, 180,
                                            "Game Over", { fontSize: "64px", fill: "#FFF" });
        this.main_text.anchor.set(0.5);


        this.score_text = this.game.add.text(this.game.world.width / 2, 360,
                                             "Score: " + this.score, { fontSize: "32px", fill: "#FFF" });
        this.score_text.anchor.set(0.5);


        this.replay_text = this.game.add.text(this.game.world.width / 2, 480,
                                              "Play Again", { fontSize: "40px", fill: "#FFF" });
        this.replay_text.anchor.set(0.5);
        this.replay_text.inputEnabled = true;
        this.replay_text.events.onInputDown.add(function() {
            this.game.state.start("Game Main");
        }, this);
    }
}
