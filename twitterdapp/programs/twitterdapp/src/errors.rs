use anchor_lang::prelude::*;

#[error_code]
pub enum TweetErrors {
    #[msg("Tweet cannot be empty")]
    Empty,
    #[msg("Tweet cannot be longer than certain number of characters")]
    TooLong,
}
