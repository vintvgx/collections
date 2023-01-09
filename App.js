
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCPCqvRcC8i2_HyImMJ9PewwTpPc7ss3fs",
  authDomain: "collections-75907.firebaseapp.com",
  projectId: "collections-75907",
  storageBucket: "collections-75907.appspot.com",
  messagingSenderId: "13134474216",
  appId: "1:13134474216:web:9249d2c97f3b48afcc525d",
  measurementId: "G-3C9QWYHCXB"
};

if(firebase.apps.length === 0) {
  let app = firebase.initializeApp(firebaseConfig)
} else {
  let app = firebase.app();
}

export const db = firebase.firestore()

import Main from './src/MAIN';
import Loading from './src/auth/Loading';

//! Auth 
import SignIn from './src/auth/SignIn';
import Register from './src/auth/Register';
import Landing from './src/auth/Landing';


//!Main Pages
import CREATE from './src/components/collection/CREATE';
import ADD from './src/components/collection/ADD';

const Stack = createStackNavigator();
export class App extends Component {

  //set inital state of props / sets userloaded to false
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }


  //tracks if user is already logged in, if so continue  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    console.log("Logged in: ", loggedIn)
    // console.log("USER is", user)
    // console.log(firebase.auth().currentUser)

  if (!loaded){
    return(
      <SafeAreaView style={styles.container}>
        <Text>Loading!</Text>
      </SafeAreaView>
    )
  }

  if (!loggedIn) { 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // if(loggedIn) {
  // return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName='Main'>
  //         <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
  //         <Stack.Screen name="Create" component={CREATE} options={{headerShown: false}}/>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //     )
  //   }


  if(loggedIn) {
    return (
        <SafeAreaView style={styles.container}>
          <Main />
        </SafeAreaView>
        )
      }
      

  }
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
});
