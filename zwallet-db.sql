-- Membuat Database zwallet
CREATE DATABASE zwallet;

-- Menggunakan Database zwallet;
USE zwallet;

-- Membuat Table users
CREATE TABLE users (
    id INT(10) AUTO_INCREMENT NOT NULL,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

INSERT INTO users (id, username, email, first_name, last_name, phone)
VALUES (2990001, 'lalaretro', 'lalaretro@gmail.com', 'Lala', 'Retro', '023299292292');

-- Membuat Table wallets
CREATE TABLE wallet (
    id INT(10) AUTO_INCREMENT NOT NULL,
    id_user INT(10) NOT NULL,
    balance INT(20) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY id_user_unique (id_user),
    CONSTRAINT fk_user_wallet
        FOREIGN KEY (id_user) REFERENCES users (id)
);


-- Membuat Table transaction
CREATE TABLE transaction (
    id INT(10) AUTO_INCREMENT NOT NULL,
    id_wallet_sender INT(10) NOT NULL,
    id_wallet_receiver INT(10) NOT NULL,
    amount_transfer INT(15) NOT NULL,
    notes TEXT,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_wallet_transaction
        FOREIGN KEY (id_wallet_sender) REFERENCES wallet (id)
);