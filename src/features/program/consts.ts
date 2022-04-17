import { clusterApiUrl, PublicKey } from '@solana/web3.js'
import twitterdapp from './twitterdapp.json'

export const CLUSTER =
    process.env.REACT_APP_CLUSTER === 'mainnet'
        ? 'mainnet'
        : process.env.REACT_APP_CLUSTER === 'testnet'
            ? 'testnet'
            : 'devnet'

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
    ? process.env.REACT_APP_SOLANA_API_URL
    : CLUSTER === 'mainnet'
        ? clusterApiUrl('mainnet-beta')
        : CLUSTER === 'testnet'
            ? clusterApiUrl('devnet')
            : 'https://api.devnet.solana.com'

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
    '98uQLNTb5sd8YieHMZ2TS4fj58g8rRC5E1cScmPA5CHj',
)

export const STABLE_POOL_IDL = twitterdapp
