import Star from "./Star"

const colors = [
  "#E84855",
  "#FF9B71",
  "#E2B33B",
  "#168AFE"
]


new p5(function(p5) {
  let stars = []
  let canvasSize
  let backgroundGradient
  let staticStars = []
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    backgroundGradient = p5.drawingContext.createLinearGradient(0, 0, 0, p5.height)
    backgroundGradient.addColorStop(0, "#222")
    backgroundGradient.addColorStop(1, "#134")
    canvasSize = {
      width: p5.width,
      height: p5.height * 0.8
    }
    // creating static stars
    for (let i = 0; i < 150; i++) {
      let pos = p5.createVector(p5.random(p5.width), p5.random(p5.height * 0.75))
      staticStars.push(newStar(pos, 2, 5))
    }
    // creating falling stars
    for (let i = 0; i < 4; i++) {
      stars.push(newStar())
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  // init function for stars
  function newStar(pos, radius_from = 20, radius_to = 35) {
    let radius = p5.floor(p5.random(radius_from, radius_to))
    let friction = p5.random(0.5, 0.7)
    let position
    pos ? position = pos : position = p5.createVector(p5.random(p5.width), -40)
    let mainColor = p5.random(colors)
    let color = {
      mainColor,
      secondary: p5.random(colors.filter(col => col != mainColor))
    }
    return new Star(canvasSize, radius, friction, position, color)
  }

  p5.draw = () => {
    p5.drawingContext.fillStyle = backgroundGradient
    p5.drawingContext.fillRect(0, 0, p5.width, p5.height)
    p5.drawingContext.fillStyle = "rgba(30,50,50,0.6)"
    p5.drawingContext.shadowColor = "rgb(50,150,200)";
    p5.drawingContext.shadowBlur = 100;
    p5.rect(0, p5.height * 0.8, p5.width, p5.height)
    p5.drawingContext.shadowColor = "white";
    p5.drawingContext.shadowBlur = 10;
    for (let i in staticStars) {
      staticStars[i].show(p5)
    }
    for (let i in stars) {
      if (stars[i].radius > 2) {
        p5.drawingContext.shadowColor = "white";
        p5.drawingContext.shadowBlur = 15;
        stars[i].update()
        stars[i].show(p5)
      } else {
        stars = stars.filter(star => star != stars[i])
        stars.push(newStar())
      }
    }
  }
})