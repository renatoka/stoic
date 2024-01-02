import { Quote } from '../../types/types';
import BooksSection from './components/Books';
import QuoteBox from './components/QuoteBox';
import { Heading, ScrollView, Text, View } from '@gluestack-ui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Home = () => {
  const [quote, setQuote] = useState<Quote>({
    text: '',
    author: '',
  });

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        setIsFullScreen(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          setIsFullScreen(false);
        }
      },
    }),
  ).current;

  const determineTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;
    if (hours < 12) {
      timeOfDay = 'Good Morning';
    } else if (hours >= 12 && hours < 17) {
      timeOfDay = 'Good Afternoon';
    } else {
      timeOfDay = 'Good Evening';
    }
    return timeOfDay;
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch('https://stoic-quotes.com/api/quote');
      const data = await response.json();
      setQuote(data);
    };
    fetchQuote();

    const interval = setInterval(fetchQuote, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.subHeading}>{determineTimeOfDay()}</Text>
        <Heading style={styles.heading}>Think about this</Heading>
      </View>
      <Animated.View
        style={isFullScreen && { opacity: 0.25 }}
        {...panResponder.panHandlers}
      >
        <QuoteBox
          quote={quote}
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
        />
      </Animated.View>
      <View style={{ marginTop: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Heading style={styles.heading}>Worth reading</Heading>
        </View>
        <View style={{ marginBottom: 10 }}>
          <BooksSection />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  subHeading: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  quoteBox: {
    backgroundColor: '#14213D',
    borderRadius: 10,
    padding: 25,
  },
  fullScreen: {
    backgroundColor: '#14213D',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
