const fetchUsersBtn = document.getElementById("fetchUsers");
const usersTableBody = document.querySelector("#usersTable tbody");
const errorDisplayDiv = document.getElementById("errorDisplay");
const searchInput = document.getElementById("userSearch");
const paginationControls = document.getElementById("paginationControls");

const usersPerPage = 2; // Set the number of users per page
let currentPage = 1;

fetchUsersBtn.addEventListener("click", fetchUsers);

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((users) => {
      displayUsers(users);
      displayPagination(users.length);
    })
    .catch((error) => {
      errorDisplayDiv.innerText = `An error occurred: ${error.message}`;
    });
}

function displayUsers(users) {
  const startIdx = (currentPage - 1) * usersPerPage;
  const endIdx = startIdx + usersPerPage;
  const displayedUsers = users.slice(startIdx, endIdx);

  let output = "";
  displayedUsers.forEach((user) => {
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

function displayPagination(totalUsers) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  let paginationOutput = "";
  for (let i = 1; i <= totalPages; i++) {
    paginationOutput += `<button onclick="changePage(${i})">${i}</button>`;
  }
  paginationControls.innerHTML = paginationOutput;
}

function changePage(newPage) {
  currentPage = newPage;
  fetchUsers();
}
