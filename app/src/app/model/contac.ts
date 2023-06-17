export class Contact {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  category: ContactCategory = ContactCategory.FAMILY;
}

export enum ContactCategory {
  FRIEND = "Friend",
  FAMILY = "Family"
}
