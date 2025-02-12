#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define dhtpin 2
#define dhttype DHT22

DHT dht(dhtpin, dhttype);

LiquidCrystal_I2C lcd(0x27, 16, 2);
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  // Initialize DHT sensor
  dht.begin();
  
  // Initialize LCD
  lcd.begin(16, 2);
  lcd.print("DHT22 Readings");
  
  delay(2000);

}

void loop() {
  // put your main code here, to run repeatedly:
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    lcd.clear();
    lcd.print("Failed to read DHT");
    return;
  }

  lcd.clear();
  
  // Display temperature and humidity
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(int(temperature));
  lcd.print("C");
  
  lcd.setCursor(0, 1);
  lcd.print("Humidity: ");
  lcd.print(int(humidity));
  lcd.print("%");
  
  delay(2000); 

}
// https://wokwi.com/projects/422689455679093761