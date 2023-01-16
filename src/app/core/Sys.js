import FileSaver from 'file-saver'

// Response
function Response(code, data) {
    return {
        code: code, data: data
    }
}

// attempt
function attempt(func, obj) {
    try {
        return func()
    } catch (e) {
        return obj
    }
}

// bianary16 - Convert between String and binary16
function binary16(obj) {
    if (obj.constructor.name === 'Array') {
        return obj.map(char => String.fromCharCode(parseInt(char, 2))).join('')
    } else {
        let strPadding = '0000000000000000'
        return obj.split('').map(char => {
            let strBinary = char.charCodeAt(0).toString(2)
            return strPadding.slice(strBinary.length) + strBinary
        })
    }
}

// proliferate - Create A Enhanced Key
function proliferate(strKey, strCatalyst = 'GreaterLordRukkhadevata', arrCatalyst = [11, 45, 14]) {
    const strKeyReverse = strKey.split('').reverse().join('')
    return strKey.split('').map((v, i) => {
        if (i % 2 === 0) {
            return strKey.substring(Math.ceil(i / 2), i) + String.fromCharCode((v.charCodeAt(0) + arrCatalyst[i % 3] - 33) % 96 + 33) + strCatalyst[i % 23]
        } else {
            return strKeyReverse.substring(Math.ceil(i / 3), i) + strCatalyst[i % 23] + String.fromCharCode((v.charCodeAt(0) + arrCatalyst[i % 3] - 33) % 96 + 33)
        }
    }).join('')
}

// xor - Perform Exclusive or
function xor(strA, strB) {
    let strAns = ''
    if (strA.length === strB.length) {
        for (let i = 0; i < strA.length; i++) {
            if (strA[i] === strB[i]) {
                strAns = strAns + '0'
            } else {
                strAns = strAns + '1'
            }
        }
        return strAns
    }
    return strA
}

// cipher - Encrypt or Decrypt Data
function cipher(objData, strKey, onSucceed = e => console.log(e), onFail = e => console.error(e)) {
    try {
        // Initialize Cipher Key
        const arrKey = binary16(strKey)
        const arrKeyPro = binary16(proliferate(strKey))
        const intKeyLength = arrKey.length
        const intKeyProLength = arrKeyPro.length
        if (objData.constructor.name === 'String') {
            // Decrypt Data
            let arrData = binary16(objData)
            let strTemp = binary16(arrData.map((char, i) => xor(char, arrKey[i % intKeyLength])))
            let arrTemp = binary16(strTemp)
            let strResult = binary16(arrTemp.map((char, i) => xor(char, arrKeyPro[i % intKeyProLength])))
            const resp = Response(200, JSON.parse(strResult))
            onSucceed(resp)
            return resp
        } else {
            // Encrypt Data
            let arrData = binary16(JSON.stringify(objData))
            let strTemp = binary16(arrData.map((char, i) => xor(char, arrKeyPro[i % intKeyProLength])))
            let arrTemp = binary16(strTemp)
            let strResult = binary16(arrTemp.map((char, i) => xor(char, arrKey[i % intKeyLength])))
            const resp = Response(200, strResult)
            onSucceed(resp)
            return resp
        }
    } catch (error) {
        // Process Fail
        const resp = Response(500, error)
        onFail(resp)
        return resp
    }
}

// upload
function upload(objFile, onLoad = e => console.log(e)) {
    let objReader = new FileReader()
    objReader.onload = (event) => {
        let strContent = event.target.result
        onLoad(strContent)
    }
    objReader.readAsText(objFile)
}

// download
function download(strContent, strFileName, strFileSuffix = 'irminsul') {
    let objFile = new File([strContent], strFileName + '.' + strFileSuffix, {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(objFile)
}

export default {
    attempt, cipher, upload, download
}
