import React from 'react';
import { StyleSheet, Text, View, Linking, AsyncStorage  } from 'react-native';
import {Button} from 'react-native-elements';
import { createAppContainer, createStackNavigator, ActivityIndicator, FlatList} from 'react-navigation';
import Home from './Home';




class Details extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={ isLoading: true,
                      params: this.props.navigation.state.params.id
        }
      }
      componentDidMount(){
        return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${this.state.params}`)
          .then((response) => response.json())
          .then((responseJson) => {
 
            AsyncStorage.setItem('name', responseJson.name);

            this.setState({
              isLoading: false,
              gameName: responseJson.name,
              gameType: responseJson.type,
              nbPlayers: responseJson.players,
              gameYear: responseJson.year,
              gameDesc: responseJson.description_en,
              gameUrl: responseJson.url
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
      }

  render() {
      return(
        <View style={styles.container}>
          <Button style={styles.button} title="Go back" type="outline" onPress={() =>{
                    this.props.navigation.state.params.onNavigateBack(this.state.gameName),
                    this.props.navigation.goBack()
                }} />

            <Text style={styles.title}>{this.state.gameName}</Text>
            <View style={styles.firstInfoView}>
                <Text style={styles.text}>Type: {this.state.gameType}</Text>
                <Text style={styles.text}>Année: {this.state.gameYear}</Text>
                <Text style={styles.text}>Players: {this.state.nbPlayers}</Text>
            </View>
            <View style={styles.descView}>
                <Text style={styles.text}>{this.state.gameDesc}</Text>
            </View>
            <Button
            onPress={ () =>
                Linking.openURL(`${this.state.gameUrl}`) 
                 .then(() =>  {
                    console.log('CONFIRM')
                })
                .catch(() => {
                    console.log('CANCEL')
                })
            }
            title="More details"
            color="#841584"
            ></Button>
            
        </View>
      );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#68a0cf',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 2,
        fontSize: 32,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },
    firstInfoView: {
        marginRight:40,
        marginLeft:40,
        marginTop:5,
        paddingBottom:20,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
    },

    text: {
        textAlign:'center',
        fontFamily: 'Verdana',
        fontSize: 18,
        lineHeight: 30,
    },

    descView: {
        marginRight:40,
        marginLeft:40,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    button: {
        backgroundColor: "#fff"
    }
  });


export default Details;