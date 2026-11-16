alter table invitations
  add column if not exists is_demo boolean not null default false;
