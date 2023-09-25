const form = document.getElementById("login");
const URL = "http://localhost:3000";

window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = `/`;
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = form.email.value.toLowerCase();
  const pass = form.pass.value;
  if (pass === "" || email === "") {
    alert("Preencha os campos");
  } else {
    try {
      const response = await fetch(URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: pass }),
      });
      const result = await response.json();
   
      localStorage.setItem("token", result.data.token);
      window.location.href = `/`;//home
    } catch (error) {
      alert("Verifique suas credenciais e tente novamente");
    }
  }

});
