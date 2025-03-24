export type OrganizationSize = '0-10' | '11-50' | '51-100' | '101-1000' | '1000+';

export interface Subscriber {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  jobRole?: string;
  organizationSize?: OrganizationSize;
  subscribed_at?: string;
  mailchimp_id?: string;
  status: 'pending' | 'subscribed' | 'unsubscribed';
}

export interface SubscribeFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  jobRole?: string;
  organizationSize?: OrganizationSize;
  consent: boolean;
}
