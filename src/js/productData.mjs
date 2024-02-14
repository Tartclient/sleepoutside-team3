const baseURL = import.meta.env.VITE_SERVER_URL;
console.log(baseURL);
const baseURLTEST = "https://wdd330-backend.onrender.com/"

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  console.log("getData is here 1");
  const url = baseURL + "products/search/" + category;
  console.log(`test: ${url}`);
  const response = await fetch(url);
  console.log("getData is here 2");
  const data = await convertToJson(response);
  console.log("getData is here 3");
  return data.Result;
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
