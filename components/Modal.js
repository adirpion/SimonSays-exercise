import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {setPlayerResult, deletePlayerWithLowscore} from "../redux/actions"


const ModalWindow = ({navigation, showModal, closeModal, score}) => {
  const [playerName, setPlayerName] = useState('');
  const topTenLength = useSelector(state => state.topTen.length)
  const topTen = useSelector(state => state.topTen)
  const dispatch = useDispatch();

  function checkifUserAllowedEnterToList (score){
    let lowScoreUsers = topTen.find((user) => user.score < score);
    if (lowScoreUsers !== undefined) {
      dispatch(deletePlayerWithLowscore(lowScoreUsers.name));
      return true;
    } else return false;
  };
  // navigate to results screen with player's name + score
  const setScore = (name) => {
    if (name == '') {
      Alert.alert('Please enter your name');
      return;
    }
    if(topTenLength <= 9){
      dispatch(setPlayerResult(name,score));
    }else{
      const checkScore = checkifUserAllowedEnterToList(score);
      if(checkScore){
        dispatch(setPlayerResult(name,score));
      }
    }

    closeModal();
    navigation.push('ResultsScreen');
    setPlayerName("")
  };
  
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <Text style={{textAlign: "center", fontSize:24}}>Game Over!</Text>
          <Text style={{textAlign: "center", fontSize:20}}>Your score is: {score} </Text>
          <View style={{width: '90%'}}>
            <Text style={{ fontSize:16}}>Please Enter your name:</Text>
            <TextInput
              value={playerName}
              placeholder="name"
              style={styles.input}
              onChangeText={(text) => setPlayerName(text)}
            />
          </View>
          <Button
            onPress={() => {
              setScore(playerName);
            }}
            title="Submit"
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    marginTop:20,
    textAlign: 'left',
    width: '100%',
    borderWidth: 1,
    height: 40,
  },
  modalBox: {
    width: 350,
    height: 300,
    borderWidth: 1,
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default ModalWindow;