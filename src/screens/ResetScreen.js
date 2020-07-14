import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as actions from '../actions'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
const ResetScreen = ({ clearLikedJobs }) => {
  return (
    <View>
      <Button
        large
        title='Reset Liked Jobs'
        icon={{ name: 'delete-forever' }}
        buttonStyle={{ backgroundColor: '#f44336' }}
        onPress={clearLikedJobs}
      />
    </View>
  )
}

export default connect(null, actions)(ResetScreen)

const styles = StyleSheet.create({})
