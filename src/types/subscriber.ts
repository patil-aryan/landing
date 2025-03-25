export type OrganizationSize = '0-10' | '11-50' | '51-100' | '101-1000' | '1000+';

export interface Subscriber {
  id?: string;
  email: string;
  first_name?: string;
  job_role?: string;
  organization_size?: OrganizationSize;
  created_at?: string;
  status: 'pending' | 'subscribed' | 'unsubscribed';
}

export interface SubscribeFormData {
  email: string;
  firstName: string;
  jobRole: string;
  organizationSize?: OrganizationSize;
  consent: boolean;
}
