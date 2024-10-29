function GetInf(event) {
  event.preventDefault();

  const elements = Array.from(document.getElementById("apply").elements).map(
    (item) => item.value
  );

  (async () => {
    try {
      const rawResponse = await fetch("http://localhost:8080/people_post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: elements[0],
          email: elements[1],
          phone: elements[2],
        }),
      });

      const content = await rawResponse.json();
      alert("Vos informations ont bien été transmises ! ");
      console.log(content);
    } catch (error) {}
  })();
}

document.getElementById("apply").addEventListener("submit", GetInf);
