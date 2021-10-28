import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function EventDetails({route, navigation}) {
  const item = route.params;
  return (
    <View style={styles.itemStyle}>
      <Text style={styles.header}>{item.name}</Text>
      <Text style={styles.textStyle}>Lokasi : {item.location}</Text>
      <Text style={styles.textStyle}>
        Tiket Tersedia : {item.available_ticket}
      </Text>
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
    fontSize: 15,
    padding: 5,
  },
  itemStyle: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 20,
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
  },
});
