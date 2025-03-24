import type { Subscriber } from '../types/subscriber';

// Mailchimp API types
interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
  };
}

interface MailchimpError {
  status: number;
  title: string;
  detail: string;
}

const MAILCHIMP_API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = import.meta.env.VITE_MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER_PREFIX = import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX;

const MAILCHIMP_API_URL = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0`;

async function mailchimpFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${MAILCHIMP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = data as MailchimpError;
    throw new Error(`Mailchimp API Error: ${error.title} - ${error.detail}`);
  }

  return data;
}

export async function addSubscriberToMailchimp(subscriber: Subscriber) {
  const member: MailchimpMember = {
    email_address: subscriber.email,
    status: 'pending', // Uses double opt-in
    merge_fields: {
      FNAME: subscriber.firstName || '',
    },
  };

  try {
    const response = await mailchimpFetch(`/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      body: JSON.stringify(member),
    });

    return response;
  } catch (error) {
    // If member already exists, update their information instead
    if (error instanceof Error && error.message.includes('Member Exists')) {
      return updateSubscriberInMailchimp(subscriber);
    }
    throw error;
  }
}

export async function updateSubscriberInMailchimp(subscriber: Subscriber) {
  const member: MailchimpMember = {
    email_address: subscriber.email,
    status: 'pending',
    merge_fields: {
      FNAME: subscriber.firstName || '',
    },
  };

  const subscriberHash = Buffer.from(subscriber.email.toLowerCase()).toString('hex');

  const response = await mailchimpFetch(
    `/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
    {
      method: 'PATCH',
      body: JSON.stringify(member),
    }
  );

  return response;
}

export async function removeSubscriberFromMailchimp(email: string) {
  const subscriberHash = Buffer.from(email.toLowerCase()).toString('hex');

  const response = await mailchimpFetch(
    `/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`,
    {
      method: 'DELETE',
    }
  );

  return response;
}
