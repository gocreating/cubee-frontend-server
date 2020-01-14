import { Response } from 'cubee';
import fetch from 'cross-fetch';
import { fromJS } from 'immutable';

type agent<T> = (input: RequestInfo, init?: RequestInit) => Promise<T>;
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
