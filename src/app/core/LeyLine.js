import {createContext, useState} from "react";

const LeyLine = createContext()

function LeyLines({children}) {


    const [Api, setApi] = useState({})
    const [Irminsul, setIrminsul] = useState({})
    const [Color, setColor] = useState({primary: '#7b1fa2', secondary: '#ba68c8'})
    const [reRender, setReRender] = useState(false)


    const updateColor = (primary, secondary) => setColor(color => ({primary: primary, secondary: secondary}))
    const forceReRender = () => setReRender(re => !re)


    return <LeyLine.Provider value={{
            Color: {
                primary: Color.primary,
                secondary: Color.secondary,
                set: updateColor
            },
            reRender: reRender,
            forceReRender: forceReRender
        }}>
            {children}
        </LeyLine.Provider>

}

export default LeyLines
export {LeyLine}