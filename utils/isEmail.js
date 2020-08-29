/**
 * Check if string is email
 * @param email
 * @returns {boolean}
 */
export default email => {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};
