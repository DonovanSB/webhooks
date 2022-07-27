export interface Entry {
  id: string;
  time: number;
  changes: Change[];
}

export interface Change {
  value: Value;
  field: string;
}

export interface Value {
  created_time: number;
  leadgen_id: string;
  page_id: string;
  form_id: string;
}
