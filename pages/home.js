import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Events from '../components/events';

export default function Home({navigation}) {
  return (
    <View>
      <Text style={styles.textStyle}>MyTicket</Text>
      <Events nav={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    fontSize: 50,
    padding: 15,
  },
  itemStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
  },
});
