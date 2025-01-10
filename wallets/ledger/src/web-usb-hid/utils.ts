import Cosmos from '@ledgerhq/hw-app-cosmos';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { chains } from 'chain-registry';

export type TransportType = 'WebUSB' | 'WebHID';

export async function getCosmosApp(type: TransportType = 'WebUSB') {
  if (type === 'WebUSB') {
    return new Cosmos(await TransportWebUSB.create());
  }
  if (type === 'WebHID') {
    return new Cosmos(await TransportWebHID.create());
  }
  throw new Error(`Unknown transport type: ${type}`);
}

export function getCosmosPath(accountIndex = 0) {
  return `44'/118'/${accountIndex}'/0/0`;
}

export const ChainIdToBech32Prefix = {} as { [k: string]: string };
for (const chain of chains) {
  ChainIdToBech32Prefix[chain.chain_id] = chain.bech32_prefix;
}
