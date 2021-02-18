import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator();

const AppNavigation = ()=>{ 
 return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{animationEnabled: false, headerLeft: '', }}
      initialRouteName="HomeScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{title: 'Results Screen', headerTitleAlign: 'center',headerTitleStyle:{color:"white"}}}
        name="ResultsScreen"
        component={ResultsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
 ) 
}

export default AppNavigation