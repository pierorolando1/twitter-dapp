import * as anchor from '@project-serum/anchor'

import { getProgramInstance } from "../../program/api/getProgramInstance"
import { SOLANA_HOST } from "../../program/consts"

export const getAllTweets = async (wallet: anchor.Wallet) => {
    try {
        const connection = new anchor.web3.Connection(SOLANA_HOST)
        const program = getProgramInstance(connection, wallet)

        const postsData = await program.account.tweet.all()

        postsData.sort(
            (a, b) => b.account.postTime.toNumber() - a.account.postTime.toNumber(),
        )

        console.log("YO", postsData.map(p => {
            return p.account.index.toString()
        }))

        return postsData

    } catch (error) {
        console.error(error)
    }
}

