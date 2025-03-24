export interface Subscriber {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribed_at?: string;
  mailchimp_id?: string;
  status: 'pending' | 'subscribed' | 'unsubscribed';
}

export interface SubscribeFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  consent: boolean;
}
