/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './profile';
import Regevent from './regevent';

function HomeComponent({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>MyTicket</Text>
      </View>
      <Text style={styles.subHeader}>Latest events</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Regevent')}>
        <Text style={{padding: 15, fontSize: 20}}>Add event</Text>
      </TouchableOpacity> */}
      {/* Event list */}
      <Events nav={navigation} />
    </SafeAreaView>
  );
}

export default function Home({navigation}) {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeComponent}
        options={{headerShown: false, drawerLabel: 'Home'}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen
        name="RegDrawer"
        component={Regevent}
        options={{drawerLabel: 'Register Event', title: 'Register Event'}}
      />
    </Drawer.Navigator>
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
  subHeader: {
    fontSize: 20,
    fontFamily: 'ReadexPro-Medium',
    padding: 15,
  },
});
