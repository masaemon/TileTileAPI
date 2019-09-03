#include <FastLED.h>
#define NUM_STRIPS 4
#define NUM_LEDS 26

HardwareSerial serial1(1);

int DATA_PIN[4] = {21, 15, 12, 32};
CRGB leds[NUM_STRIPS][NUM_LEDS];

#define FPS 30
int values[5];

bool isButton[4];
bool isIR[4];

bool isIRready[4];

int IRCount[4];
int ButtonCount[4];

void setup() {
  // シリアルポートの設定
  Serial.begin(115200);
  serial1.begin(115200, SERIAL_8N1, 18, 19);
  delay(100);

  // FastLEDの設定
  FastLED.addLeds<NEOPIXEL, 21>(leds[0], NUM_LEDS);
  FastLED.addLeds<NEOPIXEL, 15>(leds[1], NUM_LEDS);
  FastLED.addLeds<NEOPIXEL, 12>(leds[2], NUM_LEDS);
  FastLED.addLeds<NEOPIXEL, 32>(leds[3], NUM_LEDS);
  FastLED.setBrightness(64);
  for (int i = 0; i < 4; i++) {
    pinMode(DATA_PIN[i], OUTPUT);
    pinMode(DATA_PIN[i] + 1, INPUT);
    pinMode(DATA_PIN[i] + 2, INPUT);
    for (int j = 0; j < NUM_LEDS; j++) {
      leds[i][j] = CRGB::Black;
      delay(1);
      FastLED.show();
    }
  }
}

void loop() {
  getValue();

  for (int i = 0; i < 4; i++) {
    tileStep(i);
    tileIR(i);
  }
  //Serial.println(digitalRead(DATA_PIN[3] + 2) * 10);

  delay(5);
}

void tileStep(int i) {
  if (digitalRead(DATA_PIN[i] + 1) == LOW && !isButton[i]) {
    serial1.print("t");
    serial1.print(",");
    serial1.print(1);
    serial1.print(",");
    serial1.println(i);
    isButton[i] = true;
  }

  if (digitalRead(DATA_PIN[i] + 1) == HIGH) {
    isButton[i] = false;
  }
}

void tileIR(int i) {
  //if (isIRready[i]) {
  if (digitalRead(DATA_PIN[i] + 2) == LOW && !isIR[i]) {
    if (isIR[i] == false) {
      serial1.print("ir");
      serial1.print(",");
      serial1.print(1);
      serial1.print(",");
      serial1.println(i);
      Serial.println(i);
      isIR[i] = true;
    }
  }

  if (digitalRead(DATA_PIN[i] + 2) == HIGH) {
    if (isIR[i]) {
      IRCount[i] += 1;
      if (IRCount[i] > 50) {
        isIR[i] = !isIR[i];
        IRCount[i] = 0;
      }
    }
  }
  //}
}

void getValue() {
  if (serial1.available() > 0) {
    char arduinoId = serial1.read();
    if (arduinoId == '1') {
      values[0] = serial1.read(); //TileID
      //serial1.println(values[0]);
      values[1] = serial1.read(); //Color R
      //serial1.println(values[1]);
      values[2] = serial1.read(); //Color G
      //serial1.println(values[2]);
      values[3] = serial1.read(); //Color B
      //serial1.println(values[3]);
      values[4] = serial1.read(); //Mode
      //serial1.println(values[4]);
    }

    if (values[1] == 'i') {
      onIRready(values[0]);
    } else {
      SetColor(values[0], values[1], values[2], values[3], values[4]);
    }
  }
}

void onIRready(int tileID) {
  isIRready[tileID] = !isIRready[tileID];
}

void checkIR(int tileID, int count) {
}


void SetColor(int tileID, int R, int G, int B, int tileMode) {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[tileID][i] = CRGB(R, G, B);
    delay(1);
    FastLED.show();
  }
}
