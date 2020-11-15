import extensionStatus from './enums/extensionStatus';
import { redirectToBlockedPage } from './utils/functions';

class ImpulseBlocker {
  constructor(storageHandler) {
    this.storageHandler = storageHandler;
  }

  boot() {
    this.storageHandler.getStatus().then((status) => {
      if (status === extensionStatus.ON) {
        this.restartBlocker();
      } else if (status === extensionStatus.OFF) {
        // this.stopBlocker();
      } else if (status === extensionStatus.PAUSED) {
        // this.pauseBlocker();
      } else {
        // this.startBlocker();
      }
    });
  }

  restartBlocker() {
    browser.storage.onChanged.addListener(() => {
      this.restartBlocker();
    });

    console.log('here');

    const websites = this.getDomainsToBlock();

    browser.webRequest.onBeforeRequest.removeListener(redirectToBlockedPage);

    if (websites.length > 0) {
      browser.webRequest.onBeforeRequest.addListener(
        redirectToBlockedPage,
        { urls: websites, types: ['main_frame'] },
        ['blocking'],
      );
    }

    this.setIcon('icons/icon96.png');
  }

  getDomainsToBlock() {
    return this.storageHandler.getBlockedWebsites().then((sites) => sites.map((website) => `*://*.${website.domain}/*`));
  }
}

export default ImpulseBlocker;
