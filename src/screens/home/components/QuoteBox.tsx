import { QuoteBoxProps } from '../../../types/types';
import { Text, View } from '@gluestack-ui/themed';
import { HeartIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

const QuoteBox = ({ quote, isFullScreen, setIsFullScreen }: QuoteBoxProps) => {
  return (
    <View>
      <TouchableOpacity onPress={setIsFullScreen}>
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFullScreen}
        onRequestClose={() => {
          setIsFullScreen(false);
        }}
      >
        <View style={[styles.fullScreen, styles.fullScreenModal]}>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteBox: {
    backgroundColor: '#14213D',
    borderRadius: 10,
    padding: 25,
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
    marginTop: 20,
  },
});

export default QuoteBox;
