import { Wallet } from '@cosmos-kit/core';

import { ICON } from '../constant';

export const LedgerInfo: Wallet = {
  name: 'ledger-web-usb-hid',
  prettyName: 'Ledger',
  logo: ICON,
  mode: 'ledger',
  mobileDisabled: true,
  rejectMessage: {
    source: 'Request rejected',
  },
};
