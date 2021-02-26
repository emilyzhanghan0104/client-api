const randomGenerator = (length) => {
  let random = "";
  for (let i = 0; i < length; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return random;
};

module.exports = {
  randomGenerator,
};
