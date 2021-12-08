/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text>Profile</Text>
      </View>
      <View style={styles.picture}>
        {/* <Image style={styles.imageStyle}></Image> */}
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <Text style={styles.textStyle}>{auth().currentUser.displayName}</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.textStyle}>vachri.attala@gmail.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
    margin: 20,
    color: '#444',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 15,
    padding: 5,
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
  imageStyle: {
    borderRadius: '50%',
  },
});
