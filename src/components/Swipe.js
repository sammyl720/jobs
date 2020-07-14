import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Animated,
  Text,
  LayoutAnimation,
  UIManager,
  Dimensions,
  View,
  Platform,
  PanResponder
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards,
  keyProp
}) => {
  const [index, setIndex] = useState(0)
  const position = new Animated.ValueXY()

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  }, [index])

  useEffect(() => {
    setIndex(0)
  }, [data])
  const panResponder = PanResponder.create({
    // called any time user touches screen
    // if function return true the pan responder will track the gesture
    onStartShouldSetPanResponder: (event) => true,

    // called whenever user drags their finger on the screen
    // args: event, gesture (has info on type of gesture ie: speed, direction)
    onPanResponderMove: (event, gesture) => {
      // console.log(gesture)
      // console.log('moving', index)
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },

    // called when user releases their finger from screen
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        // console.log('Swipe right')
        forceSwipe('right')
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        // console.log('Swipe Left')
        forceSwipe('left')
      } else {
        resetPosition()
      }
    }
  })

  type Direction = 'right' | 'left'
  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(position, {
      toValue: {
        x,
        y: 0
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false
    }).start(onSwipeComplete(direction))
  }

  const onSwipeComplete = (direction) => {
    const item = data[index]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    position.setValue({ x: 0, y: 0 })
    setIndex(index + 1)
  }
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start()
  }
  const getCardsStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }
  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards()
    }
    const deck = data.map((item, i) => {
      if (i < index) {
        // console.log(`${i} < ${index}`)
        return null
      }
      if (index === i) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[getCardsStyle(), styles.cardStyle, { zIndex: 100 }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        )
      }
      return (
        <Animated.View
          key={item[keyProp]}
          style={[styles.cardStyle, { top: 10 * (i - index), zIndex: -i }]}
        >
          {renderCard(item)}
        </Animated.View>
      )
    })
    return Platform.OS === 'android' ? deck : deck.reverse()
  }

  return <View>{renderCards()}</View>
}

Deck.defaultProps = {
  onSwipeRight: () => {
    // console.log('default prop')
  },
  onSwipeLeft: () => {},
  keyProp: 'id'
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
}
export default Deck
