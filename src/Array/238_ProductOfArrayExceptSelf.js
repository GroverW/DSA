var productExceptSelf = function (nums) {
  const products = [...nums];

  for (let i = products.length - 2; i >= 1; i -= 1) {
    products[i] *= products[i + 1];
  }

  products[0] = products[1];
  let leftProduct = nums[0];

  for (let i = 1; i < products.length - 1; i += 1) {
    products[i] = leftProduct * products[i + 1];
    leftProduct *= nums[i];
  }

  products[products.length - 1] = leftProduct;

  return products;
};