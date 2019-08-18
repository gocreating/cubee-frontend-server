import fetch from 'cross-fetch';

export default (...args) => fetch(...args).then(res => {
  if (res.status >= 400) {
    throw new Error('Bad response from server');
  }
  return res.json();
});
