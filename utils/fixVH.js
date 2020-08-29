export default () => {
  const wH = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('resize', wH);
  window.addEventListener('orientationchange', wH);
  wH();
}
