drop database if exists js_playground;
create database js_playground;

create type auth_provider as enum ('google', 'facebook', 'twitter');
create type user_role as enum ('admin', 'user');

drop table if exists users;

create table users (
    id serial primary key,
    name text not null,
    auth_provider auth_provider not null,
    auth_id text not null,
    user_role user_role not null,
    created timestamptz not null default now()
)
