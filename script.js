import { getCharsData } from "./getCharactersData.js";
import { createCharCard } from "./createCharCard.js";

const favHeroKey = "fav_Hero_Key";
const searchBar = document.getElementById("searchHero");
let charsArray;

export { favHeroKey, getFavData };

async function getCharsArray() {
  // getting the array of characters
  charsArray = await getCharsData();
  console.log(charsArray);

  // creating all charcters
  charsArray.forEach((char) => createCharCard(char, "Add to", "charCardsContIndex"));
  const allCharacters = document.querySelectorAll(".cardCont");

  searchBar.addEventListener("keyup", (event) => {
    const searchInput = event.target.value.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/\./g, "").trim();
    console.log(searchInput);
    allCharacters.forEach((char) => {
      if (char.getAttribute("data-name").includes(searchInput)) {
        char.style.display = "";
      } else {
        char.style.display = "none";
      }
    });
  });

  const allFavBtnEl = document.querySelectorAll(".addtoFavBtn");
  allFavBtnEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.parentElement.id);
      addToFavArray(btn.parentElement.id);
      console.log(localStorage.getItem(favHeroKey));
    });
  });

  let favHerosArrayData = getFavData();
  if (getFavData()) {
    favHerosArrayData = favHerosArrayData.split(",");
  }
  console.log(favHerosArrayData[0]);
  if (favHerosArrayData[0]) {
    favHerosArrayData.forEach((id) => {
      const favCharArray = Array.from(allCharacters);
      const favChar = favCharArray.find((char) => char.id == id);
      console.log(favChar);
      favChar.classList.add("favHero");
    });
  }
}
getCharsArray();

function addToFavArray(id) {
  let data = getFavData();
  let dataArray = [];
  if (data) {
    dataArray = data.split(",");
  }
  if (!dataArray.includes(id)) {
    dataArray.push(id);
    const cardContWithId = document.getElementById(id);
    cardContWithId.classList.add("favHero");
  } else {
  }
  const strData = dataArray.join(",");
  localStorage.setItem(favHeroKey, strData);
}
function getFavData() {
  const favData = localStorage.getItem(favHeroKey);
  return favData;
}
