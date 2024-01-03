import { Book } from '../../../types/types';
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const BooksSection = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [chosenBook, setChosenBook] = useState<Book | null>(null);
  const books: Book[] = [
    {
      id: '1',
      title: 'Meditations: A New Translation',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81T-PQ9HFTL._SL1500_.jpg',
    },
    {
      id: '2',
      title: 'Letters from a Stoic',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71WebVcbSxL._SL1156_.jpg',
    },
    {
      id: '3',
      title: 'The Enchiridion: Adapted for the Contemporary Reader',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61yA1ScaJ0L._SL1500_.jpg',
    },
    {
      id: '4',
      title:
        'The Obstacle Is the Way: The Timeless Art of Turning Trials into Triumph',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71JyuS7FdbL._SL1500_.jpg',
    },
    {
      id: '5',
      title: `Man's Search for Meaning`,
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91x-lhVENfL._SY466_.jpg',
    },
    {
      id: '6',
      title:
        'The Little Book of Stoicism: Timeless Wisdom to Gain Resilience, Confidence, and Calmness',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71uOhcp68bL._SL1360_.jpg',
    },
    {
      id: '7',
      title: 'Marcus Aurelius: The Stoic Emperor',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61bX8dnYPLL._SL1000_.jpg',
    },
    {
      id: '8',
      title: 'The 48 Laws of Power',
      image:
        'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61XUtQ7NTgL._SL1500_.jpg',
    },
  ];

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onStartShouldSetPanResponderCapture: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponderCapture: () => true,
  //     onPanResponderMove: (evt, gestureState) => {
  //       if (gestureState.dy > 20 && !isFullScreen) {
  //         setIsFullScreen(true);
  //       }
  //     },
  //     onPanResponderRelease: (evt, gestureState) => {
  //       if (gestureState.dy > 1) {
  //         setIsFullScreen(false);
  //       }
  //     },
  //   }),
  // ).current;

  return (
    <View flex={1}>
      <View style={{ marginBottom: 10 }}>
        <Heading style={styles.heading}>Worth reading</Heading>
      </View>
      <ScrollView horizontal>
        <HStack space="xl" reversed={false}>
          {books.map((book: Book) => (
            <TouchableOpacity
              key={book.id}
              style={{
                width: 150,
                height: 250,
              }}
              onPress={() => {
                setIsFullScreen(true);
                setChosenBook(book);
              }}
            >
              <Image
                alt="book"
                source={{ uri: book.image }}
                style={{
                  width: 'auto',
                  height: 250,
                  zIndex: 1,
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 10,
                  backgroundColor: '#FFFFFF',
                  opacity: 0.9,
                  zIndex: 2,
                  fontSize: 12,
                }}
              >
                {book.title.length > 30
                  ? `${book.title.slice(0, 30)}...`
                  : book.title}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFullScreen}
          onRequestClose={() => setIsFullScreen(false)}
        >
          <SafeAreaView>
            <ScrollView
              style={{
                paddingHorizontal: 20,
                backgroundColor: '#121212',
                height: '100%',
              }}
              onScroll={(event) => {
                const scrollPosition = event.nativeEvent.contentOffset.y;
                if (scrollPosition < -50) {
                  setIsFullScreen(false);
                }
              }}
              scrollEventThrottle={16}
            >
              <Image
                alt={chosenBook?.title}
                source={{ uri: chosenBook?.image }}
                style={{
                  width: '100%',
                  height: 500,
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#FFFFFF', marginTop: 5 }}>
                {chosenBook?.title}
              </Text>
              <Text style={{ color: '#FFFFFF', marginTop: 10 }}>
                "Letters from a Stoic" is a timeless collection of philosophical
                letters penned by the ancient Roman philosopher Seneca to his
                friend Lucilius. These letters serve as a practical guide to
                living a virtuous and meaningful life, offering insights into
                the core tenets of Stoicism. {'\n\n'}
                Seneca, a prominent Stoic philosopher, delves into the
                fundamental principles of Stoicism. This ancient philosophy
                advocates cultivating wisdom, courage, justice, and temperance
                to achieve tranquility in the face of life's challenges.
                Stoicism emphasizes focusing on what is within our control and
                accepting what is not.
              </Text>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default BooksSection;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: '#FFFFFF',
  },
});
