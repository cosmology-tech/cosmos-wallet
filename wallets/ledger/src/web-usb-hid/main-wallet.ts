import { EndpointOptions, MainWalletBase, Wallet } from '@cosmos-kit/core';

import { LedgerChainWallet } from './chain-wallet';
import { LedgerClient } from './client';
import { TransportType } from './utils';

export class LedgerMainWallet extends MainWalletBase {
  transportType: TransportType;
  constructor(
    walletInfo: Wallet,
    preferredEndpoints?: EndpointOptions['endpoints'],
    transportType: TransportType = 'WebUSB'
  ) {
    super(walletInfo, LedgerChainWallet);
    this.preferredEndpoints = preferredEndpoints;
    this.transportType = transportType;
  }

  async initClient() {
    this.initingClient();
    try {
      this.initClientDone(new LedgerClient());
    } catch (error) {
      this.initClientError(error);
    }
  }
}
