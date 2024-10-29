const ApiGetComp = "http://localhost:8080/companies_get";

async function AdminPage() {
  try {
    const response = await fetch(
      "http://localhost:8080/inscription_get_role/1"
    );
    const data = await response.json();

    return data[0].role;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCompanies() {
  const role = await AdminPage();
  try {
    if (role === "admin") {
      const response = await fetch(ApiGetComp);
      const data = await response.json();
      displayCompanies(data);
    } else {
      console.log("Accès refusé : l'utilisateur n'est pas admin.");
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

function displayCompanies(data) {
  const companies = document.getElementById("data-companies");

  companies.innerHTML = "";

  data.forEach((annonce) => {
    const elementCompanies = document.createElement("div");

    elementCompanies.innerHTML = `
      <table>
        <tr>
          <td>${annonce.id}</td>
          <td>${annonce.name}</td>
          <td>${annonce.description}</td>
        </tr>
      </table>
      <br>`;

    companies.appendChild(elementCompanies);
  });
}

window.onload = fetchCompanies();
