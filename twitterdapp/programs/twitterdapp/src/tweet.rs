#[path = "./state_twitter.rs"]  mod state_twitter;

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};

use std::mem::size_of;


// Post and comment text length
pub const TEXT_LENGTH: usize = 1024;
// Username length
pub const USER_NAME_LENGTH: usize = 100;
// User profile imaage url length
pub const USER_URL_LENGTH: usize = 255;

#[derive(Accounts)]
pub struct CreateTweet<'info> {
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, state_twitter::StateTwitterAccount>,

    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"post".as_ref(), state.tweet_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<Tweet>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
    )]
    pub tweet: Account<'info, Tweet>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: UncheckedAccount<'info>,

    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct Tweet {
    pub authority: Pubkey,
    pub text: String,
    pub poster_name: String,
    pub poster_url: String,
    pub reply_count: u64,
    pub index: u64,
    pub post_time: i64,
}
