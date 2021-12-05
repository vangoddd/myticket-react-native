import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import auth from '@react-native-firebase/auth';

export default function Regevent({navigation}) {
  const [eventName, setEventName] = useState('');
  const [eventDes, setEventDes] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [avlTickets, setAvlTickets] = useState('');

  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const [photo, setPhoto] = useState(null);

  const [uploading, setUploading] = useState(false);

  const onPriceChange = text => {
    setPrice(text.replace(/[^0-9]/g, ''));
  };

  const confirmationAlert = () => {
    Alert.alert('Konfirmasi', 'Apakah anda yakin data yang anda isi benar?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log(photo);
          console.log('cancel');
        },
        style: 'cancel',
      },
      {
        text: 'Submit',
        onPress: () => {
          submitEvent();
          console.log('submit');
        },
      },
    ]);
  };

  const submitEvent = () => {
    setUploading(true);
    saveImageToCloud().then(imgUrl => {
      console.log('Image url :');
      console.log(imgUrl);
      firestore()
        .collection('events')
        .add({
          name: eventName,
          location: location,
          price: price,
          description: eventDes,
          available_ticket: avlTickets,
          verified: 1,
          createdAt: firestore.Timestamp.now(),
          startTime: dateStart,
          endTime: dateEnd,
          image: imgUrl,
          owner: auth().currentUser.uid,
        })
        .then(() => {
          setUploading(false);
          Alert.alert('Success', 'Event successfully submitted', [
            {
              text: 'Ok',
              onPress: () => navigation.pop(),
            },
          ]);
          console.log('event added');
        });
    });
  };

  const showStartPicker = () => {
    setStartPickerVisible(true);
  };

  const showEndPicker = () => {
    setEndPickerVisible(true);
  };

  const hidePicker = () => {
    setStartPickerVisible(false);
    setEndPickerVisible(false);
  };

  const dateStartConfirm = date => {
    setDateStart(date);
    hidePicker();
  };

  const dateEndConfirm = date => {
    setDateEnd(date);
    hidePicker();
  };

  const photoPickerCallback = o => {
    if (!o.didCancel) {
      setPhoto(o);
      console.log(photo);
    }
  };

  const openPhotoPicker = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: false},
      photoPickerCallback,
    );
  };

  const saveImageToCloud = async () => {
    const reference = storage().ref('eventImage/' + photo.assets[0].fileName);
    await reference.putFile(photo.assets[0].uri).catch(error => {
      throw error;
    });
    const url = await reference.getDownloadURL().catch(error => {
      throw error;
    });
    return url;
  };

  const SelectPhoto = () => {
    if (photo == null) {
      return <Text>Select a photo</Text>;
    } else {
      return (
        <View>
          <Image
            style={styles.imageStyle}
            source={{
              uri: photo.assets[0].uri,
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={uploading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Uploading</Text>
            <ActivityIndicator />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text>Event Name</Text>
          <TextInput
            placeholder="Event name"
            onChangeText={text => setEventName(text)}
            style={styles.form}
          />
          <Text>Event Description</Text>
          <TextInput
            placeholder="Event Description"
            onChangeText={text => setEventDes(text)}
            style={styles.form}
          />
          <Text>Location</Text>
          <TextInput
            placeholder="Location"
            onChangeText={text => setLocation(text)}
            style={styles.form}
          />
          <Text>Price</Text>
          <TextInput
            placeholder="Price"
            keyboardType="number-pad"
            onChangeText={text => onPriceChange(text)}
            style={styles.form}
            value={price}
          />
          <Text>Available Tickets</Text>
          <TextInput
            placeholder="Available tickets"
            keyboardType="number-pad"
            onChangeText={text => setAvlTickets(text)}
            style={styles.form}
            value={avlTickets}
          />

          {/* Date picker */}
          <Text>Start date</Text>
          <TouchableOpacity
            onPress={showStartPicker}
            style={styles.dateTouchable}>
            <TextInput
              style={[styles.form, styles.dateTextView]}
              value={dateStart ? dateStart.toString() : ''}
              editable={false}
              placeholder="Start date"
            />
          </TouchableOpacity>

          <Text>End date</Text>
          <TouchableOpacity
            onPress={showEndPicker}
            style={styles.dateTouchable}>
            <TextInput
              style={[styles.form, styles.dateTextView]}
              value={dateEnd ? dateEnd.toString() : ''}
              editable={false}
              placeholder="Start date"
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={startPickerVisible}
            mode="datetime"
            onConfirm={dateStartConfirm}
            onCancel={hidePicker}
          />

          <DateTimePickerModal
            isVisible={endPickerVisible}
            mode="datetime"
            onConfirm={dateEndConfirm}
            onCancel={hidePicker}
            minimumDate={dateStart}
          />
          {/* Add photo */}
          <Text>Add photo</Text>
          <TouchableOpacity onPress={openPhotoPicker}>
            <SelectPhoto />
          </TouchableOpacity>
        </View>
        {/* Submit button */}
        <TouchableOpacity
          onPress={() => {
            confirmationAlert();
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Daftar</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 25,
  },
  form: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  test: {
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#2DC441',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 25,
  },
  buttonText: {
    color: 'white',
  },
  dateTouchable: {
    color: 'black',
    flex: 1,
  },
  dateTextView: {
    color: 'black',
    padding: 5,
  },
  imageStyle: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginTop: 10,
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
