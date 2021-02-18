import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import { useSelector} from "react-redux"
import {storeData} from "../utility/storage"
import AppButton from "../components/AppButton"

const ResultScreen = (props) => {

const state = useSelector(state => state.topTen);

  function rankFromFirst(list = []) {
    if (list !== undefined) {
      let orderedList = list.sort((a, b) => a.score < b.score);
      return orderedList;
    }
  }

  useEffect(() => {
    storeData('score', state);
  }, [state]);
  
  const navigateToGameScreen = () => {
    props.navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, marginBottom:30}}>Top 🔟</Text>
      {state.length ? 
        <View>
          <View style={styles.titles}>
            <Text style={styles.titleText}>Name:</Text>
            <Text style={styles.titleText}>Score:</Text>
          </View>
          {rankFromFirst(state).map((user,id) => (
            <View key={id} style={styles.topTen}>
              <Text style={styles.userStyle}>{id}</Text>
              <Text style={styles.userStyle}>{user.name}</Text>
              <Text style={styles.userStyle}>{user.score}</Text>
            </View>
            )
          ) }
        </View>     
          : 
        (
          <View style={styles.row}>
            <Text style={styles.emptyResults}>The list is empty</Text>
            <Text style={styles.emptyResults}>Press "Back to the Game"</Text>
            <Text style={styles.emptyResults}>and Start a new game</Text>
          </View>
        )
      }   
    
      <AppButton 
        style={styles.button} 
        title="Back to the Game" 
        onPress={navigateToGameScreen} 
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button:{
    bottom:5,
    width:"100%"
  },  
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    alignItems:"center",
    paddingVertical:10,  
    position:"relative"
  },
  emptyResults:{
    fontSize:24,
    color: 'black'
  },
  row: {
    alignItems:"center",
    width:"100%"
  },
  titles:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  titleText:{
    color:"black",
    fontSize:22,
    textDecorationLine:"underline"
  },
  topTen:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between"
  },      
  userStyle: {
    color: 'black',
    fontSize:20,
    marginVertical:10,
    textTransform: "capitalize",
  },
});
function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default ResultScreen;