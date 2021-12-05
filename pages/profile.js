/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text>Profile</Text>
      </View>
      <View style={styles.picture}>
        {/* <Image style={styles.imageStyle}></Image> */}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Name</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contnetText}>{auth().currentUser.displayName}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Email</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contnetText}>vachri.attala@gmail.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
