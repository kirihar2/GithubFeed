'use strict';
import React, {Component} from 'react';
import buffer from 'buffer';
import {Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';


export default class Login extends Component{
  constructor(props){
      //console.log(props.onLogin);
      super(props);

      this.state = {
          showProgress: false
      }
  }

  render(){
      var errorCtrl = <View />;

      if(!this.state.success && this.state.badCredentials){
          errorCtrl = <Text style={styles.error}>
              That username and password combination did not work
          </Text>;
      }

      if(!this.state.success && this.state.unknownError){
          errorCtrl = <Text style={styles.error}>
              We experienced an unexpected issue
          </Text>;
      }

      return (
          <View style={styles.container}>
              <Image style={styles.logo} source={require('./img/Octocat.png')} />
              <Text style={styles.heading}>Github browser</Text>
              <TextInput
                  onChangeText={(text)=> this.setState({username: text})}
                  style={styles.input}
                  placeholder="Github username"></TextInput>
              <TextInput
                  onChangeText={(text)=> this.setState({password: text})}
                  style={styles.input}
                  placeholder="Github password" secureTextEntry={true}></TextInput>
              <TouchableHighlight
                  onPress={this.onLoginPressed.bind(this)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Log in</Text>
              </TouchableHighlight>

              {errorCtrl}

              <ActivityIndicator
                  animating={this.state.showProgress}
                  size="large"
                  style={styles.loader}
                  />
          </View>


      );
  }

  onLoginPressed(){
      console.log('Attempting to log in with username ' + this.state.username);
      this.setState({showProgress: true});

      var authService = require('./AuthService');
      authService.login({
          username: this.state.username,
          password: this.state.password
      }, (results)=> {
          console.log("Called auth service and returned with results");
          this.setState(Object.assign({
              showProgress: false
          }, results));

          console.log(results);
          console.log(this.props.onLogin);
          if(results.success && this.props.onLogin){
              console.log("Authenticated, returning to App.js to switch views");
              this.props.onLogin();
          }
      });
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
    },
    activityIndicatorIOS:{
      marginTop: 20
    },
    error: {
      paddingTop: 10,
      color: 'red'
    }

});
