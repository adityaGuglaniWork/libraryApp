import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddBookForm from '@app/components/AddBookForm';
import Books from '@app/components/Books';
import Splash from '@app/components/Splash';
import Book from '@app/components/Book';
import CustomBackButton from '@app/components/CustomBackButton'

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={headerOptions} >
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="BOOKS" component={Books} options={{title: 'ALL BOOKS'}} />
          <Stack.Screen name="ADD BOOK" component={AddBookForm} options={{title: 'CREATE A NEW BOOK'}}  />
          <Stack.Screen name="BOOK" component={Book} options={{title: 'DETAIL'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};
  
const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#5db3ff"
  },
  headerTintColor: '#800080',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
  headerLeft: () => (<CustomBackButton />)
};
  
export default RootNavigator;