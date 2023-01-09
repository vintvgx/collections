import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Button, Alert, Pressable, Dimensions } from 'react-native'
import React, { Component } from 'react'
// import Image from './components/image';
import Image from './components/zustand_image';
import Footer from './shared/footer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';




export default class Main extends Component {
  
  

  state = {
    modalVisible: false
  }

  static navigationOptions = {
    // Sets the title of the Header
    title: 'CREATE',
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  // toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // }; 

  render() {

    
    const { modalVisible } = this.state; 

    const closeModal = () => {
      console.log('Button Pressed To Close Modal')
      this.setModalVisible(false)
    }

    const openModal = () => {
      console.log('Button Pressed To Open Modal')
      this.setModalVisible(true)
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.font}>Collections</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={openModal}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
          <Modal 
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalVisible(!modalVisible);
              }}>
              <SafeAreaView style={styles.modalView}>
                {/* <TouchableOpacity>
                  <Text>CREATE NEW COLLECTION</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>ADD TO EXISTING COLLECTION</Text>
                </TouchableOpacity> */}
                <Button title="CREATE NEW COLLECTION"  />
                <Button title="ADD TO EXISTING COLLECTION"/>
                <Button title="Hide modal" onPress={closeModal} />
                <Button title="CREATE" onPress={()=>{this.props.navigation.navigate('CREATE')}} />
            </SafeAreaView>
          </Modal>
        </View>
        <Image />
        <Button 
          title='CREATE'
        
        />
        <Footer destination='CREATE'/>
       
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
    
      // width: '90%',
      // height: '90%',
      // 5
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',

    },
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      // flex: 1
      
    },
    font: {
        fontSize: 25,
        color: '#fff',
        fontFamily: "Arial", 
        fontWeight: '700',
        textTransform: 'uppercase',
        marginLeft: 'auto'
    },
    plus: {
      fontSize: 35,
      color: '#fff',
      fontFamily: "Arial", 
      fontWeight: '700',
      opacity: 0.7,
    },
    addButton: {
      marginLeft: 'auto',
      
      
    },
    modalView: {
      marginTop: 100,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 55,
      alignItems: "center",
      shadowColor: "#000",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 3,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  });
