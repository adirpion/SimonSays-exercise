import React from "react"
import { TouchableOpacity } from "react-native"

function GameButton({ref, onPress, style, pressNotAllowed}) {
    return (
        <TouchableOpacity
            ref={ref}
            onPress={onPress}
            style={style}
            disabled={pressNotAllowed} 
        >
        </TouchableOpacity>
    );
    ;
}

export default GameButton