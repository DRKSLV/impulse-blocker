import extensionStatus from '../enums/extensionStatus';
import ImpulseBlocker from '../ImpulseBlocker';
import storageHandler from '../storage/StorageHandler';

const browser = {};

global.browser = browser;

test('it fetches status during boot', () => {
  storageHandler.getStatus = jest.fn(() => Promise.resolve('some value'));

  const impulseBlocker = new ImpulseBlocker(storageHandler);
  impulseBlocker.boot();

  expect(storageHandler.getStatus.mock.calls.length).toBe(1);
});

test('it can restart the blocker if the status is ON', () => {
  storageHandler.getStatus = jest.fn(() => Promise.resolve(extensionStatus.ON));
  storageHandler.getBlockedWebsites = jest.fn(() => Promise.resolve([]));

  const impulseBlocker = new ImpulseBlocker(storageHandler);
  impulseBlocker.boot();

  expect(storageHandler.getBlockedWebsites.mock.calls.length).toBe(1);
});
