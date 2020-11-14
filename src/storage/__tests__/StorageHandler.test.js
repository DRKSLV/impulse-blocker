import StorageHandler from '../StorageHandler';

const browser = {
  storage: {
    local: {
      get: jest.fn(),
    },
  },
};

global.browser = browser;

test('it initializes', () => {
  const storageHandler = new StorageHandler();
  const data = { impulse: ['1', '2', '3'] };

  browser.storage.local.get.mockResolvedValue(data);

  return storageHandler.getValues().then((valueComing) => {
    console.log(valueComing);
  });
});
