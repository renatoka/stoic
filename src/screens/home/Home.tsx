import { determineTimeOfDay } from '../../services/services';
import { Quote } from '../../types/types';
import BooksSection from './components/Books';
import QuoteBox from './components/QuoteBox';
import { Heading, ScrollView, Spinner, Text, View } from '@gluestack-ui/themed';
import { HeartIcon } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  RefreshControl,
  StyleSheet,
} from 'react-native';

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [quote, setQuote] = useState<Quote>({
    text: '',
    author: '',
  });

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

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://stoic-quotes.com/api/quote');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchQuote().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return isLoading ? (
    <View style={styles.centeredContainer}>
      <Spinner size={'small'} />
    </View>
  ) : error ? (
    <View style={styles.centeredContainer}>
      <Text style={styles.error}>{error.message}</Text>
    </View>
  ) : (
    <ScrollView
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={styles.refreshControl}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.subHeading}>{determineTimeOfDay()}</Text>
        <Heading style={styles.heading}>Reflect on this</Heading>
      </View>
      <View
        style={[styles.quoteBox, isFullScreen ? styles.fullScreen : null]}
        {...panResponder.panHandlers}
      >
        <QuoteBox
          quote={quote}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      </View>
      <View style={styles.container}>
        <BooksSection />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  refreshControl: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginBottom: 10,
    marginTop: 10,
  },
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
  error: {
    color: '#FFFFFF',
  },
});

export default Home;
