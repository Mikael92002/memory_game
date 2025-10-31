const API_KEY = "V1WQYkGk19EwKqIcgLJhVOLEhwZibuFF";

export async function getGifs(query, numOfGifs) {
  try {
    const search = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&limit=${numOfGifs}`;
    const response = await fetch(search);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    alert("Error! " + error);
    return 404;
  }
}