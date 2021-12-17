/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function Profile({navigation, admin, route}) {
  const [photo, setPhoto] = useState(null);

  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPhoto();
    });
    return unsubscribe;
  }, [navigation, photo]);

  const fetchPhoto = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.get('photo')) {
          setProfilePic(documentSnapshot.data().photo);
        }
      });
  };

  useEffect(() => {
    fetchPhoto();
  }, [uploading]);

  useEffect(() => {
    if (photo == null) return;
    saveImageToCloud()
      .then(imgUrl => {
        firestore().collection('users').doc(auth().currentUser.uid).update({
          photo: imgUrl,
        });
      })
      .then(() => {
        setUploading(false);
        Alert.alert('Success', 'Photo updated', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
        console.log('Photo changed');
      });
  }, [photo]);

  const handleSignOut = () => {
    auth().signOut();
  };

  if (!auth().currentUser) {
    return null;
  }

  const photoPickerCallback = o => {
    if (!o.didCancel) {
      setPhoto(o);
      setUploading(true);
    }
  };

  const openPhotoPicker = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: false},
      photoPickerCallback,
    );
  };

  const saveImageToCloud = async () => {
    console.log(photo);
    const reference = storage().ref('user/' + auth().currentUser.uid);
    await reference.putFile(photo.assets[0].uri).catch(error => {
      throw error;
    });
    const url = await reference.getDownloadURL().catch(error => {
      throw error;
    });
    return url;
  };

  const handleChangePic = () => {
    openPhotoPicker();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={uploading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Uploading</Text>
            <ActivityIndicator />
          </View>
        </View>
      </Modal>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleChangePic()}>
          {profilePic ? (
            <Image style={styles.imageStyle} source={{uri: profilePic}} />
          ) : (
            <Image
              style={styles.imageStyle}
              source={require('../assets/images/profile_placeholder.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <Text style={styles.textStyle}>{auth().currentUser.displayName}</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.textStyle}>{auth().currentUser.email}</Text>
      </View>

      {admin ? (
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
