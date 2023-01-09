import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'



const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/logo_resized.png')}
        style={styles.logo}
      />
      <Image 
        source={require('../../assets/collections_nametag.png')}
        style={styles.collections_tag}
      />
      <View style={styles.sign_up}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={styles.sign_up_txt}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.login}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.loginText}>Already signed up? <Text style={{color: '#056cfe'}}>LOGIN</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        display: 'block',
        backgroundColor: 'white',
        // flex: 1,
        justifyContent: 'center',
        alignSelf:'center',
        alignItems: 'center',     
        margin: 'auto',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height ,   
    },
    logo: {
        
        width: 100,
        height: 100,
        position: 'relative',
        top: 30
        
        
    },
    collections_tag: {
        // flex: 1,
        resizeMode: 'center',
       
    
        
    },
    sign_up:{ 
      width: Dimensions.get("window").width,
      height: 'auto',
      backgroundColor: 'black',
      alignSelf: 'center',
      position: 'absolute',
      bottom: '13%',
      

    },
    sign_up_txt: {
      color: 'white',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',  
      margin: '5%',
      zIndex: 1
    },
    login: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: '9%',
    }
})