// 主网测试私钥原值：eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19
// 主网测试私钥值：5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr
// 主网测试公钥原值：04ea279824636aa9172473b6c3076727f17dada14847305487405a38a09c91ce6d63478f426ddcf618be66568cb6bd5bd7201c71689705d9602ae0a7c131a3bafb
// 主网测试地址值：1CH9yicUdqhrxL2EHmHaZMDxtPJ3YM3Kzm
const assert = require('assert');
const bitcoinGenerate = require('./index.js');
const n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141n;
let testUnit = {
    [Symbol('test.getPrivteOriginKeyByStr')] : async function() {
        assert.strictEqual(
            bitcoinGenerate.getPrivteOriginKeyByStr('test'),
            '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
            'getPrivteOriginKeyByStr error!'
        );
    },
    [Symbol('test.getPrivteOriginKeyByRand')] : async function() {
        let privteOriginKey = bitcoinGenerate.getPrivteOriginKeyByRand();
        let privteOriginKeyValue = BigInt(`0x${privteOriginKey}`);
        assert(
            privteOriginKey.length==64 && privteOriginKeyValue<n,
            'getPrivteOriginKeyByRand error!'
        );
    },
    [Symbol('test.getPrivteOriginKeyByKey')] : async function() {
        assert.strictEqual(
            bitcoinGenerate.getPrivteOriginKeyByKey('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr'),
            'eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19',
            'getPrivteOriginKeyByKey error!'
        );
    },
    [Symbol('test.getPrivteKeyByOrigin')] : async function() {
        assert.strictEqual(
            bitcoinGenerate.getPrivteKeyByOrigin('eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19'),
            '5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr',
            'getPrivteKeyByOrigin error!'
        );
    },
    [Symbol('test.getPublicOriginKey')] : async function() {
        assert.strictEqual(
            bitcoinGenerate.getPublicOriginKey('eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19'),
            '04ea279824636aa9172473b6c3076727f17dada14847305487405a38a09c91ce6d63478f426ddcf618be66568cb6bd5bd7201c71689705d9602ae0a7c131a3bafb',
            'getPublicOriginKey error!'
        );
    },
    [Symbol('test.getPublicKeyByOrigin')] : async function() {
        assert.strictEqual(
            bitcoinGenerate.getPublicKeyByOrigin(
                '04ea279824636aa9172473b6c3076727f17dada14847305487405a38a09c91ce6d63478f426ddcf618be66568cb6bd5bd7201c71689705d9602ae0a7c131a3bafb'
            ),
            '1CH9yicUdqhrxL2EHmHaZMDxtPJ3YM3Kzm',
            'getPublicKeyByOrigin error!'
        );
    },
}

async function run(testUnitList) {
    for(let testUnitValue of testUnitList) {
        for(let testFunc of Object.getOwnPropertySymbols(testUnitValue)) {
            await testUnitValue[testFunc]();
        }
    }
}
run([testUnit]);