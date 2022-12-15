import { main } from './add-pie-store-review';

const event = {
  httpMethod: 'POST',
  path: '/path',
};

main(event).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});