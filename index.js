import {
  saveClient,
  getClients,
  onGetClients,
  deleteClient,
  getClient,
  updateClient,
} from "./server.js";

const clientForm = document.getElementById("client-form");
const clientContainer = document.getElementById("client-container");
let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  onGetClients((querySnapshot) => {
    clientContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const client = doc.data();

      clientContainer.innerHTML += `
          <div class="card card-body mt-2 border-primary">
              <h3 class="h5">${client.name}</h3>
              <p>${client.adress}</p>
              <p>${client.phone}</p>
              <p>${client.email}</p>
              <p>${client.description}</p>
              <div class="d-flex justify-content-around">
              <button class='btn btn-danger mb-3 btn-delete' data-id="${doc.id}">Delete</button>
              <button class='btn btn-info mb-3 btn-edit' data-id="${doc.id}">Editar</button>
              </div>
          </div>
      `;
    });

    const btnsDelete = clientContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteClient(dataset.id);
      });
    });

    const btnsEdit = clientContainer.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getClient(e.target.dataset.id);
        const client = doc.data();

        clientForm["client-name"].value = client.name;
        clientForm["client-adress"].value = client.adress;
        clientForm["client-phone"].value = client.phone;
        clientForm["client-email"].value = client.email;
        clientForm["client-description"].value = client.description;
        editStatus = true;
        id = doc.id;

        clientForm["btn-client-save"].innerText = "Editar";
      });
    });
  });
});

clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = clientForm["client-name"];
  const adress = clientForm["client-adress"];
  const phone = clientForm["client-phone"];
  const email = clientForm["client-email"];
  const description = clientForm["client-description"];

  if (!editStatus) {
    saveClient(
      name.value,
      adress.value,
      phone.value,
      email.value,
      description.value
    );
  } else {
    updateClient(id, {
      name: name.value,
      adress: adress.value,
      phone: phone.value,
      email: email.value,
      description: description.value,
    });

    editStatus = false;
  }
  clientForm.reset();
});
