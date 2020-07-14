import AsyncStorage from '@react-native-community/async-storage'
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types'
import * as Facebook from 'expo-facebook'
import { appId } from '../../fbBootstrap'

export const facebookLogin = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('fb_token')
    if (token) {
      // console.log(token)
      // dispatch action saying fb login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
      // Start up FB Login proccess
      doFacebookLogin(dispatch)
    }
  } catch (err) {
    console.log(err)
  }
}

const doFacebookLogin = async (dispatch) => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      {
        permissions: ['public_profile']
      }
    )

    if (type === 'cancel') {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }
    await AsyncStorage.setItem('fb_token', token)
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } catch (error) {
    console.log(error)
  }
}
