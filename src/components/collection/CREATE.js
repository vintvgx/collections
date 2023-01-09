import React, {useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button, Image, Dimensions, SafeAreaView, TextInput, FlatList} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import placeholder_images from '../../../placeholder_images'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase'
import { alt_save_data, db } from "../firebase/config";
import {TimeStamp} from 'firebase/firestore'

import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { saveData } from "../firebase/config";

export default function CREATE() {

  const [text, onChangeText] = React.useState(null);
  const [camera, setCamera] = useState(null)
  const [images, setImages] = useState([])
  const [hasPermission, setHasPermission] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [cover, setCover] = useState('')
  const [type, setType] = useState(Camera.Constants.Type.back)
  let view_image

  useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasPermission(cameraStatus.status === 'granted');
  
        const galleryStatus = await Camera.requestCameraPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      })(); 
    }, []);
  
    const takePicture = async () => {
      console.log('take pic pressed')
        if (camera) {
          const data = await camera.takePictureAsync(null) //stores picture in data
          console.log(data.uri)
          setImages(data.uri)
        }
    }
  
    const pickImage = async () =>  {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
        allowsMultipleSelection: true,
        selectionLimit: 10,
      //   aspects: [1,1],
        quality: 1
      });
      
      if(!result.canceled) {

        console.log('RESULT:', result)
        
      
        setImages(result.assets)
        setCover(result.assets[0].uri)
        // console.log('IMAGES ARE:\n\n', images)
        console.log(result)
        console.log(result.assets)

      }
    }

    const pick_image = async () => {
      const options = {
        title: 'Select Images',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      let result = await ImagePicker.showImagePicker(options, (response) => {
         
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri = response.uri;
          console.log(uri)
          // this.setState({
          //   selectedPictureUri: uri,
          // });
          // setImages(uri)
        }
      });
    }

  

    
    if (hasPermission === null || hasGalleryPermission === false) {
      return <View />
    }
  
    if (hasPermission === false || hasGalleryPermission === false) {
      return <Text>No access to Camera</Text>
    }

    if(images.length != 0) {
      
      view_image = 
                  <View style={styles.image_view_container}>
                    <View style={{alignSelf:'center'}}>
                    <TouchableOpacity
                        style={styles.image_placer}
                        onPress={pickImage}
                    >
                      <Image source={{uri: cover}} style={{flex: 1, width: '100%', height: '100%'}}/>
                    </TouchableOpacity>
                    </View>
                    <FlatList 
                        pagingEnabled 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        renderItem={(
                            ({ item }) => (
                                <View style={styles.flatlist_container}>
                                  <TouchableOpacity
                                      onPress={() => {
                                        setCover(item.uri)
                                      }}
                                  >
                                    <Image 
                                        source={{uri: item.uri}}
                                        keyExtractor={(item, index) => item.fileName}
                                        style={styles.flatlist_image}
                                    /> 
                                    </TouchableOpacity>
                                </View>
                            ) )}
                    />
                    <Button 
                      title='SUBMIT'
                      onPress={() => saveData(text, images)}
                    />
                    </View>
    } else {
      view_image = <TouchableOpacity
                      style={styles.image_placer}
                      onPress={pickImage}
                  >
                      <Text style={styles.add_text}>Add To Album</Text>
                  </TouchableOpacity>
    }

    let container = {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      
      
    }

    if(images.length != 0) {
      container = {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
      }
    }

    // const saveData  = async (item) => {
    //   console.log('Save Data Pressed 2')

    //   for(let i=0; i < images.length; i++) { 

    //     const coll_data = {
    //       title: text,
    //       images: item[i]
    //     }

    //     console.log("COLLECTIO DATA IS:", i, coll_data)
        
    //     try {
    //       db.collection("collections")
    //         .doc(firebase.auth().currentUser.uid)
    //         .collection('posts')
    //         .doc(coll_data.images.fileName)
    //         .set(coll_data)

    //       .then((docRef) => {
    //         console.log(item[i], 'UPLOADED', [i])
    //     })
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    //     }
    // }
    

  return (
    <SafeAreaView style={container}>
        <View style={styles.title_view}> 
            <TextInput
                style={styles.text_input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Title Collection"
                placeholderTextColor={'#bebabd'}
                
            />
        </View>
      {view_image}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
        // marginBottom: 100
    },
    title: {
        color: 'white',
        fontFamily: "Arial", 
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: 30,
        marginLeft: 20

    },
    title_view: {
        marginBottom: 40,
        width: Dimensions.get("window").width - 20,
        color: 'white',
        zIndex: 1
    },
    text_input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 20,
        borderBottomColor: 'white',
        color: 'white',
        fontSize: 25,
        zIndex: 1
       
      },
      image_placer: {
        width: 300,
        height: 400,
        backgroundColor: '#eeedee',
        opacity: 1
    

      },
      add_text: {
        justifyContent: 'center',
        alignSelf:'center', 
        margin: 'auto',
        flex: 1,
        display: 'block',
        position: 'absolute',
        top: '50%',
        color: 'red',
        
        
      },
      image_view_container : {
        flex: 1
      },
      image_arr_container: {
        width: 300,
        height: 100,
        border: 1,
        borderColor: 'red',
        backgroundColor: 'blue',
        flex: 1
        
      },
      image_arr_IMAGE: {
        // height: '100%',
        // width: '100%',
        // flex: 1,
        width:260,
          height:300,
          borderWidth:2,
          borderColor:'#d35647',
          resizeMode:'contain',
          margin:8
        
      },
      flatlist: {
        border: 1,
        borderColor: 'red',
        width: Dimensions.get("window").width - 130,
        height: 100,
        // backgroundColor: 'green',
        flex: 1,
        position: 'absolute',
        top: 450
        
        
      },
      flatlist_container: {
        backgroundColor: "white",
        borderRadius: 10,
        width: Dimensions.get("window").width / 4.5 ,
        height: Dimensions.get("window").height / 10,
        padding: 0,
        margin: 5,
        marginTop: 30,
        overflow: 'hidden'
      },
      flatlist_image: {
        // flex:1,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode:'cover',
        // borderWidth:2,
        // borderColor:'#d35647',
        zIndex: -1
    },
    submit_btn: {
      backgroundColor: 'white',
      
    },
    submit_txt: {
      fontSize: 25,
      color: 'white',
      position: 'absolute',
      margin: 200
    }
    
})