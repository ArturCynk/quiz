const validateEmail = (email) => {
  // Prosta walidacja adresu email za pomocą wyrażenia regularnego
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = { validateEmail };
