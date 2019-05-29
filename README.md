# bitcoin-key-generator
a bitcoin key generator which safe and no dependencies and native javascript library.

attention：`node version request >= 12.0`

# Get Privte Key
```js
const BKG = require('bitcoin-key-generator');
// Method 1:
let privteKey1 = BKG.getPrivteKeyByOrigin(
    BKG.getPrivteOriginKeyByStr('Hello')
);
// Method 2:
let privteKey2 = BKG.getPrivteKeyByOrigin(
    BKG.getPrivteOriginKeyByRand('Hello')
);
```
# Get Public Key
```js
let address1 = BKG.getPublicKeyByOrigin(
    BKG.getPublicOriginKey(privteKey1)
);
```
# Get Privte Origin Key
```js
let privteOriginKey1 = BKG.getPrivteOriginKeyByKey(privteKey1);
```