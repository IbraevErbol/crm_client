const API_URL = "http://localhost:3000/products";

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create product");
  } 
    
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export async function findProductById(id) {
  const res = await fetch(`${API_URL}/${id}`, {method: "GET"});
  if (!res.ok) throw new Error("Failed to get products by id");
  return res.json();
}

export async function editProductById(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update product");
  } 

  return res.json();
}

export async function salesCart(payload) {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create product");
  } 
  return res.json();
}