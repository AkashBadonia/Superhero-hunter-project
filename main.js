document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.id;

  switch (pageId) {
    case "indexPage":
      // Load script.js only for index.html
      import("./script.js")
        .then(() => {
          console.log("Loaded script.js for index.html");
          // Initialize any functions or logic specific to index.html if needed
        })
        .catch((error) => {
          console.error("Error loading script.js:", error);
        });
      break;
    case "favoritePage":
      // Load favorite.js only for favorite.html
      import("./favorite.js")
        .then(() => {
          console.log("Loaded favorite.js for favorite.html");
          // Initialize any functions or logic specific to favorite.html if needed
        })
        .catch((error) => {
          console.error("Error loading favorite.js:", error);
        });
      break;
    default:
      console.warn("No specific script to load for this page.");
  }
});
