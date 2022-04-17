import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';

import { Twitterdapp } from "../target/types/twitterdapp"

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
const { web3 } = anchor
const { SystemProgram } = web3

const assert = require("assert");
const utf8 = anchor.utils.bytes.utf8;
const provider = anchor.Provider.local()


const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
}

// Configure the client to use the local cluster.
anchor.setProvider(provider);

// @ts-ignore
const program = anchor.workspace.Twitterdapp as Program<Twitterdapp>;

let creatorKey = provider.wallet.publicKey;
let stateSigner;

const run = async () => {
    [stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode('state')],
        program.programId
    );

    try {
        const stateInfo = await program.account.stateTwitterAccount.fetch(stateSigner);
        console.log(stateInfo);
    }
    catch {
        await program.rpc.createState({
            accounts: {
                state: stateSigner,
                authority: creatorKey,
                ...defaultAccounts
            },
        })

        const stateInfo = await program.account.stateTwitterAccount.fetch(stateSigner);
        console.log(stateInfo);
        assert(stateInfo.authority.toString() === creatorKey.toString(), "State Creator is Invalid");
    }
}

run();
