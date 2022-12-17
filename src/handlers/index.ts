import { main } from './get-pie-stores';

// const createPieStoreEvent = {
//   body: {
//     storeName: 'A New Pie Store',
//     pieStoreSlug: 'the-new-pie-store',
//     storeAddress: {
//       address: ['Pie Store Road'],
//       country: 'Pie Land',
//       postalCode: 'PIE CODE',
//     },
//   },
//   httpMethod: 'POST',
//   path: '/path',
// };

const getPieStoresEvent = {
  body: {},
  httpMethod: 'GET',
  path: '/pie-stores',
};

main(getPieStoresEvent).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});