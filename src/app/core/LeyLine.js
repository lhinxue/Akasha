import { color } from "@mui/system";
import { Component, createContext } from "react";
import { v4 } from "uuid";
import sys from "./sys";

export const LeyLine = createContext()

export default class LeyLines extends Component {

    constructor(props) {
        super(props)
        this.state = {
            api: { file: '', key: '', node: '' },
            color: { primary: '#43a047', secondary: '#81c784' },
            history: [],
            irminsul: {
                name: 'irminsul',
                config: {
                    color: { primary: '#43a047', secondary: '#81c784' },
                },
                _: {
                    'a4522850-ac16-4ccc-a0bf-bb48a471f622': {
                        name: 'Parent node',
                        content: '<p>The "Folder" can also be an document.</p>',
                        _: {
                            '9f2022aa-93d2-11ed-a1eb-0242ac120002': {
                                name: 'Child node',
                                content: '<p>The "File" can turn into a folder.</p>',
                                _: {}
                            }
                        }
                    },
                    'a306d40e-93d2-11ed-a1eb-0242ac120002': {
                        name: 'Read Me',
                        content: 'Example text.',
                        _: {}
                    }
                }
            },
            msg: { on: false, type: 0, message: '' },
            reRender: false,
            terminal: false,
        }
        this._apiFile = this._apiFile.bind(this)
        this._apiKey = this._apiKey.bind(this)
        this._apiNode = this._apiNode.bind(this)
        this._irminsul = this._irminsul.bind(this)
        this.addNode = this.addNode.bind(this)
        this.clearRecordFromHistory = this.clearRecordFromHistory.bind(this)
        this.deleteNode = this.deleteNode.bind(this)
        this.getNode = this.getNode.bind(this)
        this.getNodePath = this.getNodePath.bind(this)
        this.moveNode = this.moveNode.bind(this)
        this.msgOff = this.msgOff.bind(this)
        this.msgOn = this.msgOn.bind(this)
        this.setNode = this.setNode.bind(this)
        this.terminalOff = this.terminalOff.bind(this)
        this.terminalOn = this.terminalOn.bind(this)
        this.updateApi = this.updateApi.bind(this)
        this.updateHistory = this.updateHistory.bind(this)
        this._color = this._color.bind(this)
        this._irminsulName = this._irminsulName.bind(this)
    }

    _irminsulName(name) {
        let ims = this.state.irminsul
        ims.name = name
        this._irminsul(ims)
    }
    _color(hue) {
        let ims = this.state.irminsul
        ims.config.color = { primary: sys.hslToHex(hue, 41, 45), secondary: sys.hslToHex(hue, 38, 64) }

        this._irminsul(ims)
    }

    _irminsul(ims) {
        this.setState({ irminsul: ims })
    }

    _apiKey(key) {
        this.updateApi('key', key)
    }

    _apiFile(file) {
        this.updateApi('file', file)
    }

    _apiNode(node) {
        this.updateApi('node', node)
    }

    terminalOn() {
        this.setState({ terminal: true })
    }
    terminalOff() {
        this.setState({ terminal: false })
    }

    updateApi(strKey, objValue) {
        this.setState({
            api: {
                ...this.state.api,
                [strKey]: objValue
            }
        })
    }

    msgOn(intType, strMessage, autoDestroy) {
        this.setState({
            msg: {
                on: true,
                type: intType,
                message: strMessage
            }
        })
        if (autoDestroy) {
            setTimeout(() => {
                this.setState({
                    msg: {
                        on: false,
                        type: intType,
                        message: strMessage
                    }
                })
            }, autoDestroy * 1000)
        }
    }

    msgOff() {
        this.setState({
            msg: {
                ...this.state.msg,
                on: false
            }
        })
    }

    updateHistory(node) {
        this.clearRecordFromHistory(node)
        this.setState({ history: [...this.state.history, node] })
    }

    clearRecordFromHistory(node) {
        let newHistory = []
        for (let i = 0; i < this.state.history.length; i++) {
            if (this.state.history[i] !== node) newHistory.push(this.state.history[i])
        }
        this.setState({ history: newHistory })
    }

