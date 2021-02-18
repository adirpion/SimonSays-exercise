import React, {useState, useEffect} from "react"
import { StyleSheet,Text,View,} from "react-native"
import {useSelector, useDispatch} from "react-redux"
import {increaseScore,resetScore,setPlayerResult} from "../redux/actions"
import AppButton from "../components/AppButton"
import GameButton from "./GameButton"
import Modal from "./Modal"
import ButtonGameClass from "../utility/buttonGameClass"
import {redButton, greenButton, yellowButton, blueButton} from "../utility/buttonGameClass"

function GameButtons({navigation}) {
  const [playerNotAllowed, setPlayerNotAllowed] = useState(true)
  const [flashButton, setFlashButton] = useState('')
  const [randOption, setRandOption] = useState({
    level:[getRandomColor()],
    index: 0
  })
  const [isGameOn, setIsGameOn] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const score = useSelector(state => state.score);
  const dispatch = useDispatch();
  const gameSpeed = 1200;

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * 4);
    const options = [redButton, greenButton, yellowButton, blueButton];
    return options[randomIndex];
  }

  function betweenSteps(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  function simonActive(button = ButtonGameClass){
    button.buttonSound();
    betweenSteps(500).then(() => setFlashButton(button.color));
    betweenSteps(1000).then(() => setFlashButton(""));
  };

  function startRound(level = []){
    setIsGameOn(true)
    setIsGameOver(false);
    setPlayerNotAllowed(true);
    let i = 0;
    let intervalRound = setInterval(() => {
      // finish round
      if (level[i] == undefined) {
        clearInterval(intervalRound);
        setPlayerNotAllowed(false);
      } else {
        simonActive(level[i]);
      }
      i++;
    }, gameSpeed);
    setRandOption({...randOption, index: 0});
    //console.log(randOption)
  };

  function playerTurn(button = ButtonGameClass){
    let newBtn = getRandomColor();
    const indexToCheck = randOption.index;
    const arrayOfOptions = randOption.level;
    const lengthOfArray = arrayOfOptions.length;
    // if mistake
    if (arrayOfOptions[indexToCheck].id !== button.id) {
      button.errorSound();
      gameOver(true);
      return;
    }
    // check and move index up
    else if(indexToCheck + 1 < lengthOfArray) {
      dispatch(increaseScore());
      console.log(score)
      button.buttonSound();
      setRandOption({...randOption, index: randOption.index + 1});
    }
    // if last number in array - check complete => add another random SimonButton
    else {
      dispatch(increaseScore());
      button.buttonSound();
      setRandOption({
        ...randOption,
        index: 0,
        level: [...randOption.level, newBtn],
      });
    }
  };

  const gameOver = (finish = Boolean) => {
    setIsGameOn(false)
    setIsGameOver(true);
    setRandOption({level: [getRandomColor()], index: 0});
    setPlayerNotAllowed(finish);
  };

  useEffect(() => {
    if (randOption.level.length > 1) {
      betweenSteps(500).then(()=>startRound(randOption.level))
    }
  }, [randOption.level]);

  return (
    <View style={styles.container}>
      {isGameOn && 
      <Text style={styles.turnText}>
        {playerNotAllowed ? "Simon is Playing" : "It's your turn!"}
      </Text>
      }
      <View>
      <View style={styles.row}>
          <GameButton 
            onPress={() => playerTurn(greenButton)} 
            style={[styles.topLeft, , flashButton == greenButton.color && styles.flashColor]} 
            pressNotAllowed={playerNotAllowed} 
          />
          <GameButton 
            onPress={() => playerTurn(redButton)} 
            style={[styles.topRight, , flashButton == redButton.color && styles.flashColor]} 
            pressNotAllowed={playerNotAllowed} 
          />
      </View>

      <View style={styles.row}>
        <GameButton 
          onPress={() => playerTurn(yellowButton)} 
          style={[styles.bottomLeft, , flashButton == yellowButton.color && styles.flashColor]} 
          pressNotAllowed={playerNotAllowed} 
        />
        <GameButton 
          onPress={() => playerTurn(blueButton)} 
          style={[styles.bottomRight, flashButton == blueButton.color && styles.flashColor]} 
          pressNotAllowed={playerNotAllowed} 
        />
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreText}>Score: {score} </Text>
      </View>
      
      </View>
      <AppButton 
        style={isGameOn ? {backgroundColor: "grey"} : ""}
        title="Start Game" 
        color="white" 
        onPress={() => startRound(randOption.level)} 
        gameOn={isGameOn}
      />

      <Modal 
        showModal={isGameOver} 
        setPlayerName={(name) => dispatch(setPlayerResult({name, score}))} 
        score={score} 
        closeModal={() => {setIsGameOver(false); dispatch(resetScore());}} 
        navigation={navigation}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    marginVertical:100
  },
  flashColor:{
     borderColor:"rgba(0,0,0,0.15)",
     borderWidth: 20,
  },
  row:{
    flexDirection: "row",
    padding: 12.5
  },
  topLeft:{
    width: 150,
    height: 150,
    borderTopLeftRadius: 150,
    backgroundColor: "darkgreen",
    marginRight: 25
  },
  topRight:{
    width: 150,
    height: 150,
    borderTopRightRadius: 150,
    backgroundColor: "darkred"
  },
  bottomLeft:{
    width: 150,
    height: 150,
    borderBottomLeftRadius: 150,
    backgroundColor: "goldenrod",
    marginRight: 25
  },
  bottomRight:{
    width: 150,
    height: 150,
    borderBottomRightRadius: 150,
    backgroundColor: "darkblue"
  },
  score:{
    width:150,
    height:150,
    borderRadius:75,
    backgroundColor:"white",
    position:"absolute",
    top: "50%",
    left: "50%",
    transform: [{translateX: -75}, {translateY: -75}],
    zIndex:9999,
    justifyContent: "center",
    alignItems:"center"
  },
  scoreText:{
    fontSize:24
  },
  turnText:{
    textAlign:"center",
    fontSize: 30,
    bottom:50
  }
})

export default GameButtons