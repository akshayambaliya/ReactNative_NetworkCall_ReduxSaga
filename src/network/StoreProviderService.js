
let store;

class StoreProviderService {
  init(configureStore) {
    store = configureStore();
  }

 getStore() {
    return store;
  }
}

const storeProviderService = new StoreProviderService();
export { storeProviderService as StoreProviderService };
