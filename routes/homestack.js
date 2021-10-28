import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from '@react-navigation/native';
import Home from '../pages/home';
import EventDetails from '../pages/eventdetails';

const screens = {
  Home: {
    screen: Home,
  },
  EventDetails: {
    screen: EventDetails,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
