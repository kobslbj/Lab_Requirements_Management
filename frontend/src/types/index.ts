export type Admin = {
  id: string;
  name: string;
  fab_id: string;
};

export type Fab = {
  id: string;
  name: string;
};

export type Lab = {
  id: string;
  name: string;
};

export type Worker = {
  id: string;
  name: string;
  lab_id: string;
};

export type Order = {
  id: string;
  title: string;
  description: string;
  admin: Admin;
  fab: Fab;
  lab: Lab | null;
  priority: number;
  is_completed: boolean;
};