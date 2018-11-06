import { baseUrl, description } from './config';

export async function newInvoice() {
  return (await fetch(`${baseUrl}/invoice?desc=${description}`)).json();
}

export async function awaitStatus(invoiceId) {
  return (await fetch(`${baseUrl}/status/${invoiceId}`)).json();
}
