class StorageHandler {
  getValues() {
    return browser.storage.local.get();
  }
}

export default StorageHandler;
