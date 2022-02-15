const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const EspPeripheral = require('../arduinoCommon/esp-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // CH340
    'USB\\VID_1A86&PID_7523',
    // CH9102
    'USB\\VID_1A86&PID_55D4',
    // CP2102
    'USB\\VID_10C4&PID_EA60'
];

/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 57600,
    dataBits: 8,
    stopBits: 1,
    rtscts: true
};

/**
 * Configuration for arduino-cli.
 * @readonly
 */
const DIVECE_OPT = {
    type: 'arduino',
    fqbn: 'esp32:esp32:esp32'
};

const Pins = {
    IO0: '0',
    IO1: '1',
    IO2: '2',
    IO3: '3',
    IO4: '4',
    IO5: '5',
    IO6: '6',
    IO7: '7',
    IO8: '8',
    IO9: '9',
    IO10: '10',
    IO11: '11',
    IO12: '12',
    IO13: '13',
    IO14: '14',
    IO15: '15',
    IO16: '16',
    IO17: '17',
    IO18: '18',
    IO19: '19',
    IO21: '21',
    IO22: '22',
    IO23: '23',
    IO25: '25',
    IO26: '26',
    IO27: '27',
    IO32: '32',
    IO33: '33',
    IO34: '34',
    IO35: '35',
    IO36: '36',
    IO39: '39'
};

const Level = {
    High: 'HIGH',
    Low: 'LOW'
};


const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};
//电机端口
const MOTO = {
    M1: 'm1',
    M2: 'm2'
};

//遥控按键
const controlkey = {
    key1: 'k1',
    key2: 'k2',
    key3: 'k3',
    key4: 'k4',
    key5: 'k5',
    key6: 'k6',
    key7: 'k7',
    key8: 'k8',
    key9: 'k9',
    key10: 'k10',
    key11: 'k11',
    key12: 'k12',
};

//遥控摇杆
const controlyg = {
    yg1: 'k1',
    yg2: 'k2',
    yg3: 'k3',
    yg4: 'k4',
};


/**
 * Manage communication with a Arduino esp32 peripheral over a OpenBlock Link client socket.
 * 管理沟通与Arduino esp32外围OpenBlock连接客户端套接字。
 */
class ZQ202 extends EspPeripheral{
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * OpenBlock blocks to interact with a Arduino esp32 peripheral.
 */
class OpenBlockZQ202Device {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'ZQ202';
    }
//读取数字端口定义
    get PINS_MENU () {
        return [
            {
                text: 'P0',
                value: Pins.IO4
            },
            {
                text: 'P1',
                value: Pins.IO5
            },
            {
                text: 'P2',
                value: Pins.IO6
            },
            {
                text: 'P3',
                value: Pins.IO7
            },
            {
                text: 'P4',
                value: Pins.IO8
            },
            {
                text: 'P5',
                value: Pins.IO9
            },
            {
                text: 'P6',
                value: Pins.IO10
            },
            {
                text: 'S1',
                value: Pins.IO0
            },
            {
                text: 'S2',
                value: Pins.IO1
            },
            {
                text: 'S3',
                value: Pins.IO2
            },
            {
                text: 'S4',
                value: Pins.IO3
            }
        ];
    }

//遥控按键
get control_key_MENU () {
    return [
        {
            text: '方块',
            value: controlkey.key1
        },
        {
            text: '叉叉',
            value: controlkey.key2
        },
        {
            text: '圆圈',
            value: controlkey.key3
        },
        {
            text: '三角',
            value: controlkey.key4
        },
        {
            text: '向上',
            value: controlkey.key5
        },
        {
            text: '向下',
            value: controlkey.key6
        },
        {
            text: '向左',
            value: controlkey.key7
        },
        {
            text: '向右',
            value: controlkey.key8
        },
        {
            text: 'R1',
            value: controlkey.key9
        },
        {
            text: 'R2',
            value: controlkey.key10
        },
        {
            text: 'L1',
            value: controlkey.key11
        },
        {
            text: 'L2',
            value: controlkey.key12
        }
    ];
}
//遥控摇杆
get control_yg_MENU () {
    return [
        {
            text: '左摇杆左右',
            value: controlyg.yg1
        },
        {
            text: '左摇杆上下',
            value: controlyg.yg2
        },
        {
            text: '右摇杆左右',
            value: controlyg.yg3
        },
        {
            text: '右摇杆上下',
            value: controlyg.yg4
        }
    ];
}
//输出端口定义
    get OUT_PINS_MENU () {
        return [
            {
                text: 'S0',
                value: Pins.IO0
            },
            {
                text: 'S1',
                value: Pins.IO1
            },
            {
                text: 'S2',
                value: Pins.IO2
            },
            {
                text: 'S3',
                value: Pins.IO3
            },
            {
                text: 'S4',
                value: Pins.IO4
            }
        ];
    }
    
//模拟端口设置
    get ANALOG_PINS_MENU () {
        return [
            {
                text: 'P0',
                value: Pins.IO4
            },
            {
                text: 'P1',
                value: Pins.IO5
            },
            {
                text: 'P2',
                value: Pins.IO6
            },
            {
                text: 'P3',
                value: Pins.IO7
            },
            {
                text: 'P4',
                value: Pins.IO8
            },
            {
                text: 'P5',
                value: Pins.IO9
            },
            {
                text: 'P6',
                value: Pins.IO10
            },
            {
                text: 'P7',
                value: Pins.IO11
            },
            {
                text: 'P8',
                value: Pins.IO12
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: '高',
                value: Level.High
            },
            {
                text: '低',
                value: Level.Low
            }
        ];
    }

