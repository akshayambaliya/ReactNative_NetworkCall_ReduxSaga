import axios from 'axios';
import { AuthenticationService } from './AuthenticationService';
import {BASE_URL} from './constants';
import { addAuthorizationRequestInterceptor } from './interceptors';
import { errorHandler, successHandler } from './responseHandlers';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
 
  constructor(enforcer) {
    // if (enforcer !== singletonEnforcer) {
    //   throw new Error('Cannot construct singleton');
    // }
    this.authHelper = AuthenticationService;
    var axiosInstance = axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    /**
     * Add Request Interceptor to add Authorization header
     */
    // axiosInstance = addAuthorizationRequestInterceptor(axiosInstance, this);

    this.session = axiosInstance
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  request = (config) => {

    return this.session.request(config)
    .then((response) => Promise.resolve(successHandler(response)))
    .catch((error) => Promise.reject(errorHandler(error)));
  };

  get = (url, params = {}) => {
    return this.request({
      method: 'GET',
      url,
      params,
    });
  }

  post = (url, data = {}, params = {}) => {
    return this.request({
      method: 'POST',
      url,
      data,
      params,
    });
  }

  put = (url, data = {}, params = {}) => {
    return this.request({
      method: 'PUT',
      url,
      data,
      params,
    });
  }

  patch = (url, data = {}, params = {}) => {
    return this.request({
      method: 'PATCH',
      url,
      data,
      params,
    });
  }

  delete = (url, data = {}) => {
    return this.request({
      method: 'DELETE',
      url,
      data,
    });
  }

  getAuthHelper = () => this.authHelper;

}


// const apiClient = new ApiService()

export default ApiService.instance;
