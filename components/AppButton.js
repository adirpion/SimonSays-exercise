/* eslint-disable prettier/prettier */
import React from "react"
import { StyleSheet, TouchableOpacity, View, Text} from "react-native"

function AppButton({onPress,title,gameOn, style}) {
  return (
    <View>
        <TouchableOpacity style={[style,styles.button]} onPress={onPress} disabled={gameOn}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    button:{
        marginTop:75,
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius:5,
        borderWidth: 1,
        borderColor: "green",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:24
    }
})

export default AppButton