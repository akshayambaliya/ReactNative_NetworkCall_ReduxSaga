import {ApiClientError} from './apiClientError';
import {
  HTTP_STATUS_CODES,
  DEFAULT_ERROR_MESSAGE,
  ERR_INTERNAL_SERVER_ERROR,
  SOMETHING_WENT_WRONG,
  NO_NETWORK,
} from './constants';
import {Logger} from '../utils/util';
import {isOfType} from '../utils/ObjectHelper';
const responseEnvelopeStatuses = ['SUCCESS', 'ERROR', 'FAILURE'];
export function successHandler(response) {
  // console.log("Response in successHandler ", response);
  // Check if the response has a body
  const responseBody = response.data;

  if (!responseBody) {
    // Would this even occur? Logging it just in case
    Logger.warn(
      `No response body for success. Response: ${JSON.stringify(response)}`,
    );

    // Return empty object to prevent null propagation
    return {};
  }

  // Check for HTTP Status Code 204
  if (HTTP_STATUS_CODES.NoContent === response.status) {
    // The response body would be empty in this case
    return {};
  }

  // Check if the response body is a JSON
  if (!isOfType('array', responseBody) && !isOfType('object', responseBody)) {
    Logger.info(typeof responseBody);
    Logger.warn(`Response is not a json. ${JSON.stringify(responseBody)}`);
  }

  // Map the response body to the response envelope
  // const responseEnvelope = responseBody as IApiResponseEnvelope;
  // if (!responseEnvelope.status || responseEnvelopeStatuses.indexOf(responseEnvelope.status.toLocaleUpperCase()) < 0) {
  //   Logger.warn(`Invalid response status in envelope: ${JSON.stringify(responseEnvelope)}`);
  // }

  // return responseEnvelope.data || {};
  return response.data || {};
}

export function errorHandler(error) {
  Logger.error('API error: ', error);

  let errorDetails = {
    message: DEFAULT_ERROR_MESSAGE,
  };

  // no network
  if (error.message && error.message === 'Network Error') {
    Logger.error(`Network Error. Error: ${JSON.stringify(error)}`);
    return new ApiClientError(NO_NETWORK, errorDetails);
  }

  // timeout
  if (error.code && 'ECONNABORTED' === error.code) {
    Logger.error(`Network Error. Error: ${JSON.stringify(error)}`);
    return new ApiClientError(NO_NETWORK, errorDetails);
  }

  // Check if response is defined on error
  if (!error.response) {
    // We don't know anything about the error
    Logger.error(
      `Don't know anything about the error. Error: ${JSON.stringify(error)}`,
    );
    return new ApiClientError(SOMETHING_WENT_WRONG, errorDetails);
  }

  const errorResponse = error.response;
  Logger.error('errorResponse ', errorResponse);

  // Look for response headers
  if (!errorResponse.headers) {
    Logger.error(`Empty response headers. Error: ${JSON.stringify(error)}`);
    return new ApiClientError(SOMETHING_WENT_WRONG, errorDetails);
  }

  // Check if the response is a JSON
  const contentType = errorResponse.headers['content-type'];
  if (!contentType || contentType.indexOf('application/json') < 0) {
    // The response content type is not correct
    Logger.error(
      `Response is not a json. Response content: ${JSON.stringify(
        errorResponse,
      )}`,
    );
    errorDetails.statusCode = errorResponse.status;
    return new ApiClientError(SOMETHING_WENT_WRONG, errorDetails);
  }

  // Check for HTTP status code
  if (errorResponse.status > 500) {
    // This may not be from the backend
    Logger.error(
      `Timeout error, possibly. Response content: ${JSON.stringify(
        errorResponse,
      )}`,
    );
    errorDetails.statusCode = errorResponse.status;
    return new ApiClientError(SOMETHING_WENT_WRONG, errorDetails);
  }

  // Check if we have the response body
  const responseBody = errorResponse.data;
  if (!responseBody) {
    Logger.error(
      `Empty response body. Response content: ${JSON.stringify(errorResponse)}`,
    );
    errorDetails.statusCode = errorResponse.status;
    return new ApiClientError(SOMETHING_WENT_WRONG, errorDetails);
  }

  // Map the response body to the response envelope
  const apiResponseEnvelope = responseBody;
  const apiResponseError = extractErrorFromResponseEnvelope(
    apiResponseEnvelope,
  );
  const errorMessage =
    apiResponseError.message === ERR_INTERNAL_SERVER_ERROR
      ? SOMETHING_WENT_WRONG
      : apiResponseError.message;
  errorDetails = {
    statusCode: errorResponse.status,
    code: apiResponseError.code || SOMETHING_WENT_WRONG,
    message: errorMessage || SOMETHING_WENT_WRONG,
    description: apiResponseError.message || '',
    errors: apiResponseError.errors || [],
  };

  return new ApiClientError(errorDetails.message, errorDetails);
}

const extractErrorFromResponseEnvelope = (envelope) => {
  if (envelope.data && envelope.data.error) {
    return envelope.data.error;
  }

  Logger.info(
    `Unable to parse error from response envelope: ${JSON.stringify(envelope)}`,
  );
  return emptyErrorType();
};

export const emptyErrorType = () => ({
  code: '',
  message: DEFAULT_ERROR_MESSAGE,
  description: '',
  errors: [],
});
