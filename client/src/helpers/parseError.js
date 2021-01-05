const parseError = error =>
    JSON.parse(error.request.response);

export default parseError;