/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import store from './store/index';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Entercode from './components/entercode';
import Phonepage from './components/phonepage';
import Tabpanel from './components/tab';
import { Provider } from 'react-redux';
import { Router, Scene, } from 'react-native-router-flux';
import Userinfo from './components/userinfo';
import Messages from './components/messages';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
                 <Scene key="/phonepage" initial  component={Phonepage} hideNavBar />
                 <Scene key="/codepage" component={Entercode} hideNavBar />
                 <Scene key="/userinfo"  component={Userinfo} hideNavBar />
                 <Scene key="/tabpanel"  component={Tabpanel} hideNavBar />
                  <Scene key="/chatbot" component={Messages} hideNavBar/>

          </Scene>
        </Router>

      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
