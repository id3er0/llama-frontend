/**
 * Trim string
 * @param t
 * @returns {String}
 */
export default t => {
  return `${t}`.replace(/[^а-яА-Яa-zA-Z0-9]/g, '').toLowerCase();
}
