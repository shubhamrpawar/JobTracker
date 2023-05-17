// Variables
const dateInput = document.getElementById("date-input");
const companynameInput = document.getElementById("companyname-input");
const positionInput = document.getElementById("position-input");
const salaryInput = document.getElementById("salary-input");
const locationInput = document.getElementById("location-input");
const bondInput = document.getElementById("bond-input");
const applicationInput = document.getElementById("application-input");


const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");

const updateDateInput = document.getElementById("update-date-input");
const updateCompanynameInput = document.getElementById("update-companyname-input");
const updatePositionInput = document.getElementById("update-position-input");
const updateSalaryInput = document.getElementById("update-salary-input");
const updateLocationInput = document.getElementById("update-location-input");
const updateBondInput = document.getElementById("update-bond-input");
const updateApplicationInput = document.getElementById("update-application-input");

const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

// Functions
function renderTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        
        const dateTd = document.createElement("td");
        const companynameTd = document.createElement("td");
        const positionTd = document.createElement("td");
        const salaryTd = document.createElement("td");
        const locationTd = document.createElement("td");
        const bondTd = document.createElement("td");
        const applicationTd = document.createElement("td");


        const actionsTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        idTd.innerText = user.id;

        dateTd.innerText = user.date;
        companynameTd.innerText = user.companyname;
        positionTd.innerText = user.position;
        salaryTd.innerText = user.salary;
        locationTd.innerText = user.location;
        bondTd.innerText = user.bond;
        applicationTd.innerText = user.application;

        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        editBtn.addEventListener("click", () => {
            showUpdateForm(user.id);
        });
        deleteBtn.addEventListener("click", () => {
            deleteUser(user.id);
        });
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        
        tr.appendChild(dateTd);
        tr.appendChild(companynameTd);
        tr.appendChild(positionTd);
        tr.appendChild(salaryTd);
        tr.appendChild(locationTd);
        tr.appendChild(bondTd);
        tr.appendChild(applicationTd);

        tr.appendChild(actionsTd);
        tableBody.appendChild(tr);
    }
}

function addUser() {
    
    const date = dateInput.value.trim();
    const companyname = companynameInput.value.trim();
    const position = positionInput.value.trim();
    const salary = salaryInput.value.trim();
    const location = locationInput.value.trim();
    const bond = bondInput.value.trim();
    const application = applicationInput.value.trim();


        if ( date && companyname && position && salary && location && bond && application != null) {
            var id = 1;
            var val = users.map(function (x) { return x.id; }).indexOf(id);
            while (val != -1) {
                id++;
                val = users.map(function (x) { return x.id; }).indexOf(id);
            }
            const user = {

                id: id,
                date: date,
                companyname: companyname,
                position: position,
                salary: salary,
                location: location,
                bond: bond,
                application: application

            };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));


            dateInput.value = "";
            companynameInput.value = "";
            positionInput.value = "";
            salaryInput.value = "";
            locationInput.value = "";
            bondInput.value = "";
            applicationInput.value = "";


            renderTable();
        } else {
            alert("All input is Required if not want Put **NA**");
        }
}

function updateUser() {

    const date = updateDateInput.value;
    const companyname = updateCompanynameInput.value;
    const position = updatePositionInput.value;
    const salary = updateSalaryInput.value;
    const location = updateLocationInput.value;
    const bond = updateBondInput.value;
    const application = updateApplicationInput.value;

        const index = users.findIndex((user) => user.id === currentUserId);
        if (index !== -1) {
            users[index].date = date;
            users[index].companyname = companyname;
            users[index].position = position;
            users[index].salary = salary;
            users[index].location = location;
            users[index].bond = bond;
            users[index].application = application;

            localStorage.setItem("users", JSON.stringify(users));
            hideUpdateForm();
            renderTable();
        }
}

function showUpdateForm(userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {

        updateDateInput.value = user.date;
        updateCompanynameInput.value = user.companyname;
        updatePositionInput.value = user.position;
        updateSalaryInput.value = user.salary;
        updateLocationInput.value = user.location;
        updateBondInput.value = user.bond;
        updateApplicationInput.value = user.application;

        currentUserId = user.id;
        updateBtn.addEventListener("click", updateUser);
        cancelBtn.addEventListener("click", hideUpdateForm);
        updateBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";

        updateDateInput.style.display = "inline-block";
        updateCompanynameInput.style.display = "inline-block";
        updatePositionInput.style.display = "inline-block";
        updateSalaryInput.style.display = "inline-block";
        updateLocationInput.style.display = "inline-block";
        updateBondInput.style.display = "inline-block";
        updateApplicationInput.style.display = "inline-block";

        document.getElementById("update-container").style.display = "block";
    }
}

function hideUpdateForm() {

    updateDateInput.value = "";
    updateCompanynameInput.value = "";
    updatePositionInput.value = "";
    updateSalaryInput.value = "";
    updateLocationInput.value = "";
    updateBondInput.value = "";
    updateApplicationInput.value = "";
    
    
    currentUserId = null;
    updateBtn.removeEventListener("click", updateUser);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";


    updateDateInput.style.display = "none";
    updateCompanynameInput.style.display = "none";
    updatePositionInput.style.display = "none";
    updateSalaryInput.style.display = "none";
    updateLocationInput.style.display = "none";
    updateBondInput.style.display = "none";
    updateApplicationInput.style.display = "none";
    
    
    document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    if (users.length == 0) {
        hideUpdateForm();
    };
    renderTable();
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();