const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;
  
    return (
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };
  
  module.exports = { validatePassword };
  