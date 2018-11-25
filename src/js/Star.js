export default class Star {
  constructor(canvasSize = {}, radius = 10, friction = 0, pos = 0, color = "red") {
    this.canvasSize = canvasSize
    this.radius = radius
    this.friction = friction
    this.color = color
    this.pos = pos
    this.shatterRadius = 3
    this.vel = p5.Vector.random2D().mult(2)
    this.acc = new p5.Vector()
    this.particles = []
  }

  shrink() {
    this.radius /= 1.5
  }

  shatter() {
    for (let i = 0; i < 5; i++) {
      this.particles.push(new StarParticles(this.canvasSize, this.radius, this.friction, this.pos, this.color))
    }
    this.shrink()
  }

  update() {
    // borders ASIX_X && gravity && shattering
    if (this.pos.y + this.radius / 2 + this.vel.y >= this.canvasSize.height) {
      this.vel.x *= this.friction * 1.2
      this.vel.y = -this.vel.y * this.friction
      this.radius > this.shatterRadius ? this.shatter() : this.shrink()
    } else {
      this.vel.y += Star.gravity
    }
    // borders ASIX_Y
    if (this.pos.x + this.radius / 2 + this.vel.x >= this.canvasSize.width ||
      this.pos.x - this.radius / 2 + this.vel.x <= 0) {
      this.radius > this.shatterRadius ? this.shatter() : this.shrink()
      this.vel.x = -this.vel.x
    }
    this.pos.add(this.vel)
    // p5.Vector.add(this.pos, this.vel)
  }

  show(p5) {
    p5.noStroke()
    p5.drawingContext.fillStyle = "#ddd"
    p5.ellipse(this.pos.x, this.pos.y, this.radius)
    for (let i in this.particles) {
      this.particles[i].update()
      this.particles[i].show(p5)
    }
  }
}

Star.gravity = 0.3

class StarParticles extends Star {
  constructor(canvasSize, radius, friction, pos, color) {
    super(canvasSize, radius, friction, pos, color)
    this.pos = pos.copy()
    this.vel = p5.Vector.random2D().mult(4)
    this.vel.y *= 6
  }
  update() {
    // borders ASIX_X
    if (this.pos.y + this.radius / 2 + this.vel.y >= this.canvasSize.height) {
      this.vel.y = -this.vel.y
    } else {
      this.vel.y += Star.gravity * 1.5
    }
    // borders ASIX_Y
    if (this.pos.x + this.radius / 2 + this.vel.x >= this.CanvasWidth ||
      this.pos.x - this.radius / 2 + this.vel.x <= 0) {
      this.vel.x = -this.vel.x
    }
    // set faster shtinking to avoid visible disappearing
    this.radius > 4 ? this.radius *= 0.95 : this.radius *= 0.9
    this.pos.add(this.vel)
  }

  show(p5) {
    p5.noStroke()
    p5.fill("white")
    p5.ellipse(this.pos.x, this.pos.y, this.radius)
  }
}