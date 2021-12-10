/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function Events(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [events, setEvents] = useState([]); // Initial empty array of users
  const [notFound, setNotFound] = useState(false);

  const getEvent = () => {
    if (props.wishlist) {
      //get user wishlist
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userWish = documentSnapshot.data().wishlist;
            if (userWish.length > 0) {
              firestore()
                .collection('events')
                .where(firestore.FieldPath.documentId(), 'in', userWish)
                .get()
                .then(querySnapshot => {
                  if (querySnapshot.size === 0) {
                    setNotFound(true);
                    setLoading(false);
                  } else {
                    const eventsNew = [];

                    querySnapshot.forEach(documentSnapshotWish => {
                      eventsNew.push({
                        ...documentSnapshotWish.data(),
                        key: documentSnapshotWish.id,
                      });
                    });
                    setNotFound(false);
                    setEvents(eventsNew);
                    setLoading(false);
                  }
                })
                .catch(e => console.log(e));
            } else {
              setNotFound(true);
              setLoading(false);
            }
          }
        })
        .catch(e => console.log(e));
    } else {
      firestore()
        .collection('events')
        // .where('verified', '==', 1)
        .orderBy('startTime', 'asc')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size === 0) {
            setNotFound(true);
            setLoading(false);
          } else {
            const eventsNew = [];

            querySnapshot.forEach(documentSnapshot => {
              eventsNew.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setNotFound(false);
            setEvents(eventsNew);
            setLoading(false);
          }
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    const unsubscribe = props.nav.addListener('focus', () => {
      getEvent();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (notFound) {
    if (props.wishlist) {
      return <Text style={styles.notFoundText}>Wishlist Empty.</Text>;
    } else {
      return <Text style={styles.notFoundText}>No event found</Text>;
    }
  } else {
    return (
      <FlatList
        data={events}
        onRefresh={() => getEvent()}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        renderItem={({item}) => (
          <View style={styles.container}>
            <TouchableHighlight
              onPress={() =>
                props.nav.push('EventDetails', {admin: props.admin, item: item})
              }
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={styles.itemStyle}>
              <View>
                <ImageBackground
                  style={styles.imageStyle}
                  imageStyle={{borderRadius: 10}}
                  source={{uri: item.image}}>
                  <Text style={styles.itemTextStyle}>{item.name}</Text>
                </ImageBackground>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 50,
    padding: 15,
  },
  itemStyle: {
    borderRadius: 10,
  },
  itemTextStyle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
    textShadowColor: '#000000',
    textShadowRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'ReadexPro-Light',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  imageStyle: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Montserrat-SemiBold',
  },
});
