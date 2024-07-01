import { getCharsData } from "./getCharactersData.js";
const nameEl = document.getElementById("heroName");
const descriptionEl = document.getElementById("description");
const comicsEl = document.getElementById("comics");
const seriesEl = document.getElementById("series");
const storiesEl = document.getElementById("stories");
const eventsEl = document.getElementById("events");
const imageEl = document.getElementById("image");

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(urlParams.has('id'));
  const heroId = urlParams.get("id");
  // console.log(typeof heroId);
  const charsArray = await getCharsData();
  console.log(charsArray);
  const charObj = charsArray.find((char) => char.id === Number(heroId));

  if (charObj) {
    const imgURL = `${charObj.thumbnail.path}.${charObj.thumbnail.extension}`;
    imageEl.src = imgURL;
    nameEl.textContent = `${charObj.name}`;
    if (charObj.description) {
      descriptionEl.textContent = `${charObj.description}`;
    } else {
      descriptionEl.textContent = "Description not available.";
    }
    comicsEl.textContent = `${charObj.comics.available}`;
    seriesEl.textContent = `${charObj.series.available}`;
    storiesEl.textContent = `${charObj.stories.available}`;
    eventsEl.textContent = `${charObj.events.available}`;
  } else {
    console.error(`Hero with ID ${heroId} not found.`);
  }
});
