import axios from "axios";
import { config } from "./config";

import QueryString from 'qs';
import qs from 'qs';

type SerializeParams = {
  params: Record<string, unknown>;
  options?: QueryString.IStringifyOptions;
};

export const serialize = ({params, options}: SerializeParams) => {
  return qs.stringify(params, {
    arrayFormat: 'brackets',
    encode: false,
    skipNulls: true,
    filter: (_, value) => {
      if (value === '' || JSON.stringify(value) === '{}') return;
      return value;
    },
    ...options,
  });
};

export const api = axios.create({
    baseURL: config.apiURL,
    headers: {},
    paramsSerializer: {
      serialize: params => serialize({params}),
    },
  });
  