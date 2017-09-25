import React, { Component } from 'react';
import {AsyncStorage, Text} from 'react-native'
import { Provider } from 'react-redux';
import {createStore, compose} from 'redux';
import { gameApp } from "../reducers"
import {defaultGameState} from "../helpers";
import {autoRehydrate, persistStore} from "redux-persist";
import AppContainer from "./App/AppContainer";

let initialState = defaultGameState();

let store = createStore(gameApp, initialState, compose(
  autoRehydrate()
));

persistStore(store, { storage: AsyncStorage });

class Root extends Component {
  constructor (props) {
    super(props);
    this.state = { rehydrated: false };
  }
  componentDidMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) return  <Text>...Loading </Text>;
    return (<Provider store={store}>
      <AppContainer />
    </Provider>);
  }
}

export default Root;