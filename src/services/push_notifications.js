import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'
export default async () => {
  try {
    const previousToken = await AsyncStorage.getItem('push_token')
    // console.log(previousToken)
    if (!previousToken) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

      if (status !== 'granted') {
        return
      }

      const token = await Notifications.getExpoPushTokenAsync()
      // console.log(token, 'token')
      const message = {
        to: token,
        sound: 'Hi Man',
        title: 'Come Back to our App',
        body: 'There 12 new Jobs near yoe',
        data: { data: 'Additional Data' }
      }
      // await axios.post(PUSH_ENDPOINT, message)

      await AsyncStorage.setItem('push_token', token)
    }
  } catch (error) {
    console.log(error)
  }
}
