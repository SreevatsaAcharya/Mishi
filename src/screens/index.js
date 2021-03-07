import {Navigation} from 'react-native-navigation';

import HomeScreen from './home';
import DashboardScreen from './dashboard';

export const registerScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux(
    'mishi.home',
    () => HomeScreen,
    Provider,
    store,
  );

  Navigation.registerComponentWithRedux(
    'mishi.dashboard',
    () => DashboardScreen,
    Provider,
    store,
  );
};
