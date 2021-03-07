/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {base} from './src/navigation/index';

Navigation.events().registerAppLaunchedListener(() => base());
