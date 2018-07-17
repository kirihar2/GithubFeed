'use strict';
import React, {Component} from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';

type Props = {};

export default class Login extends Component<Props>{

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
        source={require('./img/Octocat.png')}/>
        <Text sytle={styles.heading}>
            Github browser
        </Text>
        <TextInput
          onChangeText={(text)=>this.setState({username: text})}
          style={styles.input}
          placeholder="Github Username"/>
        <TextInput style={styles.input}
        onChangeText={(text)=>this.setState({password: text})}
          placeholder="Github Password"
          secureTextEntry={ true }/>
        <TouchableHighlight style={styles.button}
          onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  onLoginPressed(){
    console.log('Attempting to login with username '+ this.state.username);
  }
}

var styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 40,
      alignItems: 'center',
      padding: 10,
    },
    logo: {
      width: 66,
      height: 55
    },
    heading: {
      fontSize: 30,
      marginTop: 10
    },
    input: {
      height: 50,
      marginTop: 10,
      fontSize: 18,
      padding: 4,
      borderWidth: 1,
      borderColor: '#48BBEC',
      alignSelf: 'stretch',

    },
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
    }


});
