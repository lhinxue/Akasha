import { createContext, useState } from "react";
import Sys from "./sys";

const LeyLine = createContext()

function LeyLines({ children }) {


    const [Api, setApi] = useState({
        Node: '',
        Alert: {}
    })
    const [Irminsul, setIrminsul] = useState({
        name: 'Irminsul',
        _: {
            'a4522850-ac16-4ccc-a0bf-bb48a471f622': {
                name: 'Parent Node',
                content: '<p>The "Folder" can also be an document.</p>',
                _: {
                    '9f2022aa-93d2-11ed-a1eb-0242ac120002': {
                        name: 'Child Node',
                        content: '<p>The "File" can turn into a folder.</p>'
                    }
                }
            },
            'a306d40e-93d2-11ed-a1eb-0242ac120002': {
                name: 'Read Me',
                content: 'Example text.'
            }
        }
    })
    const [Color, setColor] = useState({ primary: '#7b1fa2', secondary: '#ba68c8' })
    const [reRender, setReRender] = useState(false)

    const alertOn = (strType, strMessage, autoDestroy) => {
        if (Api.Alert.on)
            return
        updateApi('Alert', {
            on: true,
            type: strType,
            message: strMessage
        })
        if (autoDestroy)
            setTimeout(() => {
                updateApi('Alert', {
                    on: false,
                    type: strType,
                    message: strMessage
                })
            }, autoDestroy * 1000)
    }
    const alertOff = () => {
        updateApi('Alert', {
            ...Api.Alert,
            on: false
        })
    }



    const updateApi = (strKey, objValue) => setApi(pre => ({ ...pre, [strKey]: objValue }))
    const updateNode = (key) => updateApi('Node', key)
    const getNodeName = (key) => {
        let ims = Irminsul
        for (const i of key.split('=>')) {
            ims = ims._[i]
        }
        return ims.name
    }
    const getNodePath = (key) => {
        try {
            let ims = Irminsul,
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
    const getNodeContent = (key) => {
        let ims = Irminsul
        for (const i of key.split('=>')) {
            ims = ims._[i]
        }
        return ims.content
    }
    const recursivelySet = (obj, keys, id, value) => {
        if (keys.length === 0) {
            return ({
                ...obj,
                [id]: value
            })
        } else {
            let key = keys.shift()
            return ({
                ...obj,
                [key]: recursivelySet(obj[key], keys, id, value)
            })
        }
    }



    const setNodeContent = (key) => {
        setIrminsul(ims => {



        })
    }


    const updateColor = (primary, secondary) => setColor(color => ({ primary: primary, secondary: secondary }))
    const forceReRender = () => setReRender(re => !re)


    return (
        <LeyLine.Provider value={{
            Api: Api,
            Service: {
                Node: {
                    set: (key) => updateApi('Node', key),
                    getName: getNodeName,
                    getPath: getNodePath,
                    getContent: getNodeContent,
                },
                Alert: {
                    on: alertOn,
                    off: alertOff
                }
            },
            Irminsul: Irminsul,
            Color: {
                primary: Color.primary,
                secondary: Color.secondary,
                set: updateColor
            },
            reRender: reRender
        }}>
            {children}
        </LeyLine.Provider>
    )
}

export default LeyLines
export { LeyLine }