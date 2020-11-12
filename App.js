/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Suspense} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {StoreProviderService} from './src/network/StoreProviderService';
import HomeScreen from './src/screens/home/HomeScreenContainer';
import {AlertHelper} from './src/utils/AlertHelper';
import {configureStore} from './Store';
import DropdownAlert from 'react-native-dropdownalert';

const appStore = () => {
  let store = StoreProviderService.getStore();
  if (!store) {
    StoreProviderService.init(configureStore);
    store = StoreProviderService.getStore();
  }
  return store;
};
const loader = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};

const renderdropDownAlertMessage = () => {
  return (
    <DropdownAlert
      defaultContainer={{
        padding: 8,
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
      }}
      ref={(ref) => AlertHelper.setDropdownAlertRef(ref)}
      closeInterval={2000}
      onClose={AlertHelper.onAlertClosed}
    />
  );
};
export default class App extends Component {
  /**
   * Set this ref with NavigationContainer to use navigation from navigationService
   */
  //ref={(navigatorRef) => setTopLevelNavigator(navigatorRef)}
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={appStore()}>
          <Suspense fallback={loader()}>
            <View style={{flex: 1}}>
              {renderdropDownAlertMessage()}
              <HomeScreen />
            </View>
          </Suspense>
        </Provider>
      </View>
    );
  }
}
