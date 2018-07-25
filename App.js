/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Login from './Login';
import AuthService from './AuthService';
import AppContainer from './AppContainer';
import autobind from 'autobind-decorator';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state=this.getInitialState();
  }
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=> {
      console.log("Authenticated using credentials");
      console.log(authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null,
      });
    });
    console.log("isLoggedIn");
    console.log(this.state.isLoggedIn);
    console.log("checkingAuth");
    console.log(this.state.checkingAuth);
  }

  render(){
    if(this.state.checkingAuth){
      console.log("checkin auth in app.js");
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      console.log("Rendering app container");

      return (
        <AppContainer/>
      );
    }else{
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  }
  onLogin=()=>{
    console.log("On log in");
    this.setState({
      isLoggedIn: true,
      checkingAuth: false,
    });
  }
  getInitialState(){
    console.log("loading init values fora ");
    return ({
      isLoggedIn: false,
      checkingAuth: true,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loader: {
      marginTop: 20
  },
});
