export const titleHeader = (value) => {
  if (value === 1) {
    return "Bonus";
  } else if (value === 2) {
    return "Wallet";
  } else {
    return "Income";
  }
};
