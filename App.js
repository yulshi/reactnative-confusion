import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/Loading';

export default class App extends React.Component {


  render() {

    const { persistor, store } = ConfigureStore();

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}>
          <Main />
        </PersistGate>
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
