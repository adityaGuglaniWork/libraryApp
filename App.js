/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AddBookForm from '@app/components/AddBookForm';
import Books from '@app/components/Books';
import { ScrollView } from 'react-native';
import RootNavigator from '@app/navigation/RootNavigator';

export default function App() {
  return (
    <RootNavigator/>
  )
}

if (__DEV__) {
  import('./lib/Reactotron').then(() => console.log('Reactotron Configured'));
}