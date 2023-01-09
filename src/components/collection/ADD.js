import React, {useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button, Image, Dimensions, SafeAreaView, TextInput} from 'react-native';
import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker'
import { ImagePicker } from 'expo-image-multiple-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function ADD({navigation}) {

    const [text, onChangeText] = React.useState(null);
    const [camera, setCamera] = useState(null)
    const [images, setImages] = useState([])
    const [hasPermission, setHasPermission] = useState(null)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    let view_image

    const save_images = async (assets) => {
        console.log('Adding to images array')
        setImages(assets)
        console.log(images)
        navigation.navigate('Create', {images})
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImagePicker
                onSave={save_images}
                onCancel={() => console.log('no permissions or user go back')}
                galleryColumns={4}
                multiple
                />
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({ 
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: 'white'
    }

})