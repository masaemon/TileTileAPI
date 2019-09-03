class Tile {
  constructor(id, tileid) {
    this.tileid = tileid;
    this.obniz = new Obniz(id);
    this.onConnected = false;
  }

  initTile() {
    this.onConnected = true;
    this.obniz.io7.output(true);
    this.leds = this.obniz.wired("WS2812", {gnd:0, vcc: 1, din: 3});
    this.button = this.obniz.wired("Button", {signal: 5});
    this.IR = this.obniz.wired('IRSensor', {output: 4});
    this.IR.start((arr) => {
    });
  }

  lightAllColor(r, g, b, lednums) {
    const ledArray = [];
    for(let i = 0; i < lednums; i++) ledArray.push([r, g, b]);
    this.leds.rgbs(ledArray);
    this.obniz.wait(50);
  }

  lightColor(r, g, b) {
    this.leds.rgb(r, g, b);
  }
}
