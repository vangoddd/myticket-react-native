/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Events from '../components/events';
import auth from '@react-native-firebase/auth';
import {Icon} from 'react-native-elements';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from './profile';
import Regevent from './regevent';

import Wishlist from './wishlist';

const handleSignOut = () => {
  auth().signOut();
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => handleSignOut()} />
    </DrawerContentScrollView>
  );
}

export default function Home({navigation, route, admin}) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        options={{headerShown: false, drawerLabel: 'Home'}}>
        {props => <HomeComponent {...props} admin={admin} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {props => <Profile {...props} admin={admin} />}
      </Drawer.Screen>
      {!admin ? (
        <Drawer.Screen name="Wishlist">
          {props => <Wishlist {...props} admin={admin} />}
        </Drawer.Screen>
      ) : null}
      {admin ? (
        <Drawer.Screen
          name="RegDrawer"
          component={Regevent}
          options={{
            drawerLabel: 'Register Event',
            title: 'Register Event',
          }}
        />
      ) : null}
    </Drawer.Navigator>
  );
}

function HomeComponent({navigation, route, admin}) {
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

      <View style={styles.sep} />
      <Text style={styles.subHeader}>Latest events</Text>

      {/* Event list */}
      <Events nav={navigation} admin={admin} wishlist={false} />
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
    zIndex: 15,
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
  sep: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 2,
    marginHorizontal: 15,
    paddingTop: 7,
  },
});
