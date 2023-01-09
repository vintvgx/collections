import { SafeAreaView, StyleSheet, Text, View, Image, Touchable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const header = ({navigation}, props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.destination)
          console.log('FOOTER PRESSED')
        }}
      >
      <Image 
        source={require('../../assets/logo_resized.png')}
        style={styles.logo}
      />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default header

const styles = StyleSheet.create({
    container: {
        display: 'block',
        // backgroundColor: 'white',
        flex: 1,
        justifyContent: 'scenter',
        alignSelf:'center',
        alignItems: 'center',     
        margin: 'auto',
        zIndex: 1,
    },
    logo: {
        
        width: 50,
        height: 50,
        position: 'relative',
        bottom: 120,
        // borderWidth: '100',
        // borderColor: 'red',
        
        
    },
})