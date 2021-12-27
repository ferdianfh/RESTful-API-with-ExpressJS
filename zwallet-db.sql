-- Membuat Database zwallet
CREATE DATABASE zwallet;

-- Menggunakan Database zwallet;
USE zwallet;

-- Membuat Table users
CREATE TABLE users (
    id VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    phone VARCHAR(32),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

ALTER TABLE users
MODIFY first_name VARCHAR(64);

ALTER TABLE users
MODIFY last_name VARCHAR(64);

ALTER TABLE users
MODIFY phone VARCHAR(32);

-- INSERT INTO users (id, username, email, first_name, last_name, phone)
-- VALUES (2990001, 'lalaretro', 'lalaretro@gmail.com', 'Lala', 'Retro', '023299292292');

-- Membuat Table wallets
CREATE TABLE wallet (
    id VARCHAR(64) NOT NULL,
    user_ID VARCHAR(64) NOT NULL,
    PIN VARCHAR(64) NOT NULL DEFAULT '123456',
    topup INT(20) NOT NULL DEFAULT 0,
    balance INT(20) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY id_user_unique (user_ID),
    CONSTRAINT fk_user_wallet
        FOREIGN KEY (user_ID) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE wallet
MODIFY PIN VARCHAR(64) NOT NULL DEFAULT '123456';
-- INSERT INTO wallet (id, id_user, balance)
-- VALUES (120001, 2990001, 120000);

-- Membuat Table transaction
CREATE TABLE transaction (
    id VARCHAR(64) NOT NULL,
    wallet_ID VARCHAR(64) NOT NULL,
    phone_receiver VARCHAR(32) NOT NULL,
    amount_transfer INT(20) NOT NULL DEFAULT 0,
    notes TEXT,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet_transaction
        FOREIGN KEY (wallet_ID) REFERENCES wallet (id)
            ON DELETE CASCADE ON UPDATE RESTRICT
);


-- Join tables
SELECT wallet.id_user, users.email, transaction.wallet_ID, transaction.phone_receiver, amount_transfer, transaction.notes, transaction.date
FROM wallet
JOIN users ON (wallet.id_user = users.id)
JOIN transaction ON (transaction.wallet_ID = wallet.id);

-- Details Account 
SELECT users.id, users.email, users.phone, wallet.id, wallet.balance, wallet.balance
FROM users
JOIN wallet ON (user.id = wallet.user_ID);