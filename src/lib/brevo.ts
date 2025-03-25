import type { Subscriber } from '../types/subscriber';

// Brevo API types
interface BrevoContact {
  email: string;
  attributes: {
    FIRSTNAME?: string;
    JOBROLE?: string;
    ORGSIZE?: string;
  };
  listIds?: number[];
  emailBlacklisted?: boolean;
  updateEnabled?: boolean;
}

interface BrevoEmailParams {
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  sender: { name: string; email: string };
}

interface BrevoError {
  code: string;
  message: string;
}

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_LIST_ID = Number(import.meta.env.VITE_BREVO_LIST_ID); // Optional: if you want to add contacts to a specific list

const BREVO_API_URL = 'https://api.brevo.com/v3';

async function brevoFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BREVO_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as BrevoError;
    throw new Error(`Brevo API Error: ${error.message}`);
  }

  // For DELETE requests, return empty object as Brevo returns no content
  if (response.status === 204) {
    return {};
  }

  return response.json();
}

export async function addSubscriberToBrevo(subscriber: Subscriber) {
  const contact: BrevoContact = {
    email: subscriber.email,
    attributes: {
      FIRSTNAME: subscriber.first_name || '',
      JOBROLE: subscriber.job_role || '',
      ORGSIZE: subscriber.organization_size || '',
    },
    listIds: BREVO_LIST_ID ? [BREVO_LIST_ID] : undefined,
    updateEnabled: true,
    emailBlacklisted: false
  };

  try {
    const contactResponse = await brevoFetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });

    return contactResponse;
  } catch (error) {
    // If contact already exists, update their information
    if (error instanceof Error && error.message.includes('Contact already exist')) {
      await updateSubscriberInBrevo(subscriber);
      return;
    }
    throw error;
  }
}

export async function updateSubscriberInBrevo(subscriber: Subscriber) {
  const contact = {
    attributes: {
      FIRSTNAME: subscriber.first_name || '',
      JOBROLE: subscriber.job_role || '',
      ORGSIZE: subscriber.organization_size || '',
    },
    listIds: BREVO_LIST_ID ? [BREVO_LIST_ID] : undefined,
    emailBlacklisted: false
  };

  const response = await brevoFetch(`/contacts/${subscriber.email}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  });

  return response;
}

export async function removeSubscriberFromBrevo(email: string) {
  const response = await brevoFetch(`/contacts/${email}`, {
    method: 'DELETE',
  });

  return response;
}
