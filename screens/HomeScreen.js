import React, { useEffect } from "react"
import { StyleSheet,Text,View,} from "react-native"
import GameButtons from "../components/GameButtons"
import AppButton from "../components/AppButton"
import {getData} from "../utility/storage"
import {useDispatch} from "react-redux"
import {setPlayerResult} from "../redux/actions"

function HomeScreen({navigation}) {
  
  const dispatch = useDispatch()

  async function getTopTen(){
    const data = await getData("score")
    if(data){
      console.log(data)
      const list = data.map(user => dispatch(setPlayerResult(user.name,user.score)))
    }
  }

  useEffect(() =>{ getTopTen()},[])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome to Simon Game</Text>
        <AppButton 
          style={styles.resultsButton} 
          title="Top 🔟" 
          onPress={() => navigation.push("ResultsScreen")} 
        /> 
      </View>
      <GameButtons navigation={navigation} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    direction: "ltr"
  },
  header:{
    width:"100%",
    flexDirection:"column", 
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    textAlign:"center",
    fontSize:22,
    top:10
  },
  resultsButton: {
    bottom:50
  }
})



export default HomeScreen