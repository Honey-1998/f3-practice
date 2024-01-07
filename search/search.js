const fetchUsersBtn = document.getElementById("fetchUsers");
const usersTableBody = document.querySelector("#usersTable tbody");
const errorDisplayDiv = document.getElementById("errorDisplay");
const searchInput = document.getElementById("userSearch");

fetchUsersBtn.addEventListener("click", fetchUsers);
searchInput.addEventListener("input", performSearch);

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((users) => {
      let output = "";
      users.forEach((user) => {
        output += `<tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.address.street}, ${user.address.suite}, ${user.address.city}</td>
                            <td>${user.phone}</td>
                            <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
                          </tr>`;
      });
      usersTableBody.innerHTML = output;
    })
    .catch((error) => {
      errorDisplayDiv.innerText = `An error occurred: ${error.message}`;
    });
}
function performSearch() {
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue.trim() !== "") {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((users) => {
        const filteredUsers = users.filter((user) =>
          user.name.toLowerCase().includes(searchValue)
        );
        displayUsers(filteredUsers);
      })
      .catch((error) => {
        errorDisplayDiv.innerText = `An error occurred: ${error.message}`;
      });
  } else {
    // If the search input is empty, fetch and display all users
    fetchUsers();
  }
}

function displayUsers(users) {
  let output = "";
  users.forEach((user) => {
    output += `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.address.street}, ${user.address.suite}, ${user.address.city}</td>
                    <td>${user.phone}</td>
                    <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
                </tr>`;
  });
  usersTableBody.innerHTML = output;
}