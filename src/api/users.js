import { sendRequest } from './index';
const requestUrl = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';

export const getUsers = () => {
  return sendRequest(requestUrl);
};
