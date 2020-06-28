/**
 * Pause async function.
 * @param ms
 * @returns {Promise<unknown>}
 */
export default (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
