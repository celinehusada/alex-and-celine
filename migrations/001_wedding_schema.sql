create table if not exists rooms (
  id text primary key,
  hotel text not null check (hotel in ('ritz', 'aventus')),
  nights integer not null default 2 check (nights in (1, 2)),
  occupants jsonb not null default '[]'::jsonb,
  label text,
  created_at timestamptz not null default now()
);

create table if not exists invitations (
  id text primary key,
  token text not null unique,
  party_name text not null,
  members jsonb not null default '[]'::jsonb,
  invited_events jsonb not null default '[]'::jsonb,
  room_id text references rooms (id) on delete set null,
  preview_hint text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists rsvps (
  invitation_id text primary key references invitations (id) on delete cascade,
  email text not null,
  phone text not null default '',
  responses jsonb not null default '{}'::jsonb,
  vegetarian jsonb not null default '{}'::jsonb,
  selected_events jsonb not null default '[]'::jsonb,
  dietary text not null default '',
  message text not null default '',
  stay_choice text not null default 'provided',
  updated_at timestamptz not null default now()
);

create index if not exists invitations_token_idx on invitations (token);
create index if not exists invitations_room_id_idx on invitations (room_id);
