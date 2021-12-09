/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';
import {Icon} from 'react-native-elements';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './profile';
import Regevent from './regevent';

function HomeComponent({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" type="font-awesome" color="#444" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textStyle}>MyTicket</Text>
      </View>

      <View
        style={{
          borderBottomColor: '#DDD',
          borderBottomWidth: 2,
          marginHorizontal: 15,
          paddingTop: 7,
        }}
      />

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
        options={{
          drawerLabel: 'Register Event',
          title: 'Register Event',
        }}
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
});
