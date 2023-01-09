import React, { Component } from 'react'

export class FS_SET_IMAGE extends Component {

  saveData() {
   
    // console.log('Item from saveData func:' , item)

    firebase.firestore().collection('collections')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .doc(item.title)
        .collection('images')
        .doc({item})
}
  render() {
    return (
      <div>FS_SET_IMAGE</div>
    )
  }
}

export default FS_SET_IMAGE