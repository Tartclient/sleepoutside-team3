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
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
