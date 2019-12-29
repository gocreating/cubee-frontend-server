import fetch from 'cross-fetch';
import { fromJS } from 'immutable';

export const injectCredentials = (fetchOptions = {}, accessToken) => {
  if (accessToken) {
    return fromJS(fetchOptions)
      .setIn(['headers', 'Authorization'], `Bearer ${accessToken}`)
      .toJS();
  } else {
    return fetchOptions;
  }
};

export default (...args) => fetch(...args).then(res => {
  return res.json();
});
