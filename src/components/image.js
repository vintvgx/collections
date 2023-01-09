import { Text, View, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import React, { Component, useState, useCallback, useRef, useEffect } from 'react'
import placeholder_images from '../../placeholder_images'

import firebase from 'firebase'
import { collection } from 'firebase/firestore'
import { db, getFileNames, get_collection, getCovers } from './firebase/config' 
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAtom } from 'jotai';
import { file_names, data, cover_img } from './jotai/atom'







const image = ()  => {

   
    
    const [posts, setPosts] = useState([])
    const [collection_data, setCollections] = useAtom(data)
    const [covers, setCovers] = useAtom(cover_img)

    const [filenames, setFilenames] = useAtom(file_names)


    const docRef = db.collection("collections")
    const userRef = db.collection('users')

    // const query = db.collection('collections').doc(firebase.auth().currentUser.uid).collection("posts")

    // const list = db.collection('collections').doc(firebase.auth().currentUser.uid).collection("posts")
    // const [docs, loading, error] = useCollectionData(query)
    
    // console.log(docs)

    const array_test = ['test']

    // useEffect = () => {
    //     getFileNames(filenames)
    //     console.log('filenames in images.js : ', filenames)
    //     get_collection(filenames, collection_data)
    //     console.log('image.js collection len', collection_data.length)
    //     getCovers(collection_data, covers)
    // }
    
    
    if (filenames == 0) {
        getFileNames(filenames)
        // get_collection(filenames, collection_data)
    }
    else {
        setFilenames([])
        setCollections([])
        getFileNames(filenames)
        console.log('filenames in images.js : ', filenames)
        get_collection(filenames, collection_data)
        console.log('image.js collection len', collection_data.length)
        getCovers(collection_data, covers)
        // console.log('COVERS ARE:::::',covers)
        // console.log('images.js collection::::\n\n\n\n', collection_data[0])
        // console.log('s 1 IS SET TO:', collection_data[0].images.uri)
        
        
        // const img_uri = ('require(\'' + collection_data[0].images.uri + '\')')
        // console.log('IMG URI: ', covers)

        // console.log('HW',collection_data[0].images)
        // const set_uri = collection_data.map((item) => {
        //     const uri_ref = ('require(\'' + item.images + '\')')
        //     console.log(uri_ref)
        // })
        const update_arr = []
        
        // for (let i = 0; collection_data.length; i++){
        //     const uri_ref = ('require(\'' + collection_data[i].images.uri + '\')')
        //     update_arr.push(collection_data[i])
        //     update_arr[i].images.new_uri = uri_ref
            
        //     console.log(update_arr[i].images.new_uri)
        // }
        // setCollections(set_uri)
        // console.log(set_uri)
        
    }
    // const uri_ref = ('require(\'' + collection_data[0].images.uri + '\')')
    // const obj = JSON.parse(JSON.stringify({
    //     uri: uri_ref,
    //     title: 'yo momma',
    //     date: '1/1/23'
    // }))

    // console.log('OBJECT:::', obj.uri)

    // const obj_arr = []
    // obj_arr.push(obj)
    // console.log('OBJECTARR::::', obj_arr)
    

    // db.collection("collections").doc(firebase.auth().currentUser.uid).collection("posts").get().then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // console.log(`${doc.id} => ${doc.data()}`);
    //                 // console.log(doc.id);
    //                 setFilenames(filenames => [...filenames, doc.id])
    //                 // console.log(doc.data())
    //                 array_test.push(doc.data)
    //             });
    //         });

    // // const new_posts = JSON.parse(docs)
    
    // console.log(filenames)

    // console.log(filenames[1])

    // const _filename = db.collection("collections").doc(firebase.auth().currentUser.uid).collection("posts").doc(filenames[1])

    // const _filemame = db.collection(`'collections/${firebase.auth().currentUser.uid}/posts/${filenames[1]}`)
            
    // _filename.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });

    
    
    // for(let i=0; i < docs.length(); i++) {
        
    //     if (docs[i].title != title) {
    //         setcollection_data([...collection_data, docs[i].images.uri])
    //     } 

    // }
    

    


    
    // console.log(docs)


    // useEffect(() => {
    //     // Update the document title using the browser API
    //      db.collection("collections").doc(firebase.auth().currentUser.uid).collection("images").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(`${doc.id} => ${doc.data()}`);
    //             setCollections([doc.data()])
    //         });
    //     });

    //   });
    //   console.log('\nCollection is:', collections)


    // useEffect (() => {
    //     db.collection('collections').doc(firebase.auth().currentUser.uid).collection("posts")
    //     .listCollections()
    // })

    // db.collection("collections").doc(firebase.auth().currentUser.uid).collection('images')
    // .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    

    // db.collection('collections').doc(firebase.auth().currentUser.uid).get()
    //     .then((doc) => {
    //         console.log(doc.data())
    //     })
        

    //! DB COLLECTION GET THAT WORKS USING QUERY SNAPSHOT
    // const posts = db.collection("collections").doc(firebase.auth().currentUser.uid).collection("images").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             // console.log(`${doc.id} => ${doc.data()}`);
    //             setCollections([...collections, doc.data()])
    //         });
    //     });

    // console.log('\nCollection is:', collections)

    // const users = await firestore().collection('collections').get();
    // console.log(users)

    // docRef.get().then((doc) => {
        
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log(firebase.auth().currentUser.uid)
    //         console.log("No such document!");
    //         console.log(docRef)
    //         console.log(doc.data());
            
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });

  return (
    <View style={styles.view}>
        {/* <Text style={styles.font}>Collections</Text> */}
        <FlatList 
        // ref={flatListRef}
        pagingEnabled 
        numColumns={2}
        vertical
        showsHorizontalScrollIndicator={false}
        data={covers}
        renderItem={(
            ({ item }) => (
                <View style={styles.container}>
                     <Image 
                        source={{uri: item.uri}}
                        style={styles.image}
                    /> 
                     <View style={styles.image_detail}>
                        <Text style={styles.font}>"{item.title}"</Text>
                        <Text style={styles.font}>{item.date}</Text>
                    </View>
                </View>
            ) )}
    />
    </View>
  )
}

export default image

const styles = StyleSheet.create({
    view: {
        // flex: 1,
        marginTop: 30,
    },
    container: {
        
        backgroundColor: "white",
        borderRadius: 10,
        width: Dimensions.get("window").width / 2.4,
        height: Dimensions.get("window").width / 2.4,
        padding: 0,
        margin: 15,
        marginTop: 30,
        overflow: 'hidden'
        
    },
    image: {
        // flex:1,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode:'s',
        borderWidth:2,
        borderColor:'#d35647',
        zIndex: -1
    },
    font: {
        fontSize: 25,
        color: '#000',
        zIndex: 1,
        textAlign:'center',
        fontFamily: "Arial", 
        fontWeight: '500',
        opacity: 0.5,
        // textShadowColor: 'rgba(100, 10, 0, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 20
    },
    image_detail: {
        position: 'absolute',
        top: '50%',
        zIndex: 1, 
        alignSelf: 'center'
    }
})