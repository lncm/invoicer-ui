import { baseUrl, donationDesc, invoiceDesc, expire } from './config';

export async function newInvoice(amount) {
  return (await fetch(`${baseUrl}/invoice?amount=${amount}&desc=${invoiceDesc}&expire=${expire}`)).json();
}

export async function newDonation() {
  return (await fetch(`${baseUrl}/invoice?&desc=${donationDesc}&expire=${expire}`)).json();
}

export async function awaitStatus(invoiceId) {
  return (await fetch(`${baseUrl}/status/${invoiceId}`)).json();
}

export async function getPrice() {
  return (await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=THB,USD,EUR')).json();
}
