import { baseUrl } from './config';

export async function newInvoice(amount, description) {
  const url = `${baseUrl}/payment`;
  const data = { amount: parseInt(amount, 10), description: `${description}` };

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  // TODO handle error
  // .then(response => console.log('Success:', JSON.stringify(response)))
  // .catch(error => console.error('Error:', error));
}

// TODO support donations
// export async function newDonation(donationDesc) {
//   return (await fetch(`${baseUrl}/payment/?&desc=${donationDesc}`)).json();
// }

export async function awaitStatus(hash, address) {
  return (await fetch(`${baseUrl}/payment?hash=${hash}&address=${address}`)).json();
}

export async function getPrice() {
  return (await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=THB,USD,EUR')).json();
}

export async function getHistory() {
  return (await fetch(`${baseUrl}/history`)).json();
}
