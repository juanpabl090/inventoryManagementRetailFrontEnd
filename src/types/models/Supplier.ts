import type { Contact, ContactRequest, ContactResponse } from "./Contact";

export interface Supplier {
  id: number;
  name: string;
  contact?: Contact;
}

export interface SupplierResponse {
  id: number;
  name: string;
  contact?: ContactResponse;
}

export interface SupplierRequest {
  id?: number;
  name?: string;
  contact?: ContactRequest;
}
