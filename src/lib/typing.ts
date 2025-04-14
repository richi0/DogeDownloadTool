export interface ListResponseGrant {
  success: boolean;
  result: Result;
  meta: Meta;
}

export interface Result {
  grants: Grant[];
  contracts: Contract[];
  leases: Lease[];
}

export interface Grant {
  date: string;
  agency: string;
  recipient: string;
  value: number;
  savings: number;
  link?: string;
  description: string;
}

export interface Contract {
  piid: string;
  agency: string;
  vendor: string;
  value: number;
  description: string;
  fpds_status: string;
  fpds_link: string;
  deleted_date: string;
  savings: number;
}

export interface Lease {
  date: string;
  location: string;
  sq_ft: number;
  description: string;
  value: number;
  savings: number;
  agency: string;
}

export interface Meta {
  total_results: number;
  pages: number;
}
