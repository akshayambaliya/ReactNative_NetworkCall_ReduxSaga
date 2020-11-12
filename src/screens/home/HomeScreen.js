import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ScreenLoader from '../../components/ScreenLoader';
import {AlertHelper} from '../../utils/AlertHelper';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getEmployeeList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.empolyeeListLoader && !this.props.empolyeeListLoader) {
      if (this.props.empolyeeListError === '') {
        AlertHelper.successAlert('Data Recived successfully');
      }
      if (this.props.empolyeeListError !== '') {
        AlertHelper.errorAlert(
          'Something Went Wrong',
          'Please try after some times',
        );
      }
    }
  }

  render() {
    const {empolyeeListLoader, employeeList} = this.props;
    if (empolyeeListLoader) return <ScreenLoader />;
    return (
      <View>
        <Text> {JSON.stringify(employeeList)} </Text>
      </View>
      
    );
  }
}
