const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL1 = "https://wdd330-backend.onrender.com/"

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const url = baseURL1 + "products/search/" + category;
  const response = await fetch(url);
  console.log(response);
  const data = await convertToJson(response);
  console.log(data);
  return data.Result;
}

export async function findProductById(category, id) {
  const products = await getData(category);
  console.log(`products: ${products}`);
  console.log(products);
  return products.find((item) => item.Id === id);
}
