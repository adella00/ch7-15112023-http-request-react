export async function fetchPlaces() {
  const res = await fetch("http://localhost:3000/places");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }
  return data.message;
}
