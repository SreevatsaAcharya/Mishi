import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import {registerScreens} from '../screens';
import configureStore from '../redux/store';

const store = configureStore();

registerScreens(store, Provider);

export const base = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'mishi.home',
                    options: {
                      topBar: {
                        drawBehind: true,
                        visible: false,
                      },
                      bottomTab: {
                        icon: require('../assets/images/home.png'),
                        testID: 'boards',
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'mishi.dashboard',
                    options: {
                      topBar: {
                        drawBehind: true,
                        visible: false,
                      },
                      bottomTab: {
                        icon: require('../assets/images/boards.png'),
                        testID: 'boards',
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
};
