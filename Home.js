import React from 'react';
import { StyleSheet, Text, View , FlatList, ActivityIndicator, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import Details from './Details';
import { connect } from 'react-redux';
import App from './App';


function mapStateToProps(state) {
    return {
        text: state.text
    }
}

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }

      componentDidMount(){
        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list')
          .then((response) => response.json())
          .then((responseJson) => {
            AsyncStorage.getItem('name').then(value => {
                console.log(value);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    lastGame: value,
                }, function(){

                });
            });
        })
        .catch((error) =>{
            console.error(error);
        });
      }

      handleOnNavigateBack = (gameName) => {
        if (gameName) {
            this.setState({
                gameName
            })
        }
    }

  render() {
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello Games</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Details', {
              id: item.id,
              onNavigateBack: this.handleOnNavigateBack
                                                                                                }) }>
        <View style={styles.list}>
        <Text style={styles.text}>{item.name}</Text>
        </View>
          </TouchableWithoutFeedback>
          )}
        />
        <Text>Le dernier jeu était : {this.state.gameName}</Text>
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
        fontFamily: 'Helvetica',
        fontSize: 32,
        fontWeight: 'bold', 
    },

    list: {
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

  });

  export default connect(mapStateToProps)(Home);