export type ContinuousScreen = 0 | 1;
export type EnableHardKey = 0 | 1;
export type SignatureBox = 0 | 1;
export type NumericKeys = 'KEY0' | 'KEY1' | 'KEY2' | 'KEY3' | 'KEY4' | 'KEY5' | 'KEY6' | 'KEY7' | 'KEY8' | 'KEY9';
export type ControlKeys = 'KEYCANCEL' | 'KEYENTER' | 'KEYCLEAR';
export type HardKeys = NumericKeys | ControlKeys;
export type TimeOut = number | '';