import { Quote } from '../../types/types';
import QuoteBox from '../home/components/QuoteBox';
import { Heading, Spinner, Text, View } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';

const Favorites = () => {
  const storage = new MMKVLoader()
    .withInstanceID('favorites')
    .withEncryption()
    .initialize();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const getFavorites = async () => {
    try {
      setIsLoading(true);
      const favorites = await storage.getArrayAsync('favorites');
      if (favorites) {
        setFavorites(favorites);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(
      async () => await getFavorites().then(() => setRefreshing(false)),
      500,
    );
  };

  const removeFromFavorites = async (id: string) => {
    const favorites = await storage.getArrayAsync('favorites');
    if (favorites) {
      const filteredFavorites = favorites.filter(
        (favorite: any) => favorite.id !== id,
      );
      await storage.setArrayAsync('favorites', filteredFavorites);
      setFavorites(filteredFavorites);
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
      contentContainerStyle={favorites.length === 0 && styles.centeredContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={styles.refreshControl}
        />
      }
    >
      {favorites.length === 0 && !isLoading ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.error}>No favorites yet</Text>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.subHeading}>Favorites</Text>
            <Heading style={styles.heading}>The ones you love</Heading>
          </View>
          {favorites.map((favorite: Quote) => (
            <View style={styles.quoteView} key={favorite.id}>
              <QuoteBox
                key={favorite.id}
                quote={favorite}
                removeFromFavorites={removeFromFavorites}
              />
            </View>
          ))}
        </>
      )}
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
  quoteView: {
    marginBottom: 10,
  },
});

export default Favorites;
