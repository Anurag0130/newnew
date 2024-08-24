import {View, Text} from 'react-native';
import React from 'react';
import store from './src/Store/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import ApplicationNavigaotor from './src/Navigator/ApplicationNavigaotor';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <ApplicationNavigaotor />
//       </NavigationContainer>
//     </Provider>
//   );
// };

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ApplicationNavigaotor />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
