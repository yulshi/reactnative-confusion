import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'

export default class App extends React.Component {


  render() {

    const store = ConfigureStore();

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
