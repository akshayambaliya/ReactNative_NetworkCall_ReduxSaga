class ApiClientError extends Error {
  constructor(m, details) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiClientError.prototype);

    this.details = details;
  }

  toString() {
    return JSON.stringify(this.details);
  }
}

// @ts-ignore
export {ApiClientError};
