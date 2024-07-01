import { createCharCard } from "./createCharCard.js";
import { getCharsData } from "./getCharactersData.js";
const favHeroKey = "fav_Hero_Key";

async function getFavHeros() {
  const charsArray = await getCharsData();
  const favHerosArray = getFavData().split(",");
  if (favHerosArray[0]) {
    favHerosArray.forEach((id) => {
      const charsArrayEl = charsArray.find((char) => char.id == id);
      createCharCard(charsArrayEl, "Remove from", "charCardsContFavorite");
    });
  }
  const allFavBtnEl = document.querySelectorAll(".removefromFavBtn");
  allFavBtnEl.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.parentElement.id);
      removeFromFavArray(btn.parentElement.id);
      console.log(localStorage.getItem(favHeroKey));
      btn.parentElement.remove();
    });
  });
}

function removeFromFavArray(id) {
  let data = getFavData();
  let dataArray = [];
  if (data) {
    dataArray = data.split(",");
  }
  if (dataArray.includes(id)) {
    const indexOfId = dataArray.findIndex((currEl) => currEl == id);
    console.log(indexOfId);
    dataArray.splice(indexOfId, 1);
    const cardContWithId = document.getElementById(id);
    cardContWithId.classList.toggle("favHero");
  }
  const strData = dataArray.join(",");
  localStorage.setItem(favHeroKey, strData);
}

function getFavData() {
  const favData = localStorage.getItem(favHeroKey);
  return favData;
}

getFavHeros();
