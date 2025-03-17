#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Define the DHT sensor pin and type
#define DHTPIN 2       // Pin connected to the DHT22 data pin
#define DHTTYPE DHT22  // Define the sensor type (DHT22)

// Initialize the DHT sensor
DHT dht(DHTPIN, DHTTYPE);

// Initialize the LCD with I2C address 0x27 (the address you found)
LiquidCrystal_I2C lcd(0x27, 16, 2);
byte deg[8] = {
  0b00111,
  0b00101,
  0b00111,
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b00000

};

void setup() {
 
 lcd.init();
 lcd.init();
 lcd.backlight();
 lcd.print("Temp : ");
  lcd.setCursor(0, 0);
  lcd.print("Humidity: ");
  lcd.createChar(1, deg);
  lcd.setCursor(9, 0);
  lcd.write(1);
  lcd.print("c");
  lcd.setCursor(13, 1);
  lcd.print("%");
}

void loop() {
  // Reading temperature and humidity from the DHT sensor
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Check if reading failed
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.clear();
    lcd.print("Sensor error!");
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" °C");
  Serial.print("\tHumidity: ");
  Serial.print(h);
  Serial.println(" %");

  lcd.clear();
  lcd.setCursor(0, 0);  
  lcd.println("Temp: ");
  lcd.print(t);
  lcd.print("C");

  lcd.setCursor(0, 1);  // Second line of the LCD
  lcd.print("Humidity: ");
  lcd.print(h);
  lcd.print("%");

  // Wait a few seconds before the next reading
  delay(1000);  // Delay 2 seconds
}
