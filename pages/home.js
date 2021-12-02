import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';
export default function Home({navigation}) {
  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>MyTicket</Text>
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => handleSignOut()}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Regevent')}>
        <Text style={{padding: 15, fontSize: 20}}>Add event</Text>
      </TouchableOpacity>
      <Text>{auth().currentUser.displayName}</Text>
      <Events nav={navigation} />
    </SafeAreaView>
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
