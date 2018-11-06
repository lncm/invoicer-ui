// TODO remove
function setTimeoutPromise(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// TODO use real HTTP endpoints

// GET /invoice
const sampleInvoice = {
  hash: 'ca757a45577f8b8ff144615d00a34e54652b6e3aabe295c3185b8cab36573265',
  invoice: 'lnbc1pd7zfp5pp5ef6h532h079clu2yv9wspg6w23jjkm36403ftscctwx2kdjhxfjsdqqcqzysxqz958jn5my53xv2hw5r6y8yh9y5g9h46dvazm967m5wjc3y3k7vrp5tj5zx7fptg7nrzygddpd2065asm7g8cvtxe78qsczqyjutky0upacqngk5wy',
};

export async function newInvoice() {
  // sample network overhead
  await setTimeoutPromise(2000);
  // TODO test network error
  return sampleInvoice;
}

/*
GET /status/ca757a45577f8b8ff144615d00a34e54652b6e3aabe295c3185b8cab36573265
# will wait until status changes to either:
paid
# or
expired
*/

export async function awaitStatus(invoiceId) {
  console.log('checking', invoiceId);
  await setTimeoutPromise(5000);
  return ['paid', 'expired'][Math.round(Math.random())];
}
