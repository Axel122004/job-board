// const response = await fetch('http://localhost:8080/inscription', { ... });

async function registerUser(formData) {
  try {
    const response = await fetch("http://localhost:8080/test/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'inscription");
  }
}

async function loginUser(formData) {
  try {
    console.log(formData);

    const response = await fetch("http://localhost:8080/test/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      sessionStorage.setItem("userId", data.userId);
      window.location.href = "/home/axel/T-WEB-501-LYO_24/project01/job.html";
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la connexion");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(registerForm));
      registerUser(formData);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(loginForm);

      console.log("la", Object.fromEntries(new FormData(loginForm)));

      const formData = Object.fromEntries(new FormData(loginForm));
      loginUser(formData);
    });
  }
});
