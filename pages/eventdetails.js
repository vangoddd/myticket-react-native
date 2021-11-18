import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import storage from '@react-native-firebase/storage';

export default function EventDetails({route, navigation}) {
  const item = route.params;

  return (
    <ScrollView>
      <View style={styles.itemStyle}>
        <Text style={styles.header}>{item.name}</Text>
        <Image
          style={{
            width: '100%',
            height: 200,
            borderRadius: 20,
            marginVertical: 10,
          }}
          source={{uri: item.image}}
        />
        <Text style={styles.textStyle}>{item.description}</Text>
        <Text style={styles.textStyle}>Lokasi : {item.location}</Text>
        <Text style={styles.textStyle}>
          Tiket Tersedia : {item.available_ticket}
        </Text>
        <Text style={styles.textStyle}>Harga {item.price}</Text>
      </View>
    </ScrollView>
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
