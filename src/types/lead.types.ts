export interface LeadResponse {
  _data:        Data;
  _fields:      string[];
  _changes:     Changes;
  created_time: string;
  field_data:   FieldDatum[];
  id:           string;
  _api:         API;
}

export interface API {
  accessToken: string;
  locale:      string;
  _debug:      boolean;
  _showHeader: boolean;
}

export interface Changes {
}

export interface Data {
  id:           string;
  created_time: string;
  field_data:   FieldDatum[];
}

export interface FieldDatum {
  name:   string;
  values: string[];
}
