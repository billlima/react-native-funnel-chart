import { Dimensions } from 'react-native';

/**
 * Author: https://gist.github.com/mjackson/5311256
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
const hslToRgb = (h: number, s: number, l: number) => {
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)}`;
};

/**
 * Get rainbow colors array
 *
 * @param   Number  length  number of colors
 * @return  Array           Array of strings with rgb colors like ["rgb(123,123,123)",...]
 */
const getColors = (length: number = 20) => {
  const hueGradient = Array.from({ length }, (_v, k) => k / (length - 1));
  const saturation = 1.0;
  const lightness = 0.5;
  return hueGradient.map(
    (hue) => `rgb(${hslToRgb(hue, saturation, lightness)})`
  );
};

/**
 * Get witdh of window
 *
 * @param   Number  value   preferredWidth
 * @return  Number          width of screen
 */
const getWidth = (value?: number) => {
  let width = Dimensions.get('window').width;

  if (!value) {
    return width;
  }
  return width < value ? width : value;
};

export const getPercent = (value: number, max: number) => (100 * value) / max;
export const getValueFromPercent = (percent: number, max: number) =>
  (percent * max) / 100;

/**
 * Calc and return two points of the SVG Polygon.
 *
 * @param   Number    maxWidth    Max width of all polygon
 * @param   Number    value       Value percent of item
 * @param   Number    yValue      Y value for each point
 * @param   boolean?  inverted    flip the points horizontally
 * @return  String                Two points like '0,0 102,0'
 */
const get2HorizontallyPointsSvg = (
  maxWidth: number,
  value: number,
  yValue: number,
  inverted: boolean = false
) => {
  const x1 = maxWidth / 2 - value / 2;
  const x2 = maxWidth / 2 + value / 2;
  return `${inverted ? x2 : x1},${yValue} ${inverted ? x1 : x2},${yValue}`;
};

const utils = {
  getColors,
  getWidth,
  getPercent,
  getValueFromPercent,
  get2HorizontallyPointsSvg,
};

export default utils;
