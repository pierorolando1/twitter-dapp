#[path ="./tweet.rs"] mod tweet;

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};

use std::mem::size_of;

#[derive(Accounts)]
pub struct CreateReply<'info> {
    #[account(mut, seeds = [b"state".as_ref(), tweet.index.to_be_bytes().as_ref()], bump)]
    pub tweet: Account<'info, tweet::Tweet>,

    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"comment".as_ref(), tweet.index.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<Reply>() + tweet::TEXT_LENGTH + tweet::USER_NAME_LENGTH + tweet::USER_URL_LENGTH
      )]
    pub reply: Account<'info, Reply>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct Reply {
    pub authority: Pubkey,
    pub text: String,
    pub commenter_name: String,
    pub commenter_url: String,
    pub index: u64,
    pub post_time: i64,
}
