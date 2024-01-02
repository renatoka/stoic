import { Box, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { Appearance, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    backgroundColor:
      Appearance.getColorScheme() === 'dark' ? '#121212' : '#fff',
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Box
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Text>Home</Text>
        <Text>More Quotes</Text>
      </Box>
    </View>
  );
};

export default Footer;
