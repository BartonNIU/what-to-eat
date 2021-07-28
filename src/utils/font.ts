export const getRandomFontSize = () => {
  return (
    Math.ceil(
      (Math.random() * window.innerWidth) / (window.innerWidth > 500 ? 50 : 30)
    ) + 10
  );
};
