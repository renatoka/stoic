import { QuoteBoxProps } from '../../../types/types';
import { Text, View } from '@gluestack-ui/themed';
import { ArrowDown } from 'lucide-react-native';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';

const QuoteBox = ({ quote, isFullScreen, toggleFullScreen }: QuoteBoxProps) => {
  return (
    <>
      <TouchableOpacity onPress={toggleFullScreen}>
        <View style={styles.quoteBox}>
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {quote.text}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: 5,
              fontWeight: '500',
            }}
          >
            {quote.author}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFullScreen}
        onRequestClose={toggleFullScreen}
      >
        <View
          style={[
            styles.fullScreen,
            { flex: 1, marginTop: 'auto', borderRadius: 10 },
          ]}
        >
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {quote.text}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: 5,
              fontWeight: '500',
            }}
          >
            {quote.author}
          </Text>
          <View style={{ marginTop: 10 }}>
            <ArrowDown size={15} color="white" />
          </View>
        </View>
      </Modal>
    </>
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

export default QuoteBox;
