export type Twitterdapp = {
    "version": "0.1.0",
    "name": "twitterdapp",
    "instructions": [
        {
            "name": "createState",
            "accounts": [
                {
                    "name": "state",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createTweet",
            "accounts": [
                {
                    "name": "state",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tweet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "twitterName",
                    "type": "string"
                },
                {
                    "name": "twitterUrl",
                    "type": "string"
                }
            ]
        },
        {
            "name": "createReply",
            "accounts": [
                {
                    "name": "tweet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reply",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "commenterName",
                    "type": "string"
                },
                {
                    "name": "commenterUrl",
                    "type": "string"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "tweet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "text",
                        "type": "string"
                    },
                    {
                        "name": "posterName",
                        "type": "string"
                    },
                    {
                        "name": "posterUrl",
                        "type": "string"
                    },
                    {
                        "name": "replyCount",
                        "type": "u64"
                    },
                    {
                        "name": "index",
                        "type": "u64"
                    },
                    {
                        "name": "postTime",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "stateTwitterAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "tweetCount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "reply",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "text",
                        "type": "string"
                    },
                    {
                        "name": "commenterName",
                        "type": "string"
                    },
                    {
                        "name": "commenterUrl",
                        "type": "string"
                    },
                    {
                        "name": "index",
                        "type": "u64"
                    },
                    {
                        "name": "postTime",
                        "type": "i64"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "Empty",
            "msg": "Tweet cannot be empty"
        },
        {
            "code": 6001,
            "name": "TooLong",
            "msg": "Tweet cannot be longer than certain number of characters"
        }
    ]
};

export const IDL: Twitterdapp = {
    "version": "0.1.0",
    "name": "twitterdapp",
    "instructions": [
        {
            "name": "createState",
            "accounts": [
                {
                    "name": "state",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createTweet",
            "accounts": [
                {
                    "name": "state",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tweet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "twitterName",
                    "type": "string"
                },
                {
                    "name": "twitterUrl",
                    "type": "string"
                }
            ]
        },
        {
            "name": "createReply",
            "accounts": [
                {
                    "name": "tweet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "reply",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "text",
                    "type": "string"
                },
                {
                    "name": "commenterName",
                    "type": "string"
                },
                {
                    "name": "commenterUrl",
                    "type": "string"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "tweet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "text",
                        "type": "string"
                    },
                    {
                        "name": "posterName",
                        "type": "string"
                    },
                    {
                        "name": "posterUrl",
                        "type": "string"
                    },
                    {
                        "name": "replyCount",
                        "type": "u64"
                    },
                    {
                        "name": "index",
                        "type": "u64"
                    },
                    {
                        "name": "postTime",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "stateTwitterAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "tweetCount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "reply",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "text",
                        "type": "string"
                    },
                    {
                        "name": "commenterName",
                        "type": "string"
                    },
                    {
                        "name": "commenterUrl",
                        "type": "string"
                    },
                    {
                        "name": "index",
                        "type": "u64"
                    },
                    {
                        "name": "postTime",
                        "type": "i64"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "Empty",
            "msg": "Tweet cannot be empty"
        },
        {
            "code": 6001,
            "name": "TooLong",
            "msg": "Tweet cannot be longer than certain number of characters"
        }
    ]
};
