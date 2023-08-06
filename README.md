# ts-pax

Allows the use of native features (SALE, RETURN, SCAN, GET HISTORY...) of a Pax device.

## Installation

Install with pnpm

```bash
  pnpm add ts-pax
```

Install with yarn
```bash
  yarn add ts-pax
```

Install with npm
```bash
  npm install ts-pax
```

## Usages

#### Demo
```js
import Pax from 'pax-ts';

const pax = new Pax({
    ip: '192.168.1.114',
    port: 10009,
});
```

#### Options

| Option      | Type     | Default | Description                                                              |
|-------------|----------|---------|--------------------------------------------------------------------------|
| **ip**      | `String` | `0`     | The IP of the Pax                                                        |
| **port**    | `Number` | `10009` | The port of the Pax                                                      |
| **timeout** | `Number` | `10000` | Timeout of request, after this the request will be cancel (milliseconds) |

## Methods

### doInitialize

### localTotalReport

### localDetailReport

### doMenu

### doSales

### doAdjust

### doVoid

### doBatchClose

### doReturn

### showDialog

### showTextBox