/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Profile({navigation}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(user => {
        console.log(user);
        console.log(user.data().role);
        if (user.data().role === 'admin') {
          setIsAdmin(true);
        }
      });
  }, []);

  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <View style={styles.header}>
        <Text style={styles.header}>Profile</Text>
      </View> */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/images/profile_placeholder.png')}
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <Text style={styles.textStyle}>{auth().currentUser.displayName}</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.textStyle}>{auth().currentUser.email}</Text>
      </View>

      {isAdmin ? (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Role</Text>
          <Text style={styles.textStyle}>Admin</Text>
        </View>
      ) : null}

      <View style={styles.signOutContainer}>
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => handleSignOut()}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
    margin: 10,
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
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageContainer: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  signOut: {
    backgroundColor: '#2DC441',
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    marginHorizontal: 10,
    borderRadius: 7,
  },
  signOutText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 20,
  },
  signOutContainer: {
    paddingHorizontal: 15,
  },
});