    getNodePath(key) {
        try {
            let ims = this.state.irminsul,
                arrPath = []
            for (const i of key.split('=>')) {
                ims = ims._[i]
                arrPath.push(ims.name)
            }
            return arrPath
        } catch (error) {
            return []
        }
    }

    getNode(arrKeys, strKey) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return ''
        let strCommand = 'this.state.irminsul._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -1)
        strCommand = strCommand + strKey
        return eval(strCommand)
    }

    setNode(arrKeys, strKey, strContent, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.irminsul
        let strCommand = 'ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -1)
        strCommand = strCommand + strKey + ' = strContent;this.setState({ irminsul: ims }, callback)'
        eval(strCommand)
    }

    addNode(arrKeys, name, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.irminsul
        let strCommand = 'ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand + '[`' + v4() + '`] = {name: name, content: "", _: {}};this.setState({ irminsul: ims }, callback)'
        eval(strCommand)
    }

    deleteNode(arrKeys, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.irminsul
        let strCommand = 'delete ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -2)
        strCommand = strCommand + ';this.setState({ irminsul: ims }, callback)'
        eval(strCommand)
    }

    moveNode(arrKeysFrom, arrKeysTo, callback = () => 0, onError = () => 0) {
        let ims = this.state.irminsul
        let nodeKey = arrKeysFrom[arrKeysFrom.length - 1]
        if (arrKeysTo === '') {
            let strCommand = 'let toBeMoved = ims._'
            for (let i = 0; i < arrKeysFrom.length; i++) {
                strCommand = strCommand + '[`' + arrKeysFrom[i] + '`]._'
            }
            strCommand = strCommand.slice(0, -2) + '; delete ims._'
            for (let i = 0; i < arrKeysFrom.length; i++) {
                strCommand = strCommand + '[`' + arrKeysFrom[i] + '`]._'
            }
            strCommand = strCommand.slice(0, -2) + '; ims._' + '[`' + nodeKey + '`] = toBeMoved;this.setState({ irminsul: ims }, callback())'
            eval(strCommand)
        } else {
            if (arrKeysTo.includes(nodeKey)) {
                onError('You cannot move a node under its children')
                return
            }
            let strCommand = 'let toBeMoved = ims._'
            for (let i = 0; i < arrKeysFrom.length; i++) {
                strCommand = strCommand + '[`' + arrKeysFrom[i] + '`]._'
            }
            strCommand = strCommand.slice(0, -2) + '; delete ims._'
            for (let i = 0; i < arrKeysFrom.length; i++) {
                strCommand = strCommand + '[`' + arrKeysFrom[i] + '`]._'
            }
            strCommand = strCommand.slice(0, -2) + '; ims._'
            for (let i = 0; i < arrKeysTo.length; i++) {
                strCommand = strCommand + '[`' + arrKeysTo[i] + '`]._'
            }
            strCommand = strCommand + '[`' + nodeKey + '`] = toBeMoved;this.setState({ irminsul: ims }, callback)'
            eval(strCommand)
        }
    }

    render() {
        return (
            <LeyLine.Provider value={{
                api: this.state.api,
                color: { primary: this.state.irminsul.config.color.primary, secondary: this.state.irminsul.config.color.secondary },
                history: this.state.history,
                irminsul: this.state.irminsul,
                msg: this.state.msg,
                reRender: this.state.reRender,
                terminal: this.state.terminal,
                os: {
                    _irminsulName: this._irminsulName,
                    _color: this._color,
                    _apiFile: this._apiFile,
                    _apiKey: this._apiKey,
                    _apiNode: this._apiNode,
                    _irminsul: this._irminsul,
                    getNodePath: this.getNodePath,
                    addNode: this.addNode,
                    clearRecordFromHistory: this.clearRecordFromHistory,
                    deleteNode: this.deleteNode,
                    getNode: this.getNode,
                    moveNode: this.moveNode,
                    msgOff: this.msgOff,
                    msgOn: this.msgOn,
                    setNode: this.setNode,
                    updateHistory: this.updateHistory,
                    terminalOn: this.terminalOn,
                    terminalOff: this.terminalOff
                },
            }}>
                {this.props.children}
            </LeyLine.Provider >
        )
    }
}
