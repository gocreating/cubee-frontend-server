import fetch from 'cross-fetch';

export default (...args) => fetch(...args).then(res => {
  return res.json();
});
