const reactNativeModuleName = 'react-navigation';
import {NavigationActions, StackActions} from 'react-navigation';
import {CommonActions} from '@react-navigation/native';
// const {NavigationActions , StackActions, CommonActions} = require('react-navigation') ;
// import { CommonActions } from '@react-navigation/native';
// const {NavigationActions , StackActions, CommonActions} = (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') ?
// tslint:disable-next-line:no-var-requires
// require(reactNativeModuleName) : {NavigationActions: undefined , StackActions: undefined, CommonActions: undefined};
let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params = {}) {
  console.log(
    'NavigationActions ',
    NavigationActions,
    '_navigator',
    _navigator,
    'StackActions ',
    StackActions,
  );
  if (NavigationActions === undefined) {
    return;
  }
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export function push(routeName, params = {}) {
  console.log(
    'NavigationActions ',
    NavigationActions,
    '_navigator',
    _navigator,
    'StackActions ',
    StackActions,
  );
  if (StackActions === undefined) {
    return;
  }
  const pushAction = StackActions.push({
    routeName,
    params,
  });
  // const pushAction = CommonActions.push({
  //   routeName,
  //   params,
  // });

  console.log('push action ', pushAction);

  setTimeout(() => {
    _navigator.dispatch(pushAction);
  }, 200);
}

export function replace(routeName, params = {}) {
  if (StackActions === undefined) {
    return;
  }
  const replaceAction = StackActions.replace({
    routeName,
    params,
  });

  setTimeout(() => {
    _navigator.dispatch(replaceAction);
  }, 200);
}

export function resetAndNavigate(index, routeName, params = {}) {
  if (StackActions === undefined || NavigationActions === undefined) {
    return;
  }
  const resetAction = StackActions.reset({
    index,
    actions: [NavigationActions.navigate({routeName, params})],
  });
  _navigator.dispatch(resetAction);
}

export function goBack() {
  if (StackActions === undefined) {
    return;
  }
  const popAction = StackActions.pop({
    n: 1,
  });

  _navigator.dispatch(popAction);
}
// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  push,
  resetAndNavigate,
  goBack,
  replace,
};
