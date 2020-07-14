import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as actions from '../actions'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

const MapScreen = ({ fetchJobs, navigation }) => {
  const [region, setRegion] = useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  })
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  const onButtonPress = () => {
    fetchJobs(region, () => {
      navigation.navigate('Deck')
    })
  }
  const onRegionChangeComplete = (newRegion) => {
    // console.log(newRegion)
    setRegion(newRegion)
  }
  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        style={{ flex: 1 }}
      />
      <View style={styles.btnContainer}>
        <Button
          large
          title='Search This Area'
          buttonStyle={{ backgroundColor: '#009688' }}
          icon={{ name: 'search' }}
          onPress={onButtonPress}
        />
      </View>
    </View>
  )
}

export default connect(null, actions)(MapScreen)

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10
  }
})
