import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Platform
} from 'react-native'
import MapView from 'react-native-maps'
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux'

const ReviewScreen = ({ likedJobs }) => {
  const renderLikedJobs = () => {
    return likedJobs.map(
      ({
        title,
        company,
        formattedRelativeTime,
        url,
        jobkey,
        longitude,
        latitude,
        jobtitle
      }) => {
        const initialRegion = {
          longitude,
          latitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.02
        }
        return (
          <Card title={jobtitle} key={jobkey}>
            <View style={{ height: 200 }}>
              <MapView
                style={{ flex: 1 }}
                cacheEnabled={Platform.OS === 'android'}
                scrollEnabled={false}
                initialRegion={initialRegion}
              />
              <View style={styles.detailWrapper}>
                <Text style={styles.italics}>{company}</Text>
                <Text style={styles.italics}>{formattedRelativeTime}</Text>
              </View>
              <Button
                title='Apply Now!'
                buttonStyle={{ backgroundColor: '#03a9f4' }}
                onPress={() => Linking.openURL(url)}
              />
            </View>
          </Card>
        )
      }
    )
  }
  return <ScrollView>{renderLikedJobs()}</ScrollView>
}

const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen)

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
})
