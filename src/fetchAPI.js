import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://my-json-server.typicode.com/khalidlad888/JSONserver/products"
    );
    const products = response.data;

    return products;
  } catch (err) {
    console.log("Error in fetching", err);
  }
};
