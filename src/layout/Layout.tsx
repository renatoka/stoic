import { View } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Layout;
