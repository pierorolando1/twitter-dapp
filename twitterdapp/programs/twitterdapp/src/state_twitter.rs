use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};

use std::mem::size_of;

#[derive(Accounts)]
pub struct CreateTwitterState<'info> {
    // Authenticating state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateTwitterAccount>() + 7
    )]
    pub state: Account<'info, StateTwitterAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StateTwitterAccount {
    pub authority: Pubkey,
    pub tweet_count: u63,
}
