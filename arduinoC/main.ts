
enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LINE {
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}

enum BTN {
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="A+B"
    AB
}


//% color="#c7c700" iconWidth=50 iconHeight=40
namespace led {
    //% block="config LED interval [N]" blockType="command"
    //% N.shadow="range" N.params.min=1 N.params.max=128 N.defl=1
    export function ledConfig(parameter: any, block: any) {
        let n = parameter.N.code
        Generator.addObject(`set LED Pin`, `const int led`, `= 2;`);
        Generator.addObject(`set LED Pre`, `unsigned long previousMillis`, `= 0;`);
        Generator.addObject(`set LED Interval`, `const long interval`, `= ${n}*1000;`);   
        Generator.addObject(`set led state`, `int ledState`, `= LOW;`);
    }

    //% block="start LED test" blockType="command"
    export function ledStart(parameter: any, block: any) {
        Generator.addSetupMainTop("setPinModeOfLed", `pinMode(led, OUTPUT);`);
        Generator.addCode(`//loop to blink without delay\n\tunsigned long currentMillis = millis();\n\tif (currentMillis - previousMillis >= interval) {\n\t\t// save the last time you blinked the LED\n\t\tpreviousMillis = currentMillis;\n\t\t// if the LED is off turn it on and vice-versa:\n\t\tledState = not(ledState);\n\t\t// set the LED with the ledState of the variable:\n\t\tdigitalWrite(led,  ledState);`);
    }

}
