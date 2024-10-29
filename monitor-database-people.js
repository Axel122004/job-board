const ApiGetPeople = "http://localhost:8080/people_get";

function fetchPeople() {
  fetch(ApiGetPeople)
    .then((response) => response.json())
    .then((data) => {
      displayPeople(data);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function displayPeople(data) {
  const People = document.getElementById("data-people");

  People.innerHTML = "";

  data.forEach((annonce) => {
    const elementPeople = document.createElement("div");

    elementPeople.innerHTML = `
    <table>
      <tr>
        <td>${annonce.id}</td>
        <td>${annonce.name}</td>
        <td>${annonce.email}</td>
        <td>${annonce.phone}</td>
        <td>${annonce.role}</td>
      </tr>
    </table>
        `;

    People.appendChild(elementPeople);
  });
}

window.onload = fetchPeople();
