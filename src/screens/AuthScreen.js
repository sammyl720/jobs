import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as actions from '../actions'
import { connect } from 'react-redux'

const AuthScreen = ({ navigation, facebookLogin, token }) => {
  const onAuthComplete = (token) => {
    if (token) {
      navigation.navigate('Maps')
    }
  }
  useEffect(() => {
    // AsyncStorage.removeItem('fb_token')
    facebookLogin()
    onAuthComplete(token)
  }, [])

  useEffect(() => {
    onAuthComplete(token)
  }, [token])

  return <View />
}

const mapStateToProps = (state) => {
  const { token, rejected } = state.auth
  return { token, rejected }
}
export default connect(mapStateToProps, actions)(AuthScreen)

const styles = StyleSheet.create({})
