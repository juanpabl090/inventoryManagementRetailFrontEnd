export interface Contact {
  id: number;
  phone: string;
  email: string;
  address: string;
}

export interface ContactRequest {
  id?: number;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ContactResponse {
  id: number;
  phone: string;
  email: string;
  address: string;
}