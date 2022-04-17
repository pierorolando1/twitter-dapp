import * as anchor from "@project-serum/anchor"

import { Button } from "@nextui-org/react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes"
import { getProgramInstance } from "../features/program/api/getProgramInstance"
import { useWallet } from "@solana/wallet-adapter-react"
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token"
import { SOLANA_HOST } from "../features/program/consts"
import { createNewTweet } from "../features/tweets/api/createNew"


const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: anchor.web3.SystemProgram.programId,
}


export default () => {
    const wallet = useWallet()

    return (
        <div>
            <Button

                onClick={async () => {

                    // const connection = new anchor.web3.Connection(SOLANA_HOST)
                    // const program = getProgramInstance(connection, wallet as any)

                    // let [stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
                    //     [utf8.encode('state')],
                    //     program.programId,
                    // )

                    // let stateInfo

                    // try {
                    //     stateInfo = await program.account.stateTwitterAccount.fetch(stateSigner)
                    // } catch (error) {
                    //     await program.rpc.createState(
                    //         {
                    //             accounts: {
                    //                 state: stateSigner,
                    //                 authority: wallet.publicKey,
                    //                 ...defaultAccounts,
                    //             }
                    //         } as any
                    //     )

                    //     console.log('created state')
                    //     return
                    // }

                    try {


                        const yo = await createNewTweet(wallet as any, {
                            text: "just setting up my twitter",
                            name: "Piero Rolando",
                            url: "https://res.cloudinary.com/piero-rolando/image/upload/v1632012213/gzl88zcngp0pyirl8xbm.jpg"
                        })

                        console.log(yo)
                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                Hello World</Button>
            <WalletMultiButton />
        </div >
    )
}
