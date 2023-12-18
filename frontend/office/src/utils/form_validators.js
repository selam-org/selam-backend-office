export const validateInteger = (_, value) => {
  const isInteger = /^[0-9]+$/.test(value);

  if (!isInteger) {
    return Promise.reject(new Error("Please enter a valid integer"));
  }

  return Promise.resolve();
};

export const validateDouble = (_, value) => {
  const isDouble = /^[0-9]+(\.[0-9]+)?$/.test(value);

  if (!isDouble) {
    return Promise.reject(new Error("Please enter a valid double"));
  }

  return Promise.resolve();
};
