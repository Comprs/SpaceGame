"use strict";

var game_main = function(game) {};

game_main.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.advancedTiming = true;
        
        this.score = 0;
        
        let star_emitter = this.game.add.emitter(this.game.world.width, this.game.world.height / 2, 100);
        star_emitter.height = this.game.world.height;
        star_emitter.gravity = 0;
        star_emitter.minParticleSpeed.set(-60.0, -20.0);
        star_emitter.maxParticleSpeed.set(-40.0, 20.0);
        star_emitter.minRotation = -10;
        star_emitter.maxRotation = 10;
        star_emitter.makeParticles("background_particles", [0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,3]);
        star_emitter.forEachAlive(function(particle) {
            particle.checkWorldBounds = true;
            particle.outOfBoundsKill = true;
        }, this);
        
        for (star_emitter.x = 0; star_emitter.x < this.game.world.width; star_emitter.x += this.game.world.width / 20) {
            star_emitter.explode(0, 5);
        }
        star_emitter.start(false);
        
        let planet_emitter = this.game.add.emitter(this.game.world.width * 11/8, this.game.world.height / 2, 1);
        planet_emitter.gravity = 0;
        planet_emitter.minParticleSpeed.set(-120.0, -15.0);
        planet_emitter.maxParticleSpeed.set(-40.0, 15.0);
        planet_emitter.minRotation = 0;
        planet_emitter.maxRotation = 0;
        planet_emitter.lifespan = 0;
        planet_emitter.makeParticles("planet_3");
        planet_emitter.forEachAlive(function(particle) {
            particle.checkWorldBounds = true;
            particle.outOfBoundsKill = true;
        }, this);
        planet_emitter.forEach(function(particle) {
            particle.kill();
        }, this);
        
        let planet_emitter_timer = this.game.time.create(false);
        planet_emitter_timer.loop(1000, function() {
            if (planet_emitter.countLiving() === 0) {
                let image_index = Math.floor(Math.random() * 4);
                planet_emitter.emitParticle(null, null, ["planet_1","planet_2","planet_3","planet_4"][image_index]);
            }
        }, this);
        planet_emitter_timer.start();
        
        this.asteroids_normal = this.game.add.group();
        
        this.asteroids_small = this.game.add.group();
        
        this.lasers = this.game.add.group();
        this.lasers.enableBody = true;
        
        this.player = this.game.add.sprite(game.world.width / 2, game.world.height / 2, "space_ship");
        this.player.anchor.set(0.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(0.8);
        this.player.health = this.player.maxHealth;
        this.player.events.onKilled.add(function() {
            this.state.start("Game Over", true, false, this.score);
        }, this);
        
        let health_regen_timer = this.game.time.create(false);
        health_regen_timer.loop(2000, function() {
            this.player.heal(3);
        }, this);
        health_regen_timer.start();
        
        this.game.input.activePointer.leftButton.onDown.add(function() {
            let rotation = this.player.rotation - Math.PI / 2
            let new_x = this.player.position.x + Math.cos(rotation) * 20;
            let new_y = this.player.position.y + Math.sin(rotation) * 20;
            let new_laser = this.lasers.create(new_x, new_y, "laser");
            new_laser.anchor.set(0.5);
            new_laser.body.velocity.set(Math.cos(rotation) * 1000, Math.sin(rotation) * 1000);
            new_laser.rotation = this.player.rotation;
            new_laser.checkWorldBounds = true;
            new_laser.outOfBoundsKill = true;
        }, this);
        
        this.game.time.events.loop(1000, function() {
            let side_selection = Math.floor(Math.random() * 4);
            if (this.asteroids_normal.length + this.asteroids_small.length >= 125) {
                return;
            }
            switch (side_selection) {
                case 0:
                    // Top
                    var x_position = Math.random() * this.game.world.width;
                    var y_position = 0;
                    var x_velocity = Math.random() * 40 - 20
                    var y_velocity = Math.random() * 80;
                    break;
                case 1:
                    // Bottom
                    var x_position = Math.random() * this.game.world.width;
                    var y_position = this.game.world.height;
                    var x_velocity = Math.random() * 40 - 20
                    var y_velocity = Math.random() * -80;
                    break;
                case 2:
                    // Left
                    var x_position = 0;
                    var y_position = Math.random() * this.game.world.height;
                    var x_velocity = Math.random() * 80;
                    var y_velocity = Math.random() * 40 - 20
                    break;
                case 3:
                    // Right
                    var x_position = this.game.world.width;
                    var y_position = Math.random() * this.game.world.height;
                    var x_velocity = Math.random() * -80;
                    var y_velocity = Math.random() * 40 - 20
                    break;
            }
            let new_asteroid = this.game.add.sprite(x_position, y_position, "asteroid_small_1");
            this.game.physics.arcade.enable(new_asteroid);
            new_asteroid.anchor.set(0.5);
            new_asteroid.body.collideWorldBounds = true;
            new_asteroid.body.bounce.set(1.0);
            new_asteroid.body.friction.set(0.0);
            new_asteroid.body.velocity.set(x_velocity, y_velocity);
            new_asteroid.body.angularVelocity = Math.random() * 40 - 20;
            new_asteroid.body.angle = Math.random() * Math.PI * 2;
            this.asteroids_normal.add(new_asteroid);
        }, this);

        this.health_text = this.game.add.text(0, 32, "Health: 100", { fontSize: "32px", fill: "#FFF" });
        this.score_text = this.game.add.text(0, 0, "Score: 0", { fontSize: "32px", fill: "#FFF" });
        this.fps_text = this.game.add.text(0, this.game.height, "fps: 0", { fontSize: "32px", fill: "#FFF" });
        this.fps_text.anchor.set(0, 1);
    },
    
    update: function() {
        let laser_collide_callback = function(laser, asteroid) {
            if (laser.alive && asteroid.alive) {
                laser.kill();
                asteroid.kill();
            }
            return false;
        };
        game.physics.arcade.collide(this.asteroids_normal, this.asteroids_normal);
        game.physics.arcade.collide(this.asteroids_small, this.asteroids_small);
        game.physics.arcade.collide(this.asteroids_normal, this.asteroids_small);
        game.physics.arcade.collide(this.lasers, this.asteroids_normal, null, laser_collide_callback, this);
        game.physics.arcade.collide(this.lasers, this.asteroids_small, null, laser_collide_callback, this);
        game.physics.arcade.collide(this.player, this.asteroids_small, function(player, asteroid) {
            player.damage(10);
        });
        game.physics.arcade.collide(this.player, this.asteroids_normal, function(player, asteroid) {
            player.damage(20);
        });
	game.physics.arcade.collide(this.player, this.asteroids_normal);
        
        let arrow_keys = this.game.input.keyboard.createCursorKeys();
        let wasd_keys =  this.game.input.keyboard.addKeys({
            "up": Phaser.KeyCode.W,
            "down": Phaser.KeyCode.S,
            "left": Phaser.KeyCode.A,
            "right": Phaser.KeyCode.D
        });
        this.player.body.acceleration.set(0);
        // this.player.body.acceleration.x += ((x_rotation - x_rotation_calibrate) % Math.PI * 2) * 10;
        // this.player.body.acceleration.y += ((y_rotation - y_rotation_calibrate) % Math.PI * 2) * 10;
        
        if (arrow_keys.left.isDown || wasd_keys.left.isDown) {
            this.player.body.acceleration.x += -400;
        }
        if (arrow_keys.right.isDown || wasd_keys.right.isDown) {
            this.player.body.acceleration.x += 400;
        }
        if (arrow_keys.up.isDown || wasd_keys.up.isDown) {
            this.player.body.acceleration.y += -400;
        }
        if (arrow_keys.down.isDown || wasd_keys.down.isDown) {
            this.player.body.acceleration.y += 400;
        }
        
        let mouse_x = this.game.input.activePointer.position.x;
        let mouse_y = this.game.input.activePointer.position.y;
        
        let delta_x = mouse_x - this.player.body.position.x;
        let delta_y = mouse_y - this.player.body.position.y;
        
        this.player.rotation = Math.atan2(delta_y, delta_x) + Math.PI / 2;
        
        this.asteroids_normal.forEachAlive(function(asteroid) {
            if (asteroid.body.velocity.getMagnitude() > 200) {
                asteroid.body.velocity.setMagnitude(200);
            }
        }, this);
        
        this.asteroids_small.forEachAlive(function(asteroid) {
            if (asteroid.body.velocity.getMagnitude() > 200) {
                asteroid.body.velocity.setMagnitude(200);
            }
        }, this);
        
        this.asteroids_normal.forEachDead(function(asteroid) {
            let asteroid_count = Math.floor(Math.random() * 2) + 3;
            for (let i = 0; i < asteroid_count; ++i) {
                
                let angle = Math.PI * 2 * i / asteroid_count + Math.random() * Math.PI / 4;
                let velocity = Math.floor(Math.random() * 50) + 50
                 
                let new_asteroid = this.game.add.sprite(asteroid.body.position.x,
                                                        asteroid.body.position.y,
                                                        "asteroid_tiny_1");
                this.game.physics.arcade.enable(new_asteroid);
                new_asteroid.anchor.set(0.5);
                new_asteroid.body.collideWorldBounds = true;
                new_asteroid.body.bounce.set(1.0);
                new_asteroid.body.friction.set(0.0);
                new_asteroid.body.angularVelocity = Math.random() * 40 - 20;
                new_asteroid.body.angle = Math.random() * Math.PI * 2;
                
                new_asteroid.body.velocity.set(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
                new_asteroid.body.velocity.add(asteroid.body.velocity.x / asteroid_count, asteroid.body.velocity.y / asteroid_count);
                
                this.asteroids_small.add(new_asteroid);  
            }
            asteroid.destroy();
        }, this);
        
        this.asteroids_small.forEachDead(function(asteroid) {
            this.score += 1;
            asteroid.destroy();
        }, this);
        
        this.score_text.text = "Score: " + this.score;
	this.fps_text.text = "fps: " + this.game.time.fps;
        this.health_text.text = "Health: " + this.player.health
    }
};
