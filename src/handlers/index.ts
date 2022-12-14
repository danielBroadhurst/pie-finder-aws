import { main } from './create-pie-store';

const event = {
  httpMethod: 'POST',
  path: '/path',
};

main(event).then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});