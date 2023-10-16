CREATE DATABASE ekologo;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('nik', 'nik@mail.com', 'geslonik');
INSERT INTO users (user_name, user_email, user_password) VALUES ('nik', 'nik@gmail.com', '$2b$10$xsKNmJGrMSRQXRrQ/FndqOyMwQQkcG9TpZGD9cRO1PUJkGW9Q1PDm');

CREATE TABLE garbage_types(
    gt_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    gt_tk_id BIGINT NOT NULL UNIQUE,
    gt_type  VARCHAR(255) NOT NULL
);

INSERT INTO garbage_types (gt_tk_id, gt_type) VALUES ('1', 'PAPIR');
INSERT INTO garbage_types (gt_tk_id, gt_type) VALUES ('2', 'PLASTIKA');
INSERT INTO garbage_types (gt_tk_id, gt_type) VALUES ('3', 'STEKLO');
INSERT INTO garbage_types (gt_tk_id, gt_type) VALUES ('4', 'BIOLOŠKI');
INSERT INTO garbage_types (gt_tk_id, gt_type) VALUES ('5', 'MEŠANI');

CREATE TABLE garbage_documents(
    gd_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    gd_date TIMESTAMP NOT NULL,
    gd_type BIGINT NOT NULL,
    gd_weight DECIMAL NOT NULL,
    gd_comment VARCHAR(255) NOT NULL,
    gd_responsible VARCHAR(255) NOT NULL 
);

ALTER TABLE garbage_documents ADD CONSTRAINT FK_TYPE_ON_DOCUMENT FOREIGN KEY (gd_type) REFERENCES garbage_types (gt_tk_id);
