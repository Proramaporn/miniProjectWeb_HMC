// App.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Provider } from 'react-redux';
import configureStore from './Store';

import Menu from './Menu';
import NewFood from './NewFood';

const MenuScreen = () => {
  const navigation = useNavigation();
  return <Menu navigation={navigation} />;
};

const NewFoodScreen = () => {
  const navigation = useNavigation();
  return <NewFood navigation={navigation} />;
};

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewFood"
        component={NewFoodScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(props) {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    );
  }
}
