const throttle = (fn, context, delay, text1, text2) => {
  clearTimeout(fn.timeoutId);
  fn.timeoutId = setTimeout(() => {
    fn.call(context, text1, text2);
  }, delay);
};
export default throttle;
