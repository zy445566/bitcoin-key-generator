# bitcoin-key-generator
a bitcoin key generator which safe and no dependencies and native javascript library.

attention：`node version request >= 12.0`

# Get Privte Key
```js
const BKG = require('bitcoin-key-generator');
// Method 1:
let privteOriginKey1 = BKG.getPrivteOriginKeyByStr('Hello');// 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
let privteKey1 = BKG.getPrivteKeyByOrigin(privteOriginKey1);// 5J12ASfjmVAX7efMjvvr4h4Q19xd4wZPPEf9dqiLda8QtWAT93b
// Method 2:
let privteKey2 = BKG.getPrivteKeyByOrigin(BKG.getPrivteOriginKeyByRand());// 5JMtDQYeeLMrFirM7BdxQv9CpvcAP6hCT4xAiZYGWkTwf3PcBud
```

# Get Public Key
```js
let address1 = BKG.getPublicKeyByOrigin(
    BKG.getPublicOriginKey(privteOriginKey1)
); // 1AFAEr2oY7HQp7L7sxyHCfXBFf7zo935sv
```

# Get Privte Origin Key
```js
let privteOriginKey2 = BKG.getPrivteOriginKeyByKey(privteKey2); //47bec1393676aa66b2a2715a621eb2431a9b62864224702490010c59d0113101
```
