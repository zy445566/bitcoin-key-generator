const n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141n;

const crypto = require('crypto');
const util = require('./util');


// 简易sha256通过字符串生成摘要，还是建议直接在[1,n-1]选取自己喜欢的私钥
function getPrivteOriginKeyByStr(strSeed) {
    return crypto.createHash('sha256').update(strSeed).digest('hex');
}

// 随机生成私钥原值
function getPrivteOriginKeyByRand() {
    let nHex = n.toString(16);
    let privteKeyList = [];
    let isZero = true;
    for(let i=0;i<nHex.length;i++) {
        let rand16Num = Math.round(Math.random()*parseInt(nHex[i],16));
        privteKeyList.push(rand16Num.toString(16));
        if(rand16Num>0) {isZero = false;}
    }
    if(isZero){return getPrivteOriginKeyByRand();}
    return privteKeyList.join('');
}

// 根据私钥获取获取原值
function getPrivteOriginKeyByKey(privteKey) {
    let privteHexKey = util.base582Hex(privteKey);
    return privteHexKey.slice(2,66);
}

function hex2sha256(hexStr) {
    return crypto.createHash('sha256').update(Buffer.alloc(hexStr.length/2,hexStr, 'hex')).digest('hex');
}

function getPrivteKeyByOrigin(privteKeyOrigin) {
    if(privteKeyOrigin.length!==64){
        throw new Error('privte Key Origin length must be 64!')
    }
    let version = '80';
    let sha1Str = `${version}${privteKeyOrigin}`;
    let sha1 =  hex2sha256(sha1Str);
    let sha2Str = `${sha1}`;
    let sha2 =  hex2sha256(sha2Str);
    let key = `${version}${privteKeyOrigin}${sha2.slice(0,8)}`;
    return util.hex2Base58(key);
}

function getPublicOriginKey(privteKeyOrigin) {
    if(privteKeyOrigin.length!==64){
        throw new Error('privte Key Origin length must be 64!')
    }
    const ecdh = crypto.createECDH('secp256k1');
    ecdh.setPrivateKey(privteKeyOrigin,'hex');
    return ecdh.getPublicKey('hex');
}

function getPublicKeyByOrigin(publicKeyOrigin) {
    let mainVersionHex = '00';
    let addreeSign = '1';
    let sha1 =  hex2sha256(publicKeyOrigin);
    let ripemd160Hex =  crypto.createHash('ripemd160').update(Buffer.alloc(sha1.length/2,sha1, 'hex')).digest('hex');
    let ripemd160HexUsed =`${mainVersionHex}${ripemd160Hex}`;
    let sha2 =  hex2sha256(ripemd160HexUsed);
    let sha3 =  hex2sha256(sha2);
    let key = `${ripemd160HexUsed}${sha3.slice(0,8)}`;
    return `${addreeSign}${util.hex2Base58(key)}`;
}

module.exports = {
    getPrivteOriginKeyByStr,
    getPrivteOriginKeyByRand,
    getPrivteOriginKeyByKey,
    getPrivteKeyByOrigin,
    getPublicOriginKey,
    getPublicKeyByOrigin
}