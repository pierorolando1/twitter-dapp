import * as anchor from '@project-serum/anchor'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { STABLE_POOL_IDL, STABLE_POOL_PROGRAM_ID } from '../consts'
import { Twitterdapp } from './types'

export function getProgramInstance(connection: anchor.web3.Connection, wallet: anchor.Wallet) {
    if (!wallet.publicKey) throw new WalletNotConnectedError()

    const provider = new anchor.Provider(
        connection,
        wallet,
        anchor.Provider.defaultOptions(),
    )

    const idl = STABLE_POOL_IDL as anchor.Idl
    const programId = STABLE_POOL_PROGRAM_ID
    const program = new anchor.Program(idl, programId, provider)

    // @ts-ignore
    return program as anchor.Program<Twitterdapp>
}
