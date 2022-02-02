-- Membuat table users
CREATE TABLE users (
    id VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    PIN INT(6) NOT NULL,
    phone VARCHAR(32),
    picture VARCHAR(128),
    role VARCHAR(32) NOT NULL DEFAULT "user",
    verified VARCHAR(32) NOT NULL DEFAULT "unverified",
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

-- Membuar table wallets
CREATE TABLE wallets (
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    amount_topup INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
);

-- Membuat table transactions
CREATE TABLE transactions (
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    receiver_name VARCHAR(64) NOT NULL,
    receiver_phone VARCHAR(64) NOT NULL,
    amount_transfer INT NOT NULL DEFAULT 0,
    notes VARCHAR(128),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL DEFAULT "Pending",
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_transaction_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
);