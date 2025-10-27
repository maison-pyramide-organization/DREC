const formatPrice = (price) => {
  if (!price) return "Price Upon Request";

  if (price > 500) return `AED ${price}/Year`;
  else return `AED ${price}/sq. ft.`;
};
export default formatPrice;
