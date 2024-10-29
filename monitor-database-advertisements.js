const ApiGetAd = "http://localhost:8080/advertisements_get";

function fetchAdvertisements() {
  fetch(ApiGetAd)
    .then((response) => response.json())
    .then((data) => {
      displayAdvertisements(data);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function displayAdvertisements(data) {
  const advertisements = document.getElementById("data-advertisements");

  advertisements.innerHTML = "";

  data.forEach((annonce) => {
    const elementAdvertisements = document.createElement("div");

    elementAdvertisements.innerHTML = `
    <table>
      <tr>
  
        <td>${annonce.id}</td>
        <td>${annonce.company_id}</td>
        <td>${annonce.title}</td>
        <td>${annonce.description}</td>
        <td>${annonce.localisation}</td>
        <td>${annonce.wage}</td>
      </tr>
    </table>
          <br>`;

    advertisements.appendChild(elementAdvertisements);
  });
}

window.onload = fetchAdvertisements();
