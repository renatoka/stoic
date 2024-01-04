import { HeartIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MMKVLoader } from 'react-native-mmkv-storage';

const QuoteBox = ({ quote, addToFavorites, removeFromFavorites }: any) => {
  const storage = new MMKVLoader()
    .withInstanceID('favorites')
    .withEncryption()
    .initialize();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const panY = new Animated.Value(0);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorites = await storage.getArrayAsync('favorites');
      setIsFavorite(
        favorites?.some((item: any) => item.id === quote.id) ?? false,
      );
    };

    checkFavoriteStatus();
  }, [quote.id, storage]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: panY }], { useNativeDriver: false })(
          _,
          gestureState,
        );
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        setModalVisible(false);
      } else {
        Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  const handleHeartIconPress = async () => {
    if (isFavorite) {
      removeFromFavorites(quote.id);
      setIsFavorite(false);
      setModalVisible(false);
    } else {
      addToFavorites();
      setIsFavorite(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      {...panResponder.panHandlers}
    >
      <View>
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Animated.View
          style={[
            styles.fullScreen,
            styles.fullScreenModal,
            { transform: [{ translateY: panY }] },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
          <TouchableOpacity
            onPress={handleHeartIconPress}
            style={styles.heartIconContainer}
          >
            <HeartIcon
              size={20}
              color="#FFFFFF"
              fill={isFavorite ? 'red' : ''}
            />
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quoteBox: {
    backgroundColor: '#14213D',
    borderRadius: 10,
    padding: 25,
    position: 'relative',
  },
  quoteText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  quoteAuthor: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  fullScreen: {
    backgroundColor: '#14213D',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenModal: {
    flex: 1,
    marginTop: 'auto',
    borderRadius: 10,
  },
  heartIconContainer: {
    position: 'relative',
    top: 10,
    alignSelf: 'center',
  },
});

export default QuoteBox;
