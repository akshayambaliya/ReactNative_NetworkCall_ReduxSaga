import {Dimensions} from 'react-native';

export const screenUtil = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

/**
 * @description : This method will return the precentage of the total screen height
 * @param {*} percent : Width Percentage
 * @returns : Integer ()
 */
export const hp = (percent) => {
  return (Dimensions.get('window').height * percent) / 100;
};

/**
 * @description : This method will return the precentage of the total screen width
 * @param {*} percent : Width Percentage
 * @returns : Integer ()
 */
export const wp = (percent) => {
  return (Dimensions.get('window').width * percent) / 100;
};
