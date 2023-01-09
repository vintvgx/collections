import * as firebase from 'firebase'
import React, {useState} from 'react';
import { file_names } from '../jotai/atom';
import { useAtom } from 'jotai';
// import { storage } from '@react-native-firebase/storage'

// const [filenames, setFilenames] = useAtom(file_names)

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


// export const db = firebase.firestore()

// export const storageRef = firebase.storage().ref()

// export const user = (firebase.auth().currentUser.uid)
// console.log(user)



const uploadImage = async(uri, filename, title) => {
  
  const response = await fetch(uri);
  const blob = await response.blob();
  const img_path = ('images/' + user + '/' + title + '/' + filename)
  console.log(img_path)
  var ref =  storageRef.child(img_path);
  return ref.put(blob);
}



export const saveData  = async (text, item) => {
      console.log('Saving Data to ', text)
    
      for(let i=0; i < item.length; i++) { 

        const coll_data = {
          title: text,
          images: item[i]
        }
        
        //         uploads files to firebase/ keeps track of filename
        // 
        // COLLECTIONS -> uid ->    FILES    ->   'TITLE01' -> IMAGES -> IMG01
        //                uid                     'TITLE02'              IMG02
        //
        //                        FILENAMES       'TITLE01'
        //                                        'TITLE02'
        // GET FILENAME FROM COLLECTIONS AND USING THE RETURN VALUES TO GET IMAGES IN
        // COLLECTION FILES
        try {
    
          db.collection("collections")
            .doc(firebase.auth().currentUser.uid)
            .collection('files')
            .doc(coll_data.title)
            .collection('images')
            .doc(coll_data.images.fileName)
            .set(coll_data)

          .then((docRef) => {
            console.log(item[i], 'UPLOADED', [i])
          
            uploadImage(coll_data.images.uri, coll_data.images.fileName, coll_data.title)
            .then((snapshot) => {
              console.log('Uploaded SNAPSHOT:', snapshot)
            })
            .catch((error) => {
              console.log('Error uploading to storage ', error)
            })
        })
        } catch (e) {
            console.error("Error adding document: ", e);
          }
        }

        //uploads filenames 
      try {
        const filenames_ref = db.collection('collections').doc(firebase.auth().currentUser.uid).collection('filenames')
        
        filenames_ref.doc(text).set({
          id: text
        })  
        .then(() => {
          console.log('Filename Uploaded')
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    }


export const getFileNames = async (return_array) => {
  
  // const [filenames, setFilenames] = useState([])
  const posts_ref = await db.collection("collections").doc(firebase.auth().currentUser.uid).collection("filenames")
  // const image_ref = await db.collection("collections").doc(firebase.auth().currentUser.uid).collection("files")
  
  // const filenames = await posts_ref.get()
  
  posts_ref.get().then(function(querySnapshot) {

      querySnapshot.forEach(function(doc) {
          
          // console.log(doc.data());
          const result = doc.id
          // console.log(result)
          // console.log('resultis:', result)
          return_array.push(result)
          // setFilenames(filenames => [...filenames, doc.id])
      });
      console.log('ARRAY IS:', return_array)
  })

  

}

// export const get_coll_data = async (filenames, collection_data) => {
//   for (let i=o; i < filenames.length; i++ ) {
//     let imageRef = firebase.storage().ref('/' + imageName)
//     const img_path = ('images/' + user + '/' + filenames[i] + '/')
//   }
// }

export const get_collection = async (filenames, return_array) => {
  console.log('running getColl')
  console.log('ITEM IS: ',filenames)

    // information is already stored in filename
    //
    // const filenames = getFileNames(filenames) 
    // console.log('FILESNAMES: ',filenames)

    filenames.map(file =>  {
      const post_ref = db.collection("collections").doc(firebase.auth().currentUser.uid).collection("files").doc(file).collection('images')

      post_ref.get().then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            
            const result = doc.data()
            console.log(result.images.fileName)
           
            return_array.push(result)
        });
        console.log('COLLECTION DATA IS:', return_array.length)
        
    })
    })

    console.log('running second loop')
    // console.log(return_array[0])

    await return_array.map(collection => {
      const img_path = ('images/' + user + '/' + return_array.title + '/' + return_array.images.fileName)
      const img_ref = storageRef.child(img_path)

      img_ref
        .getDownloadURL()
        .then((url) => { 
          const image = {
            uri: url
          }
          // console.log(url)
          covers.push(image)
        })
        .catch((e) => {
          console.log(e)
        })
        console.log('COVERS ARE:::::',covers)
    })

}

export const getCovers = async (collection_data, covers) => {

  console.log('running second loop')
  console.log(collection_data.length)


  await collection_data.map(collection => {
    const img_path = ('images/' + user + '/' + collection.title + '/' + collection.images.fileName)
    const img_ref = storageRef.child(img_path)

    img_ref
      .getDownloadURL()
      .then((url) => { 
        const image = {
          uri: url
        }
        // console.log(url)
        covers.push(image)
      })
      .catch((e) => {
        console.log(e)
      })
      console.log('COVERS ARE:::::',covers)
  })
}



    
//     // filenames.forEach((doc) => {
//     //     if(!doc) {
//     //     return_array.push(doc.id)
//     //     }
//     // })

//     // for(var i = 0; i < filenames.length; i++) {
//     //     return_array.push(doc.id[i])
//     // }

//     console.log(blank)
// }


// export const getFileNames = async (return_array) => {
//     const blank = []
//     const [filenames, setFilenames] = useState([])
//     posts_ref = db.collection("collections").doc(firebase.auth().currentUser.uid).collection("posts")
//     // const filenames = await posts_ref.get()
    
//     posts_ref.get().then(function(querySnapshot) {


//         for (var i in querySnapshot.docs) {
//             const doc = querySnapshot.docs[i].id
//             blank.push(doc)
//             setFilenames(filenames => [...filenames, doc])
//             if (!querySnapshot.doc) {
//                 break
//             } else {
//                 i++
//             }
//         }
//         console.log(filenames)
//        return filenames
//     })

   
// }

// export const getFileNames = async (return_array) => {
//     const blank = []
//     const [filenames, setFilenames] = useState([])
//     posts_ref = db.collection("collections").doc(firebase.auth().currentUser.uid).collection("posts")
//     // const filenames = await posts_ref.get()
    
//     posts_ref.get().then((querySnapshot) => {
//                     // setFilenames(querySnapshot.docs.map(doc=>doc.id))
//                         querySnapshot.forEach((doc) => {
//                             // console.log(`${doc.id} => ${doc.data()}`);
//                             console.log(doc.id);
//                             // setFilenames(filenames => [...filenames, doc.id])
//                             // console.log(doc.data())
//                         });
//                     });

   
// }