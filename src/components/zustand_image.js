import { Text, View, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import React, { Component, useState, useCallback, useRef, useEffect } from 'react'
// import { db } from './firebase/config' 
import { useCollectionStore } from '../components/store/collectionData'


export default function zustand_image() {

  const filenames = useCollectionStore((state) => state.filenames)
  const collections = useCollectionStore((state) => state.collections)

  const fetchFilenames = useCollectionStore((state) => state.fetchFilenames)
  const fetchCollections = useCollectionStore((state) => state.fetchCollections)

  useEffect = () => {
    fetchFilenames
    fetchCollections
  }, []

  return (
    <View>
      <Text>zustand_image</Text>
    </View>
  )
}