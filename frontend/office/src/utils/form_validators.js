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
    return Promise.reject(new Error("Please enter a valid number"));
  }

  return Promise.resolve();
};

export const validatePercent = (_, value) => {
  const isPercent = /^(100(\.0{1,2})?|[0-9]{0,2}(\.[0-9]{1,2})?)$/.test(value);

  if (!isPercent) {
    return Promise.reject(new Error("Please enter a valid percentage"));
  }

  return Promise.resolve();
};
