import { main } from './create-pie-store';

const event = {
  body: {
    storeName: 'A New Pie Store',
    pieStoreSlug: 'the-new-pie-store',
    storeAddress: {
      address: ['Pie Store Road'],
      country: 'Pie Land',
      postalCode: 'PIE CODE',
    },
  },
  httpMethod: 'POST',
  path: '/path',
};

main(event).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});