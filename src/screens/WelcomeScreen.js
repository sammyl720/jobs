import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import Slides from '../components/Slides'

const SLIDE_DATA = [
  {
    text: 'Welcome To JobApp',
    color: '#03a9f4'
  },
  {
    text: 'Use This to get a job',
    color: '#009688'
  },
  {
    text: 'Set your location, then slide away',
    color: '#03a9f4'
  }
]
const WelcomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    // AsyncStorage.removeItem('fb_token')

    const fetchData = async () => {
      const fbToken = await AsyncStorage.getItem('fb_token')
      if (fbToken) {
        navigation.navigate('Maps')
        setToken(fbToken)
      } else {
        setToken(false)
      }
    }
    fetchData()
  }, [token])
  const onSlideComplete = () => {
    navigation.navigate('Auth')
  }
  if (_.isNull(token)) {
    return <AppLoading />
  }
  return <Slides onComplete={onSlideComplete} data={SLIDE_DATA} />
}

export default WelcomeScreen
