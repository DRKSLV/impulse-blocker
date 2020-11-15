const StorageHandler = {
  getStatus() {
    return browser.storage.local.get('status');
  },

  getBlockedWebsites() {
    return browser.storage.local.get('sites');
  },
};

export default StorageHandler;
