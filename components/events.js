import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
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
        const events = [];

        querySnapshot.forEach(documentSnapshot => {
          events.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setEvents(events);
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
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableHighlight
            onPress={() => props.nav.push('EventDetails', item)}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={styles.itemStyle}>
            <View >
              <Text style={styles.itemTextStyle}>{item.name}</Text>
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
    backgroundColor: '#BBB',
  },
  itemTextStyle: {
    fontSize: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
