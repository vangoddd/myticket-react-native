import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

  const onPriceChange = text => {
    setPrice(text.replace(/[^0-9]/g, ''));
  };

  const confirmationAlert = () => {
    Alert.alert('Konfirmasi', 'Apakah anda yakin data yang anda isi benar?', [
      {
        text: 'Cancel',
        onPress: () => {
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
    firestore()
      .collection('events')
      .add({
        name: eventName,
        location: location,
        price: price,
        description: eventDes,
        available_ticket: avlTickets,
        verified: 0,
        createdAt: firestore.Timestamp.now(),
        startTime: dateStart,
        endTime: dateEnd,
      })
      .then(() => {
        console.log('event added');
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Event name"
            onChangeText={text => setEventName(text)}
            style={styles.form}
          />
          <TextInput
            placeholder="Event Description"
            onChangeText={text => setEventDes(text)}
            style={styles.form}
          />
          <TextInput
            placeholder="Location"
            onChangeText={text => setLocation(text)}
            style={styles.form}
          />
          <TextInput
            placeholder="Price"
            keyboardType="number-pad"
            onChangeText={text => onPriceChange(text)}
            style={styles.form}
            value={price}
          />
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
          {/* Submit button */}
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(price);
            console.log(avlTickets);
            console.log(location);
            console.log(eventDes);
            console.log(eventName);
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
    marginBottom: 5,
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
});
