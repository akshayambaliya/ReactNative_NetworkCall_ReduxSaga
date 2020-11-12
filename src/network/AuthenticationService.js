// import { IUserModel, IUserRole, IUserToken } from '@models/User';
import {StoreProviderService} from './StoreProviderService';

class AuthenticationService {
  constructor() {}

  getUser = async () => {
    // const user = await LocalStorage.get<IUserModel>(StorageKeys.USER);
    // return user;
  };

  getUserId = async () => {};

  getAccessToken = () => {
    const state = StoreProviderService.getStore().getState();
    console.log('Redux State ', state.auth.authToken);

    if (!state.auth.authToken) {
      return undefined;
    }

    return state.auth.authToken.token;
    // use getAccessToken Selector to retrieve access Token
  };

  refreshTokens = async () => {
    // StoreProviderService.getStore().dispatch(/* dispatch refresh token action */)
  };
}

// const authenticationService = new AuthenticationService(UserRepository);
const authenticationService = new AuthenticationService();
// ApiClient.setAuthHelper(authenticationService)
// .setAuthHelper(authenticationService);
export {authenticationService as AuthenticationService};
