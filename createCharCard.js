function createCharCard(charArrElement, addRemove, charCardsContId) {
  const charCardsContEl = document.getElementById(charCardsContId);
  // creating card elements
  const cardCont = document.createElement("div");
  const charImgCont = document.createElement("div");
  const charImg = document.createElement("img");
  const charName = document.createElement("div");
  const addToFavBtn = document.createElement("button");
  const linkToHeroPage = document.createElement("a");

  linkToHeroPage.href = `./heroPage.html?id=${charArrElement.id}`;
  // linkToHeroPage.target = "_blank";

  // Adding classes to each element
  cardCont.classList.add("cardCont");
  charImgCont.classList.add("charImgCont");
  charImg.classList.add("charImg");
  charName.classList.add("charName");
  const btnClass = `${addRemove.toLowerCase().replace(" ", "")}FavBtn`;
  addToFavBtn.classList.add(btnClass);
  cardCont.id = charArrElement.id;
  const cardName = charArrElement.name.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/\./g, "");
  cardCont.setAttribute("data-name", cardName);

  // creating image url and adding it to img tag and adding text to name element
  const imgURL = `${charArrElement.thumbnail.path}.${charArrElement.thumbnail.extension}`;
  charImg.src = imgURL;
  charName.textContent = charArrElement.name;

  addToFavBtn.innerHTML = `<i class="fa-solid fa-heart"></i> ${addRemove} favorite`;
  // finally appending elements to their parent elements.
  if (!imgURL.includes("image_not_available") && !imgURL.includes("gif")) {
    linkToHeroPage.appendChild(charImg);
    charImgCont.appendChild(linkToHeroPage);
    cardCont.append(charImgCont, charName, addToFavBtn);
    if (charCardsContEl) {
      charCardsContEl.appendChild(cardCont);
    }
  }
}

export { createCharCard };
