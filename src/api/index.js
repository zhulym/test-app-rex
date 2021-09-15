export const sendRequest = async (
  requestUrl,
  method = 'GET',
  body = {},
  headers = {},
) => {
  const options = {
    method,
    headers: {
      ...headers,
    }
  };

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(requestUrl, options);

  const contentType = response.headers.get('Content-Type');

  if (contentType.includes('application/json')) {
    return await response.json();
  }

  throw new Error('Unexpected content type');
};