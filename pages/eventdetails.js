import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import 'intl';

import storage from '@react-native-firebase/storage';

const convertToRupiah = price => {
  // return new Intl.NumberFormat('en', {
  //   style: 'currency',
  //   currency: 'IDR',
  // }).format(price);
  return price;
};

export default function EventDetails({route, navigation}) {
  const item = route.params;

  return (
    <ScrollView>
      <View style={styles.itemStyle}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{item.name}</Text>
        </View>

        <Image style={styles.imageStyle} source={{uri: item.image}} />

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Description</Text>

          <Text style={styles.textStyle}>{item.description}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Location</Text>
          <Text style={styles.textStyle}>{item.location}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Available Ticket</Text>
          <Text style={styles.textStyle}>{item.available_ticket}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Price</Text>
          <Text style={styles.textStyle}>{convertToRupiah(item.price)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    padding: 5,
  },
  itemStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  header: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
    margin: 20,
    color: '#444',
    textAlign: 'center',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderRadius: 0,
    marginBottom: 10,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
  },
  cardTitle: {
    color: '#444',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 5,
  },
  headerContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
});
