import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
var currencyFormatter = require('currency-formatter');

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const convertToRupiah = price => {
  return currencyFormatter.format(price, {
    symbol: 'Rp.',
    decimal: ',',
    thousand: '.',
    precision: 0,
    format: '%s%v', // %s is the symbol and %v is the value
  });
};

const timeStampToString = timeStamp => {
  var dateObj = timeStamp.toDate();
  return dateObj.toString();
};

export default function EventDetails({route, navigation}) {
  const item = route.params.item;
  navigation.setOptions({title: item.name});

  const [onWishlist, setOnWishlist] = useState(false);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    //check wishlist on user tan;e
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userWish = Object.keys(documentSnapshot.data().wishlist);
          if (userWish.includes(item.key)) {
            setQty(documentSnapshot.data().wishlist[item.key][0]);
            setOnWishlist(true);
          } else {
            setOnWishlist(false);
          }
        }
      })
      .catch(e => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onWishlist]);

  const confirmationAlert = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this event?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          handleDeleteEvent();
        },
      },
    ]);
  };

  const addToWishlist = (id, amt) => {
    var newAmt = amt;
    if (amt === 0) {
      newAmt = 1;
    }
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({['wishlist.' + id]: firestore.FieldValue.arrayUnion(newAmt)});
    setOnWishlist(true);
  };

  const removeFromWishlist = id => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({['wishlist.' + id]: firestore.FieldValue.delete()});
    setOnWishlist(false);
    setQty(0);
  };

  const handleDeleteEvent = () => {
    firestore()
      .collection('events')
      .doc(route.params.item.key)
      .delete()
      .then(() => {
        Alert.alert('Success', 'Event successfully deleted', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('HomeDrawer'),
          },
        ]);
      });
  };

  const WishlistButton = () => {
    if (route.params.admin) {
      return (
        <View style={styles.wishlistContainer}>
          <TouchableOpacity
            style={styles.wishListRemove}
            onPress={() => confirmationAlert()}>
            <Text style={styles.wishlistText}>Delete event</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!onWishlist) {
      return (
        <View style={styles.wishlistContainer}>
          <TouchableOpacity
            style={styles.wishList}
            onPress={() => addToWishlist(item.key, qty)}>
            <Text style={styles.wishlistText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.wishlistContainer}>
          <TouchableOpacity
            style={styles.wishListRemove}
            onPress={() => removeFromWishlist(item.key)}>
            <Text style={styles.wishlistText}>Remove from wishlist</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.itemStyle}>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.header}>{item.name}</Text>
        </View> */}

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
          <Text style={styles.cardTitle}>Date & Time</Text>
          <Text style={styles.textBold}>Start</Text>
          <Text style={styles.textStyle}>
            {timeStampToString(item.startTime)}
          </Text>
          <Text style={styles.textBold}>End</Text>
          <Text style={styles.textStyle}>
            {timeStampToString(item.endTime)}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Available Ticket</Text>
          <Text style={styles.textStyle}>{item.available_ticket}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Price</Text>
          <Text style={styles.textStyle}>
            {convertToRupiah(item.price)} / Ticket
          </Text>
        </View>

        {onWishlist ? (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Quantity</Text>
            <Text style={styles.textStyle}>{qty}</Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Quantity</Text>
            <TextInput
              placeholder="Qty"
              keyboardType="number-pad"
              onChangeText={text => setQty(text)}
              style={styles.form}
              value={qty}
            />
          </View>
        )}

        {/* idk bt this */}
        <WishlistButton />
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
  textBold: {
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold',
  },
  wishList: {
    backgroundColor: '#2DC441',
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    marginHorizontal: 10,
    borderRadius: 7,
  },
  wishListRemove: {
    backgroundColor: '#FF0000',
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    marginHorizontal: 10,
    borderRadius: 7,
  },
  wishlistText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 20,
  },
  wishlistContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    width: '100%',
  },
  form: {
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: '#bbb',
    borderWidth: 1,
  },
});
