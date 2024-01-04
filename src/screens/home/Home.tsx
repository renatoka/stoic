import { determineTimeOfDay } from '../../services/services';
import { Quote } from '../../types/types';
import BooksSection from './components/Books';
import QuoteBox from './components/QuoteBox';
import { Heading, Spinner, Text, View } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';

const Home = () => {
  const storage = new MMKVLoader()
    .withInstanceID('favorites')
    .withEncryption()
    .initialize();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [quote, setQuote] = useState<Quote>({
    id: '',
    text: '',
    author: '',
  });

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://stoic-quotes.com/api/quote');
      const data = await response.json();
      data.id = Math.floor(Math.random() * 1000000).toString();
      const favorites = await storage.getArrayAsync('favorites');
      if (favorites) {
        const isFavorite = favorites.some(
          (favorite: any) => favorite.id === data.id,
        );
        if (isFavorite) {
          data.id = (parseInt(data.id) + 1).toString();
        }
      }
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

  const addToFavorites = async () => {
    const favorites = await storage.getArrayAsync('favorites');
    if (favorites) {
      await storage.setArrayAsync('favorites', [...favorites, quote]);
    } else {
      await storage.setArrayAsync('favorites', [quote]);
    }
  };

  const removeFromFavorites = async (id: string) => {
    const favorites = await storage.getArrayAsync('favorites');
    if (favorites) {
      const filteredFavorites = favorites.filter(
        (favorite: any) => favorite.id !== id,
      );
      await storage.setArrayAsync('favorites', filteredFavorites);
    }
  };

  return isLoading || refreshing ? (
    <View style={styles.centeredContainer}>
      <Spinner size={'small'} />
    </View>
  ) : error ? (
    <View style={styles.centeredContainer}>
      <Text style={styles.error}>{error.message}</Text>
    </View>
  ) : (
    <ScrollView
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
      <View style={styles.quoteBox}>
        <QuoteBox
          quote={quote}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      </View>
      {/* <View style={styles.container}>
        <BooksSection />
      </View> */}
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
