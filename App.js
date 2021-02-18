import React from 'react';
import { Provider } from 'react-redux'
import store from "./redux"
import {
  StyleSheet,
  View,
} from 'react-native';
import AppNavigation from "./navigation/AppNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage"


const App = () => {
  //AsyncStorage.clear()
  return (
    <Provider store={store}>
        <AppNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
