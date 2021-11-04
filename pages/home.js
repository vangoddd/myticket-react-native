import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';

export default function Home({navigation}) {
  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>MyTicket</Text>
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => handleSignOut()}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <Events nav={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    fontSize: 50,
    padding: 0,
    flex: 3,
  },
  itemStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  signOut: {
    backgroundColor: '#DDD',
    alignSelf: 'center',
    padding: 10,
    flex: 1,
    borderRadius: 7,
  },
  signOutText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