    get LEVEL1_MENU () {
        return [
            {
                text: '打开',
                value: Level.High
            },
            {
                text: '关闭',
                value: Level.Low
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: '换行',
                value: Eol.Warp
            },
            {
                text: '不换行',
                value: Eol.NoWarp
            }
        ];
    }

    get MOTO_MENU () {
        return [
            {
                text: '电机1',
                value: MOTO.M1
            },
            {
                text: '电机2',
                value: MOTO.M2
            }
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino esp32 peripheral instance
        this._peripheral = new ZQ202(this.runtime,
            OpenBlockZQ202Device.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'pinZQ',
                name: '控制器',
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'zq202setDigitalOutput',
                        text: '设置端口[PIN]数字输出[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO0
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'zq202SetPwmOutput',
                        text: '设置端口[PIN]模拟输出[OUT]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO0
                            },
                            OUT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'zq202readDigitalPin',
                        text:'读取数字端口[PIN]', 
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: Pins.IO4
                            }
                        }
                    },
                    {
                        opcode: 'zq202readAnalogPin',
                        text:'读取模拟端口[PIN]', 
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: Pins.IO4
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'zq202qibeng',
                        text: '设置气泵端口[PIN]状态[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO0
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level1',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'zq202buzzer',
                        text: '设置蜂鸣器状态[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level1',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'zq202run',
                        text:'读取运行开关状态', 
                        blockType: BlockType.BOOLEAN,
                    },
                    '---',
                    {
                        opcode: 'zq202EEPROMupdate',
                        text: 'EEPROM向地址[PIN]写数据[OUT]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            OUT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'zq202EEPROMread',
                        text:'EEPROM从地址[PIN]读数据', 
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'zq202runningTime',
                        text:'读取系统时间',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'zq202SerialPrint',
                        text:'设置串口打印[VALUE] [EOL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello Robot'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                    },
                    {
                        opcode: 'zq202SerialAvailable',
                        text:'串口是否有数据可读',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    },
                    {
                        opcode: 'zq202SerialReadAByte',
                        text: '读取串口数据',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'zq202dataMap',
                        text: '映射 [DATA] 从([ARG0], [ARG1]) 到 ([ARG2], [ARG3])',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            }
                        },
                    }
                ],
                menus: {
                    outPins: {
                        items: this.OUT_PINS_MENU
                    },
                    analogPins: {
                        items: this.ANALOG_PINS_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    level1: {
                        items: this.LEVEL1_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    }  
                }
            }
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
    setPinMode (args) {
        this._peripheral.setPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
    setDigitalOutput (args) {
        this._peripheral.setDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
    setPwmOutput (args) {
        this._peripheral.setPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
    readDigitalPin (args) {
        return this._peripheral.readDigitalPin(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
    readAnalogPin (args) {
        return this._peripheral.readAnalogPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    setServoOutput (args) {
        this._peripheral.setServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockZQ202Device;
