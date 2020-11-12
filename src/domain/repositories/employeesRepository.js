import ApiClient from '../../network/client'
class EmployeesRepository {

  getEmployees = async () => {
    const response = await ApiClient.get('employees');
    return response
  };
  
}

const employeesRepository = new EmployeesRepository();

export { employeesRepository as EmployeesRepository };
