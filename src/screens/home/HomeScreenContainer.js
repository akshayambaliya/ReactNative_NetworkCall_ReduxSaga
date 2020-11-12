import {connect} from 'react-redux';
import {fetchEmployeeList} from '../../redux/home/actions';
import {
  getEmployeeList,
  getEmployeeListErrorSelector,
  getEmployeeListListLoaderSelector,
} from '../../redux/home/selectors';
import HomeScreen from './HomeScreen';

const mapStateToProps = (state) => ({
  empolyeeListLoader: getEmployeeListListLoaderSelector(state),
  empolyeeListError: getEmployeeListErrorSelector(state),
  employeeList: getEmployeeList(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeList: () => dispatch(fetchEmployeeList('')),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
