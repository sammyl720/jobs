import 'react-native-gesture-handler'
import InitalizeFB from './fbBootstrap'
import React, { useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from './src/screens/WelcomeScreen'
import AuthScreen from './src/screens/AuthScreen'
import MapScreen from './src/screens/MapScreen'
import DeckScreen from './src/screens/DeckScreen'
import ReviewScreen from './src/screens/ReviewScreen'
import ResetScreen from './src/screens/ResetScreen'
import { Provider } from 'react-redux'
import store from './src/store'

const MainTab = createBottomTabNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Review'
        component={ReviewScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Icon name='my-location' size={30} color={color} />
          ),
          title: 'Review Jobs',
          headerRight: () => (
            <Button
              title='Setting'
              type='clear'
              onPress={() => {
                navigation.navigate('Settings')
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name='Settings'
        component={ResetScreen}
        options={{
          headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
        }}
      />
    </Stack.Navigator>
  )
}
const SecondaryTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 }
      }}
      tabBarPosition='bottom'
    >
      <Tab.Screen
        name='Map'
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='my-location' size={30} color={color} />
          )
        }}
        component={MapScreen}
      />
      <Tab.Screen
        name='Deck'
        component={DeckScreen}
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => (
            <Icon name='description' size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Review Jobs'
        component={StackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='favorite' size={30} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    InitalizeFB()
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTab.Navigator tabBar={() => null}>
          <MainTab.Screen name='Welcome' component={WelcomeScreen} />
          <MainTab.Screen name='Auth' component={AuthScreen} />
          <MainTab.Screen name='Maps' component={SecondaryTab} />
        </MainTab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
