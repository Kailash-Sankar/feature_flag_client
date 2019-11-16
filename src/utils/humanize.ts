/**
 *
 * @param {Object} value , returns value which is human readable.
 * Example:
 * 1 1
 * 10 10
 * 100 100
 * 1000 1 k
 * 10000 10 k
 * 100000 100 k
 * 1000000 1 M
 * 10000000 10 M
 * 100000000 100 M
 * @param {Number} value Original value.
 * @return {String} humanized representation.
 */

function humanize(value: number, unit = "") {
  let prefix;

  if (typeof value !== "number") return null;
  if (unit && unit.indexOf("fps") > -1) return value.toString();

  const num = value.toExponential(2).split("e");
  const mant = Math.round(Number(num[0]) * 100);
  const exp = Number(num[1]);

  let res = ((mant * 10 ** (exp % 3)) / 100).toString();

  if (unit === "bps") {
    prefix = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  } else {
    prefix = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];
  }

  if (exp >= -3 && exp < 0) {
    res = (Math.round(Number(value) * 1000) / 1000).toString();
  } else if (exp >= 0 && exp < 3) {
    res += "";
  } else if (exp > 0 && exp < 24) {
    res += ` ${prefix[Math.floor(exp / 3)]}`;
  } else {
    res = Number(value).toExponential(1);
  }

  return res;
}

export default humanize;
