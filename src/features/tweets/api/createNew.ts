
import * as anchor from "@project-serum/anchor"
import { getProgramInstance } from "../../program/api/getProgramInstance"
import { SOLANA_HOST } from "../../program/consts"


const defaultAccounts = {
    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: anchor.web3.SystemProgram.programId,
}

export const createState = async (wallet: anchor.Wallet) => {

    const connection = new anchor.web3.Connection(SOLANA_HOST)
    const program = getProgramInstance(connection, wallet as any)

    let [stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('state')],
        program.programId,
    )

    try {
        return {
            stateSigner,
            stateInfo: await program.account.stateTwitterAccount.fetch(stateSigner)
        }
    } catch (error) {
        await program.rpc.createState(
            {
                accounts: {
                    state: stateSigner,
                    authority: wallet.publicKey,
                    ...defaultAccounts,
                }
            } as any
        )

        console.log('created state')

        throw new Error('The state has been created')
    }

}

// TODO: improve this
export const createNewTweet = async (wallet: anchor.Wallet, { text, name, url }: { text: string, name: string, url: string }) => {
    const connection = new anchor.web3.Connection(SOLANA_HOST)
    const program = getProgramInstance(connection, wallet as any)

    let stateInfo_;
    let stateSigner_;

    try {
        const { stateInfo, stateSigner } = await createState(wallet)
        stateInfo_ = stateInfo
        stateSigner_ = stateSigner
    } catch (error) {
        const { stateInfo, stateSigner } = await createState(wallet)
        stateInfo_ = stateInfo
        stateSigner_ = stateSigner
    }


    let [tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('post'), stateInfo_.tweetCount.toArrayLike(Buffer, 'be', 8)],
        program.programId,
    )

    try {
        await program.account.tweet.fetch(tweetSigner)
    } catch {
        await program.rpc.createTweet(text, name, url, {
            accounts: {
                state: stateSigner_,
                tweet: tweetSigner,
                authority: wallet.publicKey,
                ...defaultAccounts,
            },
        })

        return (await program.account.tweet.all())
            .sort((a, b) => b.account.postTime.toNumber() - a.account.postTime.toNumber())
    }
}
