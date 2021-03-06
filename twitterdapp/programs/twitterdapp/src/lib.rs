use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("98uQLNTb5sd8YieHMZ2TS4fj58g8rRC5E1cScmPA5CHj");

// Post and comment text length
pub const TEXT_LENGTH: usize = 2024;
// Username length
pub const USER_NAME_LENGTH: usize = 100;
// User profile imaage url length
pub const USER_URL_LENGTH: usize = 255;

#[program]
pub mod twitterdapp {
    use super::*;

    pub fn create_state(ctx: Context<CreateTwitterState>) -> ProgramResult {
        // Get state from context
        let state = &mut ctx.accounts.state;
        // Save authority to state
        state.authority = ctx.accounts.authority.key();
        // Set post count as 0 when initializing
        state.tweet_count = 0;
        Ok(())
    }

    pub fn create_tweet(
        ctx: Context<CreateTweet>,
        text: String,
        twitter_name: String,
        twitter_url: String,
    ) -> ProgramResult {
        // Get state from context
        let state = &mut ctx.accounts.state;

        // Get tweet from context
        let tweet = &mut ctx.accounts.tweet;

        tweet.authority = ctx.accounts.authority.key();
        tweet.text = text;
        tweet.poster_name = twitter_name;
        tweet.poster_url = twitter_url;
        tweet.reply_count = 0;
        tweet.index = state.tweet_count;
        tweet.post_time = ctx.accounts.clock.unix_timestamp;
        state.tweet_count += 1;

        Ok(())
    }

    pub fn create_reply(
        ctx: Context<CreateReply>,
        text: String,
        commenter_name: String,
        commenter_url: String,
    ) -> ProgramResult {
        let tweet = &mut ctx.accounts.tweet;
        let reply = &mut ctx.accounts.reply;
        reply.authority = ctx.accounts.authority.key();
        reply.text = text;
        reply.commenter_name = commenter_name;
        reply.commenter_url = commenter_url;
        reply.index = tweet.reply_count;
        reply.post_time = ctx.accounts.clock.unix_timestamp;

        tweet.reply_count += 1;

        Ok(())
    }
}

// TWEET

#[derive(Accounts)]
pub struct CreateTweet<'info> {
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateTwitterAccount>,

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

    /// CHECK: This is not dangerous because
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
// END TWEET

// STATE
#[derive(Accounts)]
pub struct CreateTwitterState<'info> {
    // Authenticating state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateTwitterAccount>() + 8
    )]
    pub state: Account<'info, StateTwitterAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: This is not dangerous because
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StateTwitterAccount {
    pub authority: Pubkey,
    pub tweet_count: u64,
}
// END STATE

// REPLY
#[derive(Accounts)]
pub struct CreateReply<'info> {
    #[account(mut, seeds = [b"state".as_ref(), tweet.index.to_be_bytes().as_ref()], bump)]
    pub tweet: Account<'info, Tweet>,

    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"comment".as_ref(), tweet.index.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<Reply>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
      )]
    pub reply: Account<'info, Reply>,

    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: This is not dangerous because
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
