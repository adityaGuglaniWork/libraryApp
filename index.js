/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '@app/public/App';
import {name as appName} from '@app/public/app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {rootTag: document.getElementById('root'),});
