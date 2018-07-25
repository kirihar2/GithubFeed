'use strict';
import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';


export default class Feed extends Component{

  constructor(props){
      super(props);
      var ds = new ListView.DataSource({
        rowHasChanged: (r1,r2) => r1!=r2
      });
      this.state = {
        dataSource: ds.cloneWithRows(['a','b','c'])
      }
  }
  componentDidMount(){
    this.fetchFeed();
  }
  renderRow(rowData){
    return <Text style={{
        color: '#333',
        backgroundColor: '#fff',
        alignSelf: 'center'
      }}>
        {rowData}
      </Text>
  }
  fetchFeed(){
    console.log("starting to fetch feed");
    require('./AuthService').getAuthInfo((err,authInfo)=>{
      console.log(err);
      console.log(authInfo);
      var url= 'https://api.github.com/users/'
              +authInfo.user.login
              +'/received_events';
      fetch(url,{
        headers: authInfo.header
      })
      .then((response)=>{
        console.log("call returned with response: ");
        console.log(response);
        response.json();
      })
      .then((responseData)=>{
        console.log("authenticated in fetch feed and got results");
        var feedItems=
          responseData.filter((ev)=>
              ev.type=='PushEvent');
        console.log(feedItems);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(feedItems)
        })
      })
    });
  }
  render(){
    return (
      <View style={{
        flex:1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}
