const ApiGetApp = "http://localhost:8080/applications_get";

function fetchApplications() {
  fetch(ApiGetApp)
    .then((response) => response.json())
    .then((data) => {
      displayApplications(data);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function displayApplications(data) {
  const applications = document.getElementById("data-applications");

  applications.innerHTML = "";

  data.forEach((annonce) => {
    const elementApplications = document.createElement("div");
   
    elementApplications.innerHTML = `
      <table>
        <tr>
         <td>${annonce.id}  </td>
         <td>${annonce.advertisement_id}  </td>
         <td>${annonce.person_id}  </td>
         <td>${annonce.email_sent}  </td>
        </tr>
      </table>
          <br>`;

    applications.appendChild(elementApplications);
  });
}

window.onload = fetchApplications();
