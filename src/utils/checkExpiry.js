const checkExpiry = (addDate, expireIn) => {
  addDate.setDate(addDate.getDate() + expireIn);
  const today = new Date();
  if (today > addDate) {
    return true;
  }
  return false;
};

module.exports = {
  checkExpiry,
};
