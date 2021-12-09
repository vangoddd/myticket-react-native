/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Profile({navigation}) {
  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text>Profile</Text>
      </View>
      <View>{/* <Image style={styles.imageStyle}></Image> */}</View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <Text style={styles.textStyle}>{auth().currentUser.displayName}</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.textStyle}>vachri.attala@gmail.com</Text>
      </View>
      <TouchableOpacity style={styles.signOut} onPress={() => handleSignOut()}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
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
  signOut: {
    backgroundColor: '#2DC441',
    alignSelf: 'center',
    padding: 10,
    flex: 1,
    borderRadius: 7,
  },
  signOutText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
