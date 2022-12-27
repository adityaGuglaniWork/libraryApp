/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AddBookForm from '@app/components/AddBookForm';

export default function App() {
  return <AddBookForm style={{flex: 1}} />
}

if (__DEV__) {
  import('./lib/Reactotron').then(() => console.log('Reactotron Configured'));
}