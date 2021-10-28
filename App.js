import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import EventDetails from './pages/eventdetails';
import Home from './pages/home';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            title: 'Event Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
