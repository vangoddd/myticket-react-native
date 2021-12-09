import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import EventDetails from './pages/eventdetails';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Regevent from './pages/regevent';

const App = () => {
  const Stack = createStackNavigator();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState(false);

  // Handle user state changes
  const onAuthStateChanged = userAuth => {
    setAdmin(false);

    setUser(userAuth);

    if (userAuth) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(curUser => {
          if (curUser.data().role === 'admin') {
            setAdmin(true);
          }
        });

      console.log('auth changed');
      console.log(admin);
    }

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Register',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} admin={admin} />}
        </Stack.Screen>
        <Stack.Screen name="Regevent" component={Regevent} />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            title: 'Event Details',
          }}
        />
      </Stack.Navigator>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notifications" component={EventDetails} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
