"use strict";

/* This state is used to load in all of the other assets. It should also display
 * a progress bar indicating the progression of this. */

var preload = function(game) {};

preload.prototype = {
    init: function() {
        console.log("Preloading the game's assets");
        var loading_text = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2,
                                              "Loading...", { fontSize: "32px", fill: "#FFF" });
        loading_text.anchor.set(0.5, 0.5);
    },
    
    preload: function() {
        this.game.load.image("space_ship", "assets/images/space_ship.png");
        this.game.load.image("asteroid_1", "assets/images/asteroid_1.png");
        this.game.load.image("asteroid_small_1", "assets/images/asteroid_small_1.png");
        this.game.load.image("asteroid_tiny_1", "assets/images/asteroid_tiny_1.png");
        this.game.load.image("planet_1", "assets/images/planet_1.png");
        this.game.load.image("planet_2", "assets/images/planet_2.png");
        this.game.load.image("planet_3", "assets/images/planet_3.png");
        this.game.load.image("planet_4", "assets/images/planet_4.png");
        this.game.load.image("laser", "assets/images/laser.png");
        this.game.load.spritesheet("background_particles", "assets/images/background_particles.png", 8, 8);
        this.game.load.audio("explosion_1", "assets/sfx/explosion_1.ogg");
        this.game.load.audio("explosion_2", "assets/sfx/explosion_2.ogg");
        this.game.load.audio("explosion_3", "assets/sfx/explosion_3.ogg");
        this.game.load.audio("laser_1", "assets/sfx/laser_1.ogg");
        this.game.load.audio("laser_2", "assets/sfx/laser_2.ogg");
        this.game.load.audio("hit_1", "assets/sfx/hit_1.ogg");
        this.game.load.audio("hit_2", "assets/sfx/hit_2.ogg");
    },
    
    create: function() {
        this.game.stage.backgroundColor = "0F0F5E"
        this.game.state.start("Game Menu");
    }
};
