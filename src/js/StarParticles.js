// import Star from "./Star"
//
// export default class StarParticles extends Star {
//   constructor(radius, pos, velocity) {
//     super()
//     this.pos = pos.copy()
//     this.vel = p5.Vector.random2D().mult(5)
//   }
//   update() {
//     this.radius *= 0.98
//     this.vel.y += 0.2
//     this.pos.add(this.vel)
//   }
//
//   show(p5) {
//     p5.stroke("white")
//     p5.fill("rgba(0,0,0,0.5)")
//     p5.ellipse(this.pos.x, this.pos.y, this.radius)
//   }
// }