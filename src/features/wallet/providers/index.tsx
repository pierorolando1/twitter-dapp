import { FC, useMemo } from "react"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import { LedgerWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, SolletExtensionWalletAdapter, SolletWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"

const WalletConnectionProvider: FC<{ children: any }> = ({ children }) => {
    const endpoint = useMemo(() => 'https://api.devnet.solana.com', [])
    const network = WalletAdapterNetwork.Devnet;

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network }),
    ], [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletConnectionProvider
