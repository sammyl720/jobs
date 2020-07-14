import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Card, Button } from 'react-native-elements'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Swipe from '../components/Swipe'
const DeckScreen = ({ jobs, likeJob, navigation }) => {
  const renderNoMoreCards = () => {
    return (
      <Card title='No More Jobs'>
        <Button
          title='Back to Map'
          large
          icon={{ icon: 'my-location' }}
          buttonStyle={{ backgroundColor: '#03a9f4' }}
          onPress={() => {
            navigation.navigate('Map')
          }}
        />
      </Card>
    )
  }
  const renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            scrollEnabled={false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <View>
          <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
        </View>
      </Card>
    )
  }
  return (
    <View style={{ marginTop: 10, minimumHeight: 500 }}>
      <Swipe
        data={jobs}
        onSwipeRight={(job) => likeJob(job)}
        keyProp='jobkey'
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { results } = state.jobs
  return { jobs: results }
}
export default connect(mapStateToProps, actions)(DeckScreen)

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
})
