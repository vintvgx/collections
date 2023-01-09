import {create} from 'zustand'
import {persist} from 'zustand'

const useColletionStore = create (
    persist (
        (set, get) => ({
            filenames: [],
            collection_data: [],
            covers: [],
            loading: false,

            fetchFilenames: async () => {
                return_array = []
                const posts_ref = await db.collection("collections").doc(firebase.auth().currentUser.uid).collection("filenames")
                
                posts_ref.get().then(function(querySnapshot) {

                    querySnapshot.forEach(function(doc) {
                        const result = doc.id
                        return_array.push(result)
                    });
                    console.log('ARRAY IS:', return_array)
                })
                return return_array //should be stored in //! filenames array
            },

            fetchCollections: async (filenames) => {
                return_array = []
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

                return return_array //should be stored in //! collections array
            },

            fetchImages: async (collection_data) => {
                return_array = []
                await collection_data.map(collection => {
                    const img_path = ('images/' + user + '/' + collection_data.title + '/' + collection_data.images.fileName)
                    const img_ref = storageRef.child(img_path)
              
                    img_ref
                      .getDownloadURL()
                      .then((url) => { 
                        const image = {
                          uri: url
                        }
                        // console.log(url)
                        return_array.push(image)
                      })
                      .catch((e) => {
                        console.log(e)
                      })
                      console.log('COVERS ARE:::::',return_array)
                  })
                  return return_array //should be stored in //! images array
            }, 
        })
    )
)

export default useColletionStore