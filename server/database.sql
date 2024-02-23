CREATE DATABASE reciper;

-- download extension for uuid

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    owned_ingredients VARCHAR(65535),
    favorite_recipes VARCHAR(65535)
);

-- insert fake user
INSERT INTO users (user_name, user_email, user_password) VALUES ('bobae', 'bobaefc@gmail.com', 'chlqhqo1');