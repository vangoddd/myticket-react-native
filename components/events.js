import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function Events(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [events, setEvents] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('events')
      .onSnapshot(querySnapshot => {
        const eventsNew = [];

        querySnapshot.forEach(documentSnapshot => {
          eventsNew.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setEvents(eventsNew);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={events}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 10}}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableHighlight
            onPress={() => props.nav.push('EventDetails', item)}
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
    padding: 15,
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
});
