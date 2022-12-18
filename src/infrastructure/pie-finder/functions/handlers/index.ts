import { main as getPieStore } from './get-pie-store';
import { main as getPieStores } from './get-pie-stores';

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

getPieStores(getPieStoresEvent).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});

const getPieStoreEvent = {
  body: {
    pieStoreSlug: 'the-new-pie-store',
  },
  httpMethod: 'GET',
  path: '/pie-store',
};

getPieStore(getPieStoreEvent).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});