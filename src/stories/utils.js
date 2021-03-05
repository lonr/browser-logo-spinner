export function setAttrs(ele, attrs) {
  const { loading, width, delay, fasterRate } = attrs;
  if (loading) {
    ele.setAttribute("loading", "");
  } else {
    ele.removeAttribute("loading");
  }
  ele.style.width = width;
  ele.setAttribute("delay", "" + delay);
  ele.setAttribute("faster-rate", "" + fasterRate);
}
