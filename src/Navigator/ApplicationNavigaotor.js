import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeWork from '../Screens/Homework/HomeWork';
import CreateHomework from '../Screens/Homework/CreateHomework';
import CheckHomework from '../Screens/Homework/CheckHomework';
import AttachmentScreen from '../Screens/Homework/AttachmentScreen';

const Stack = createStackNavigator();

const ApplicationNavigaotor = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="createHomework" component={CheckHomework} /> */}
      <Stack.Screen name="HomeWork" component={HomeWork} />
      <Stack.Screen name="AttachmentScreen" component={AttachmentScreen} />
      <Stack.Screen
        name="Create Homework"
        component={CreateHomework}
        options={{
          headerStyle: {
            shadowColor: 'black',
            elevation: 4,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationNavigaotor;
