export interface ListResponse {
  success: boolean;
  result: Result;
  meta: Meta;
}

export interface Result {
  grants: Grant[];
  contracts: Contract[];
  leases: Lease[];
  payments: Payment[];
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

export interface Payment {
  payment_date: string;
  payment_amt: number;
  agency_name: string;
  award_description: string;
  fain: any;
  recipient_justification: string;
  agency_lead_justification: string;
  org_name: string;
  generated_unique_award_id: any;
}

export interface Meta {
  total_results: number;
  pages: number;
}
