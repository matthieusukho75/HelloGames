import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import HomeGames from './Home'
import DetailsGames from './Details'
import { Provider } from 'react-redux';
import { createStore } from "redux";
import textReducer from './Reducer'

const MainNavigator = createStackNavigator({
Home : {screen: HomeGames},
Details: {screen: DetailsGames}
})

const store = createStore(textReducer); 

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}; 


