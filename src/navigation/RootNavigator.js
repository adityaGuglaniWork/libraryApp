import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddBookForm from '@app/components/AddBookForm';
import Books from '@app/components/Books';
import Splash from '@app/components/Splash';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
      <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Books" component={Books} />
                {/* <Stack.Screen name="Add Form" component={AddBookForm} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default RootNavigator;