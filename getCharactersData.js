export { getCharsData };
const baseURL =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0fef2c5e0f7688fcc0be776bc8b0afc9&hash=a7d4e8e00ff94c58956b6f590e7ef441&limit=20";
const cacheKey = "marvel_cache_key";

const expirationTime = 24 * 3600 * 1000;
// 24 * 3600 * 1000;
async function getCharsData() {
  let offset = 0;
  let total = 0;
  let allCharacters = [];
  try {
    const cachedData = getCachedData();
    if (cachedData) {
      console.log("Using Cached Data");
      return cachedData;
    }

    do {
      const response = await fetch(`${baseURL}&offset=${offset}`);
      // console.log(response);
      if (!response.ok) {
        throw new Error(`API error - ${response.status}`);
      }
      const responseJson = await response.json();
      // console.log(responseJson);
      const characters = responseJson.data.results;
      // console.log(characters);
      allCharacters = allCharacters.concat([...characters]);
      // console.log(allCharacters);
      offset += 150;
      total = responseJson.data.total;
    } while (offset < total);
    cacheData(allCharacters);
  } catch (err) {
    console.log(`Failed to fetch character data: {${err}}`);
  }
  return allCharacters;
}
function cacheData(data) {
  const timestamp = new Date().getTime();
  const cachedDataObj = { data, timestamp };
  localStorage.setItem(cacheKey, JSON.stringify(cachedDataObj));
}
function getCachedData() {
  const now = new Date().getTime();
  const cache = localStorage.getItem(cacheKey);
  if (!cache) return null;
  const cachedDataObj = JSON.parse(cache);
  if (now - cachedDataObj.timestamp > expirationTime) {
    localStorage.removeItem(cacheKey);
    return null;
  }
  return cachedDataObj.data;
}

// const response = await fetch(baseURL);
// if (!response.ok) {
//   throw new Error(`API error - ${response.status}`);
// }
// const responseJson = await response.json();
// console.log(responseJson);
// const characters = responseJson.data.results;
// // console.log(characters);
// allCharacters = allCharacters.concat([...characters]);
// // console.log(allCharacters);
