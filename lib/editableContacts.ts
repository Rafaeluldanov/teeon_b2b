import { contacts } from './contacts';

export interface EditableContacts {
  companyName: string;
  descriptor: string;
  phone: string;
  phoneRaw: string;
  email: string;
  telegram: string;
  whatsapp: string;
  city: string;
  address: string;
  schedule: string;
  legalName: string;
  inn: string;
  ogrn: string;
}

export const defaultContacts: EditableContacts = {
  companyName: contacts.companyName,
  descriptor: contacts.descriptor,
  phone: contacts.phone,
  phoneRaw: contacts.phoneRaw,
  email: contacts.email,
  telegram: contacts.telegram,
  whatsapp: contacts.whatsapp,
  city: contacts.city,
  address: contacts.address,
  schedule: contacts.schedule,
  legalName: contacts.legalInfo.legalName,
  inn: contacts.legalInfo.inn,
  ogrn: contacts.legalInfo.ogrn,
};

export const CONTACTS_LS_KEY = 'teeon_admin_contacts';
