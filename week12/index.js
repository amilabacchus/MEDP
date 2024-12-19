// Declare variables for the particle system and texture
let particleTexture;
let particleSystem;

//function preload() {
//  particleTexture = loadImage('/assets/particle_texture.png');
//}

function setup() {
  // Set the canvas size
  createCanvas(720, 400);
  colorMode(HSB);

  // Initialize the particle system
  particleSystem = new ParticleSystem(
    0,
    createVector(width / 3, height - 100),
    particleTexture
  );

  describe(
    'White circle gives off smoke in the middle of the canvas, with wind force determined by the cursor position.'
  );
}

function draw() {
  background(100,250,150);

  // Calculate the wind force based on the mouse x position
  let dx = map(mouseX, 0, width, -0.4, 0.4);
  let wind = createVector(dx, 0);

  // Apply the wind and run the particle system
  particleSystem.applyForce(wind);
  particleSystem.run();
  for (let i = 0; i < 5; i += 1) {
    particleSystem.addParticle();
  }

  // Draw an arrow representing the wind force
  drawVector(wind, createVector(width / 2, height / 2), 500);
}

// Display an arrow to show a vector magnitude and direction
function drawVector(v, loc, scale) {
  push();
  let arrowSize = 8;
  translate(loc.x, loc.y);
  stroke(255);
  strokeWeight(3);
  rotate(v.heading());

  let length = v.mag() * scale;
  line(0, 0, length, 0);
  line(length, 0, length - arrowSize, +arrowSize / 2);
  line(length, 0, length - arrowSize, -arrowSize / 2);
  pop();
}

class ParticleSystem {
  constructor(particleCount, origin) {
    this.particles = [];

    // Make a copy of the input vector
    this.origin = origin.copy();

    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin));
    }
  }

  run() {
    // Loop through and run each particle
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();

      // Remove dead particles
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Apply force to each particle
  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }
} // class ParticleSystem

class Particle {
  constructor(pos) {
    this.loc = pos.copy();

    let xSpeed = randomGaussian() * 0.5;
    let ySpeed = randomGaussian() * 0.5 - 1.5;

    this.velocity = createVector(xSpeed, ySpeed);
    this.acceleration = createVector();
    this.lifespan = 150.0;

    let hue = random(360);
    let saturation = 50;
    let brightness = 90;
    this.color = color(hue, saturation, brightness);
  }

  // Update and draw the particle
  run() {
    this.update();
    this.render();
  }

  // Draw the particle
  render() {
    noStroke();
    fill(this.color, this.lifespan);
    ellipse(this.loc.x, this.loc.y, 10);
  }

  applyForce(f) {
    // Add the force vector to the current acceleration vector
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  // Update the particle's position, velocity, lifespan
  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 2.5;

    // Set the acceleration to zero
    this.acceleration.mult(0);
  }
} // class Particle