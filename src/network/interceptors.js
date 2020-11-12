import {
  AUTH_TOKEN_EXPIRED_MESSAGE,
  ERR_UNSUPPORTED_VERSION,
  HTTP_STATUS_CODES,
  UNDER_MAINTENANCE
} from './constants';

export const addAuthorizationRequestInterceptor = (axiosInstance, apiClient) => {
  axiosInstance.interceptors.request.use(async (config) => {
    //const authHelper = apiClient.getAuthHelper();
    // const accessToken = authHelper?.getAccessToken();
    const accessToken = "Token";
    if(!!accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers = {
      ...config.headers,
    };

    console.log("Config is - ", config);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  return axiosInstance;
};

export const addExpiredAuthorizationTokenResponseInterceptor = (axiosInstance, apiClient) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      const originalRequest = error.config;
      const authHelper = apiClient.getAuthHelper();
      if (isAuthorizationTokenExpiredError(error) && !originalRequest._retry && authHelper) {
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        await authHelper.refreshTokens();
        const accessToken = await authHelper.getAccessToken();
        originalRequest.headers.Authorization = `Token ${accessToken}`;
        originalRequest._retry = true;
        return await apiClient.request(originalRequest);
      }
      errorHandler(error);
      return Promise.reject(error);
    });
  return axiosInstance;
};

const isAuthorizationTokenExpiredError = (error) => {
  if (error.response &&
    error.response.data &&
    HTTP_STATUS_CODES.Unauthorized === error.response.status &&
    AUTH_TOKEN_EXPIRED_MESSAGE === error.response.data.data.message) {
    return true;
  }
  return false;
};

const errorHandler = (error) => {
  if (error.response && error.response.data && error.response.data.data) {
    const errorData = error.response.data.data;
    switch (errorData.code) {
      case ERR_UNSUPPORTED_VERSION:
        // StoreProviderService.getStore().dispatch(updateAppUpgradeFlag(true));
        break;
      case UNDER_MAINTENANCE:
        const maintenance = {
          showServerMaintenanceInfo: true,
          message: errorData.message,
          description: errorData.description,
        };
        // StoreProviderService.getStore().dispatch(updateServerMaintenanceFlag(maintenance));
        break;
      default: // do nothing
    }
  }
};
