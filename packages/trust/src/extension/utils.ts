import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types';

const error = new Error('No keplr extension installed!');

interface Trust {
  cosmos?: Keplr
}

interface TrustWindow {
  trustwallet?: Keplr;
}

export const getTrustWallet: () => Promise<
  Keplr | undefined
> = async () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const trustwallet = ((window as TrustWindow).trustwallet as Trust).cosmos;

  if (trustwallet) {
    return trustwallet;
  }

  if (document.readyState === 'complete') {
    if (trustwallet) {
      return trustwallet;
    } else {
      throw error;
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        if (trustwallet) {
          resolve(trustwallet);
        } else {
          reject(error.message);
        }
        document.removeEventListener('readystatechange', documentStateChange);
      }
    };

    document.addEventListener('readystatechange', documentStateChange);
  });
};