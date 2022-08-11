import {
  beginConnection,
  cleanupAfterConnection,
  connectToWallet,
  CosmosWalletState,
  CosmosWalletStatus,
  disconnect,
  initialize,
  reset,
  stopConnecting,
} from '@cosmos-wallet/core'
import React, { useEffect, useMemo, useState } from 'react'

import { WalletManagerProviderProps } from '../types'
import {
  EnablingWalletModal,
  SelectWalletModal,
  WalletConnectModal,
} from './ui'
import { WalletManagerContext } from './WalletManagerContext'

export const WalletManagerProvider = ({
  children,
  classNames,
  closeIcon,
  renderLoader,
  ...config
}: WalletManagerProviderProps) => {
  const [coreState, setCoreState] = useState<CosmosWalletState>()

  // Initialize on mount.
  useEffect(() => {
    initialize(config, [setCoreState])
    // Only initialize once, on mount. Not everytime the config props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Memoize context data.
  const value = useMemo(
    () =>
      coreState && {
        ...coreState,
        connect: beginConnection,
        disconnect,
        connected: coreState.status === CosmosWalletStatus.Connected,
      },
    [coreState]
  )

  // TODO: Improve initialization step/loader.
  if (!value) {
    return null
  }

  return (
    <WalletManagerContext.Provider value={value}>
      {children}

      {coreState.displayingPicker && (
        <SelectWalletModal
          classNames={classNames}
          closeIcon={closeIcon}
          isOpen
          onClose={stopConnecting}
          selectWallet={connectToWallet}
          wallets={config.enabledWallets}
        />
      )}
      {coreState.walletConnectQrUri && (
        <WalletConnectModal
          classNames={classNames}
          closeIcon={closeIcon}
          isOpen
          onClose={() => disconnect().finally(cleanupAfterConnection)}
          reset={reset}
          uri={coreState.walletConnectQrUri}
          deeplinkFormats={
            coreState.connectingWallet?.walletConnectDeeplinkFormats
          }
        />
      )}
      {coreState.enablingWallet && (
        <EnablingWalletModal
          classNames={classNames}
          closeIcon={closeIcon}
          isOpen
          onClose={stopConnecting}
          renderLoader={renderLoader}
          reset={reset}
        />
      )}
    </WalletManagerContext.Provider>
  )
}
