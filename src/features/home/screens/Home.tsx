import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import palette from 'core/styles/palette.ts';

type Props = {};
const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColor,
  },
});

export default Home;
