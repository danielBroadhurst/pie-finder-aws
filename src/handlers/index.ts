import { main } from './get-pie-stores';

const event = {
  httpMethod: 'GET',
  path: '/path',
};

main(event).then((response) => {
  console.log(JSON.stringify(response, null, 4));
}).catch((error) => {
  console.error(error);
});