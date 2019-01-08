import { baseUrl, donationDesc, invoiceDesc, expire } from './config';

export async function newInvoice(amount, description, bitcoinQRCode, lightningQRCode) {
  let fetchString;
  if (bitcoinQRCode && lightningQRCode) {
    fetchString = `${baseUrl}/payment/invoice?amount=${amount}&desc=${description}`;
  } else if (bitcoinQRCode) {
    fetchString = `${baseUrl}/payment/btc/invoice?amount=${amount}&desc=${description}`;
  } else if (lightningQRCode) {
    fetchString = `${baseUrl}/payment/ln/invoice?amount=${amount}&desc=${description}`;
  } else {
      // TODO handle error
  }

  return (await fetch(fetchString)).json();
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

export async function getHistory() {
  return (await fetch(`${baseUrl}/history`)).json();
}
