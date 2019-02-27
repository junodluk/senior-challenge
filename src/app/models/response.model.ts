export type ResponseDataNotLoaded = {
  state: 'notLoaded';
};

export type ResponseDataLoading = {
  state: 'loading';
};

export type ResponseDataOk<T> = {
  state: 'ok';
  data: T;
};

export type ResponseDataError = {
  state: 'error';
  error: number;
};

export type ResponseData<T> =
  ResponseDataNotLoaded |
  ResponseDataLoading |
  ResponseDataOk<T> |
  ResponseDataError;

export function isResponseDataOk<T>(responseData: ResponseData<T>): responseData is ResponseDataOk<T> {
  return responseData.state === 'ok';
}

export function isResponseDataError<T>(responseData: ResponseData<T>): responseData is ResponseDataError {
  return responseData.state === 'error';
}

export function isResponseDataLoading<T>(responseData: ResponseData<T>): responseData is ResponseDataLoading {
  return responseData.state === 'loading';
}
