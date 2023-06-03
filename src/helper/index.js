export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
  });
};

export const scrollToElement = elementId => {
  //   setTimeout(() => {

  //   }, 3000);
  const convertId = elementId.substring(1);
  if (elementId) {
    const element = document.getElementById(`${convertId}`);
    console.log('element', element);
    element.scrollIntoView({ behavior: 'smooth' });
    //   window.scrollTo({ top: element, behavior: 'smooth' });
  }
};
