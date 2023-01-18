import { Alert } from "@mui/material";
import { Component, createContext, useEffect, useState } from "react";
import { v4 } from "uuid";
const LeyLine = createContext()



class LeyLines extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Irminsul: {
                name: 'Irminsul',
                _: {
                    'a4522850-ac16-4ccc-a0bf-bb48a471f622': {
                        name: 'Parent Node',
                        content: '<p>The "Folder" can also be an document.</p>',
                        _: {
                            '9f2022aa-93d2-11ed-a1eb-0242ac120002': {
                                name: 'Child Node',
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
            Alert: {
                on: false,
                type: 0,
                message: ''
            },
            Api: {
                Node: '',
                Alert: {}
            },
            history: [],
            Color: { primary: '#7b1fa2', secondary: '#ba68c8' },
            reRender: false,

        }
        this.updateApi = this.updateApi.bind(this)
        this.alertOn = this.alertOn.bind(this)
        this.alertOff = this.alertOff.bind(this)
        this.getNodePath = this.getNodePath.bind(this)
        this.getNode = this.getNode.bind(this)
        this.setNode = this.setNode.bind(this)
        this.addNode = this.addNode.bind(this)
        this.deleteNode = this.deleteNode.bind(this)
        this.moveNode = this.moveNode.bind(this)

        this.updateHistory = this.updateHistory.bind(this)
        this.clearRecordFromHistory = this.clearRecordFromHistory.bind(this)

    }
    updateApi(strKey, objValue) {
        this.setState({
            Api: {
                ...this.state.Api,
                [strKey]: objValue
            }
        })
    }

    alertOn(intType, strMessage, autoDestroy) {

        this.setState({
            Alert: {
                on: true,
                type: intType,
                message: strMessage
            }
        })
        if (autoDestroy) {
            setTimeout(() => {
                this.setState({
                    Alert: {
                        on: false,
                        type: intType,
                        message: strMessage
                    }
                })
            }, autoDestroy * 1000)
        }
    }

    alertOff() {
        this.setState({
            Alert: {
                ...this.state.Alert,
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
            let ims = this.state.Irminsul,
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
        let strCommand = 'this.state.Irminsul._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -1)
        strCommand = strCommand + strKey
        return eval(strCommand)
    }

    setNode(arrKeys, strKey, strContent, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.Irminsul
        let strCommand = 'ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -1)
        strCommand = strCommand + strKey + ' = strContent;this.setState({ Irminsul: ims }, callback)'

        eval(strCommand)
    }
    addNode(arrKeys, name, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.Irminsul
        let strCommand = 'ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand + '[`' + v4() + '`] = {name: name, content: "", _: {}};this.setState({ Irminsul: ims }, callback)'

        eval(strCommand)
    }

    deleteNode(arrKeys, callback = () => 0) {
        if (arrKeys.length === 1 && arrKeys[0] === '') return
        let ims = this.state.Irminsul
        let strCommand = 'delete ims._'
        for (let i = 0; i < arrKeys.length; i++) {
            strCommand = strCommand + '[`' + arrKeys[i] + '`]._'
        }
        strCommand = strCommand.slice(0, -2)
        strCommand = strCommand + ';this.setState({ Irminsul: ims }, callback)'

        eval(strCommand)
    }

    moveNode(arrKeysFrom, arrKeysTo, callback = () => 0, onError = () => 0) {
        let ims = this.state.Irminsul
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
            strCommand = strCommand.slice(0, -2) + '; ims._' + '[`' + nodeKey + '`] = toBeMoved;this.setState({ Irminsul: ims }, callback())'
            eval(strCommand)
        } else {
            if (arrKeysTo.includes(nodeKey)) {
                onError('You cannot move a Node under its children')
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
            strCommand = strCommand + '[`' + nodeKey + '`] = toBeMoved;this.setState({ Irminsul: ims }, callback)'
            eval(strCommand)
        }



    }

    render() {
        return (
            <LeyLine.Provider value={{
                Api: this.state.Api,
                Alert: this.state.Alert,
                Service: {
                    Node: {
                        set: (key) => this.updateApi('Node', key),
                        getPath: this.getNodePath,
                    },
                    getNode: this.getNode,
                    setNode: this.setNode,
                    addNode: this.addNode,
                    deleteNode: this.deleteNode,
                    moveNode: this.moveNode,
                    updateHistory: this.updateHistory,
                    clearRecordFromHistory: this.clearRecordFromHistory,
                    alertOn: this.alertOn,
                    alertOff: this.alertOff
                },
                history: this.state.history,
                Irminsul: this.state.Irminsul,
                Color: {
                    primary: this.state.Color.primary,
                    secondary: this.state.Color.secondary,
                },
                reRender: this.state.reRender
            }}>
                {this.props.children}
            </LeyLine.Provider>
        )
    }
}

export default LeyLines
export { LeyLine }