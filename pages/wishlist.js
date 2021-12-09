/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';
import {Icon} from 'react-native-elements';

export default function Wishlist({navigation, route, admin}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.padding}></View>
      {/* Event list */}
      <Events nav={navigation} admin={admin} wishlist={true} />
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
    fontSize: 40,
    padding: 0,
    flex: 6,
    fontFamily: 'ReadexPro-Light',
    color: '#555',
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
    justifyContent: 'space-around',
    padding: 15,
    paddingBottom: 0,
    alignItems: 'center',
  },
  subHeader: {
    fontSize: 25,
    fontFamily: 'ReadexPro-Medium',
    padding: 15,
  },
  icon: {
    alignItems: 'flex-start',
    flex: 1,
    paddingLeft: 10,
  },
  padding: {
    paddingTop: 10,
  },
});
