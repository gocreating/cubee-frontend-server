import fetch from 'cross-fetch';
import { fromJS } from 'immutable';

interface Response {
  code: number;
  data: {
    message?: string;
  };
}

type agent<Response> = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type injectCredentials = (fetchOptions: RequestInit, accessToken?: string) => RequestInit;

export const injectCredentials: injectCredentials = (fetchOptions = {}, accessToken) => {
  if (accessToken) {
    return fromJS(fetchOptions)
      .setIn(['headers', 'Authorization'], `Bearer ${accessToken}`)
      .toJS();
  } else {
    return fetchOptions;
  }
};

const agent: agent<Response> = async (input, init?) => {
  const res = await fetch(input, init);
  return res.json();
};

export default agent;
