import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width
const Slides = ({ data, onComplete }) => {
  const renderLastSlide = (index) => {
    if (index === data.length - 1) {
      return (
        <Button
          buttonStyle={styles.buttonStyle}
          onPress={onComplete}
          title='Onwards!'
        />
      )
    }
  }
  const renderSlides = () => {
    return data.map((slide, index) => {
      return (
        <View
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          {renderLastSlide(index)}
        </View>
      )
    })
  }
  return (
    <ScrollView pagingEnabled horizontal style={{ flex: 1 }}>
      {renderSlides()}
    </ScrollView>
  )
}

export default Slides

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288d1',
    marginTop: 15
  }
})
