import { Text, View, SafeAreaView, Formik, TextInput, StyleSheet, Button, Dimensions, TouchableOpacity, Keyboard } from 'react-native'
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Footer from '../shared/footer';
import firebase from 'firebase'

export default class Register extends Component {

    //sets initial state for email/pw/usename
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          username: ''
        }
    
        //binds the values of state with sign up function 
        this.onSignUp = this.onSignUp.bind(this)
      }

      onSignUp() {
        const { email, password, username } = this.state // binded
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              username,
              email
            })
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      }

      onSignUpTest() {
        const { email, password, username } = this.state
        console.log('Button was pressed')
        console.log(email, password, username)
      }
  render() {
    return (
       <SafeAreaView>
        
        <View style={[styles.container, styles.shadowProp]}>
        
        <TextInput
          label="username"
          placeholder="username"
          placeholderTextColor="white"
          style={styles.form}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          label="E-mail"
          placeholder="E-mail"
          placeholderTextColor="white"
          style={styles.form}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          placeholderTextColor="white"
          style={styles.form}
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity
                // text={loading ? 'Loading...' : 'Sign In'}
                type='Submit'
                title='Submit'
                style={styles.submitButton}
                onPress={() => this.onSignUp()}
                ><Text style={styles.submitText}>SIGN UP</Text>
            </TouchableOpacity>
            
      </View>
        <Footer />
      </SafeAreaView>
      
    )
  }
}

const styles = StyleSheet.create({
    
    
    container: {
        justifyContent:'center',
        alignItems: 'center',
        display: 'block',
        backgroundColor: 'white',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height , 
        // flex: 1,
            
        alignSelf:'center',
                
        margin: 'auto',

  },
  font: {
    fontSize: 55,
    color: '#fff',
    fontFamily: "Arial", 
    fontWeight: '700',
    textTransform: 'uppercase',
    marginLeft: 'auto'
},
  form: {
    width: 300,
    height: 60,
    fontSize: 18,
    borderColor: 'white',
    padding: 10,
    borderWidth: 3,
    marginVertical: 10,
    margin: 5,
    backgroundColor: '#080808',
    color: 'white',
    // width: 266px;
    // height: 52px;

    borderRadius: 15,
},
shadowProp: {
  shadowColor: '#fff',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center'
},
submitButton: {
    alignSelf: 'center',
    marginTop: "10%",
    backgroundColor: '#000',
    width: 235,
    height: 60,
    borderRadius: 25,
  },
  submitText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '200',
    color: 'white',
    marginTop: 20,
    justifyContent: 'center'
},

})