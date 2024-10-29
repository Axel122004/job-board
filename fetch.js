const apiUrl = "http://localhost:8080/advertisements_get_name";

function fetchData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
      ReadMore();
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function displayData(data) {
  // sessionStorage.setItem("inox", "admin");
  // let admin = sessionStorage.getItem("inox");

  const job = document.getElementById("data-job");

  job.innerHTML = "";

  data.forEach((annonce) => {
    const card = document.createElement("div");
    card.className = "card";

    const maxDescriptionLength = 80;

    let fullDescription = annonce.description;
    let lowDescription =
      fullDescription.length > maxDescriptionLength
        ? fullDescription.substring(0, maxDescriptionLength) + "..."
        : fullDescription;

    card.innerHTML = `
        <h2>${annonce.title}</h2>
        <p class="company">${annonce.name}</p>
        <p class="location">Localisation: ${annonce.localisation}</p>
        <p class="wage">Salaire: ${annonce.wage} €</p>
        <p class="description" data-full-description="${fullDescription}" data-low-description="${lowDescription}">
          ${lowDescription}
        </p>
        <a href="apply.html" class="btn">Apply</a>
        ${
          fullDescription.length > maxDescriptionLength
            ? '<a class="read-more-btn">Read More</a>'
            : ""
        }
  
      `;

    job.appendChild(card);
  });
}

window.onload = fetchData;
