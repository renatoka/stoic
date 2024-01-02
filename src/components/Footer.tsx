import { Box, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#121212',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Box
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 50,
        }}
      >
        <Text style={styles.text}>Home</Text>
        <Text style={styles.text}>More</Text>
      </Box>
    </View>
  );
};

export default Footer;
