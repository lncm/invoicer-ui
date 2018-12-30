import { baseUrl, donationDesc, invoiceDesc, expire } from './config';

export async function newInvoice(amount, description) {
  return (await fetch(`${baseUrl}/invoice?amount=${amount}&desc=${description}`)).json();
}

export async function newDonation() {
  return (await fetch(`${baseUrl}/invoice?&desc=${donationDesc}`)).json();
}

export async function awaitStatus(invoiceId) {
  return (await fetch(`${baseUrl}/status/${invoiceId}`)).json();
}

export async function getPrice() {
  return (await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=THB,USD,EUR')).json();
}
