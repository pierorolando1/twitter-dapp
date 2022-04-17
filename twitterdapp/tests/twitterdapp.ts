import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Twitterdapp } from '../target/types/twitterdapp';

const utf8 = anchor.utils.bytes.utf8;


const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: anchor.web3.SystemProgram.programId,
}


describe('twitterdapp', () => {

    // Configure the client to use the local cluster.
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    let creatorKey = provider.wallet.publicKey;

    //@ts-ignore
    const program = anchor.workspace.Twitterdapp as Program<Twitterdapp>;

    let stateSigner;

    it('Is initialized!', async () => {

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

            if (stateInfo.authority.toString() !== creatorKey.toString()) console.log("State Creator is Invalid");
        }

        // Add your test here.
        const tx = await program.rpc.createState({});
        console.log("Your transaction signature", tx);
    });
});
