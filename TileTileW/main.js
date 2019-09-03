let selectedTile = 0

const tileColorR = new Array(3)
const tileColorG = new Array(3)
const tileColorB = new Array(3)
const tile = new Array(3);

// obniz id: 1
tile[0] = new Tile("", 1)
tile[0].obniz.onconnect = async () =>  {
  tile[0].initTile()
  tile[0].button.onchange = onBtn0
  tile[0].IR.ondetect = onIR0
}

// obniz id: 2
tile[1] = new Tile("", 2)
tile[1].obniz.onconnect = async () => {
  tile[1].initTile()
  tile[1].button.onchange = onBtn1
  tile[1].IR.ondetect = onIR1
}

// obniz id: 3
tile[2] = new Tile("", 3)
tile[2].obniz.onconnect = async () => {
  tile[2].initTile()
  tile[2].button.onchange = onBtn2
  tile[2].IR.ondetect = onIR2
}

function setup() {
  console.log(tileColorB)
  for(let i = 0; i < 3; i++) {
    tileColorR[i] = 0
    tileColorG[i] = 0
    tileColorB[i] = 0
  }
  width = windowWidth
  height = windowHeight
  createCanvas(width, height)
  strokeWeight(5)
}

function draw() {
  background(255)
  for(let i = 0; i < 3; i++) {
    drawTile(width/3*i + width/12, height/6, tileColorR[i], tileColorG[i], tileColorB[i], width/6, width/6)
  }
  drawColorBar()
  drawSelectedTile()
}

function mousePressed() {
  for(let i = 0; i < 3; i++) {
    if(width/3*i + width/12 < mouseX && mouseX < width/3*i + width/12 + width/6) {
      if(height/6 < mouseY && mouseY < height/6 + width/6) {
        selectedTile = i
      }
    }
  }

  if(width/12 < mouseX && mouseX < width - width/12) {
    const redBarValue = map(tileColorR[selectedTile], 0, 255, width/12, width - width/12)
    const greenBarValue = map(tileColorG[selectedTile], 0, 255, width/12, width - width/12)
    const blueBarValue = map(tileColorB[selectedTile], 0, 255, width/12, width - width/12)
    if(dist(mouseX, mouseY, redBarValue, 2 * height/3) < height/30){
      tileColorR[selectedTile] = map(mouseX, width/12, width - width/12, 0, 255)
    }
    if(dist(mouseX, mouseY, greenBarValue, 2 * height/3 + height/12) < height/30){
      tileColorR[selectedTile] = map(mouseX, width/12, width - width/12, 0, 255)
    }
    if(dist(mouseX, mouseY, blueBarValue, 2 * height/3 + height/6) < height/30){
      tileColorR[selectedTile] = map(mouseX, width/12, width - width/12, 0, 255)
    }
    console.log("R: ", tileColorR[selectedTile], " G: ", tileColorG[selectedTile], " B: ", tileColorB[selectedTile])
    tile[selectedTile].lightAllColor(parseInt(tileColorR[selectedTile]), parseInt(tileColorG[selectedTile]), parseInt(tileColorB[selectedTile]), 26)
  }
}

drawColorBar = () => {
  line(width/12, 2 * height/3, width - width/12, 2 * height/3)
  line(width/12, 2 * height/3 + height/12, width - width/12, 2 * height/3 + height/12)
  line(width/12, 2 * height/3 + height/6, width - width/12, 2 * height/3 + height/6)
  const redBarValue = map(tileColorR[selectedTile], 0, 255, width/12, width - width/12)
  const greenBarValue = map(tileColorG[selectedTile], 0, 255, width/12, width - width/12)
  const blueBarValue = map(tileColorB[selectedTile], 0, 255, width/12, width - width/12)
  fill(255, 0, 0)
  circle(redBarValue, 2 * height/3, height/30)
  fill(0, 255, 0)
  circle(greenBarValue, 2 * height/3 + height/12, height/30)
  fill(0, 0, 255)
  circle(blueBarValue, 2 * height/3 + height/6, height/30)
}

drawSelectedTile = () => {
  fill(255, 255, 255)
  circle(width/3*selectedTile + width/6, height/10, height/30)
}

drawTile = (x, y, r, g, b, w, h) => {
  fill(r, g, b)
  rect(x, y, w, h)
}

windowResized = () => {
  width = windowWidth
  height = windowHeight
  resizeCanvas(width, height)
}

onBtn0 = (pressed) => {
  if(pressed) {
    const r = parseInt(Math.random()*120)
    const g = parseInt(Math.random()*120)
    const b = parseInt(Math.random()*120)
    setTileColor(0, r*256/120, g*256/120, b*256/120)
    tile[0].lightAllColor(r, g, b, 26)
  }
}

onBtn1 = (pressed) => {
  if(pressed) {
    const r = parseInt(Math.random()*120)
    const g = parseInt(Math.random()*120)
    const b = parseInt(Math.random()*120)
    setTileColor(1, r*256/120, g*256/120, b*256/120)
    tile[1].lightAllColor(r, g, b, 26)
  }
}

onBtn2 = (pressed) => {
  if(pressed) {
    const r = parseInt(Math.random()*120)
    const g = parseInt(Math.random()*120)
    const b = parseInt(Math.random()*120)
    setTileColor(2, r*256/120, g*256/120, b*256/120)
    tile[2].lightAllColor(r, g, b, 26)
  }
}

onIR0 = (arr) => {
  tile[0].lightAllColor(0, 0, 0, 26)
  setTileColor(0, 0, 0, 0)
}

onIR1 = (arr) => {
  tile[1].lightAllColor(0, 0, 0, 26)
  setTileColor(1, 0, 0, 0)
}

onIR2 = (arr) => {
  tile[2].lightAllColor(0, 0, 0, 26)
  setTileColor(2, 0, 0, 0)
}

setTileColor = (id, r, g, b) => {
  tileColorR[id] = r
  tileColorG[id] = g
  tileColorB[id] = b
}
