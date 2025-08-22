// Add another wurcom unit field set when button is clicked
function addWurcomUnit() {
    // Create a new fieldset element
    let newFieldset = document.createElement("fieldset");
    newFieldset.className = "wurcom-units field-layout"

    // Create new div elements and append to new fieldset
    let newDiv1 = document.createElement("div");
    newFieldset.appendChild(newDiv1);
    let newDiv2 = document.createElement("div");
    newFieldset.appendChild(newDiv2);

    // Get all existing fieldset elements and add one to the count
    let fieldsets = document.querySelectorAll("fieldset");
    let lastFieldset = fieldsets[fieldsets.length - 1];
    let unitCount = fieldsets.length + 1;

    // Create a label and input for the new unit name
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", `wurcom_unit_${unitCount}`);
    nameLabel.textContent = `Wur-Com Name #${unitCount} *: `;
    let nameInput = document.createElement("input");
    nameInput.id = `wurcom_unit_${unitCount}`;
    nameInput.type = "text";
    nameInput.name = `wurcom_unit_${unitCount}`;
    nameInput.required = true;

    // Create a label and select for the new unit location
    let locationLabel = document.createElement("label");
    locationLabel.setAttribute("for", `wurcom_location_${unitCount}`);
    locationLabel.textContent = `Wur-Com Location #${unitCount} *: `;
    let locationSelect = document.createElement("select");
    locationSelect.id = `wurcom_location_${unitCount}`;
    locationSelect.name = `wurcom_location_${unitCount}`;
    locationSelect.required = true;

    // Create options for the location select
    let locationOption0 = document.createElement("option");
    locationOption0.value = "Select Location";
    locationOption0.textContent = "Select Location";
    locationSelect.appendChild(locationOption0);

    let LocationOption1 = document.createElement("option");
    LocationOption1.value = "car_station";
    LocationOption1.textContent = "Car Station";
    locationSelect.appendChild(LocationOption1);

    let locationOption2 = document.createElement("option");
    locationOption2.value = "lobby";
    locationOption2.textContent = "Lobby Station";
    locationSelect.appendChild(locationOption2);

    // Create a label and select for the new unit type
    let typeLabel = document.createElement("label");
    typeLabel.setAttribute("for", `wurcom_type_${unitCount}`);
    typeLabel.textContent = `Wur-Com type #${unitCount} *: `;
    let typeSelect = document.createElement("select");
    typeSelect.id = `wurcom_type_${unitCount}`;
    typeSelect.name = `wurcom_type_${unitCount}`;
    typeSelect.required = true;

    // Create options for the location select
    let typeOption0 = document.createElement("option");
    typeOption0.value = "Select Type";
    typeOption0.textContent = "Select Type";
    typeSelect.appendChild(typeOption0);

    let typeOption1 = document.createElement("option");
    typeOption1.value = "car_station";
    typeOption1.textContent = "Car Station";
    typeSelect.appendChild(typeOption1);

    let typeOption2 = document.createElement("option");
    typeOption2.value = "lobby";
    typeOption2.textContent = "Lobby Station";
    typeSelect.appendChild(typeOption2);

    // Create a label and input for the new unit serial number
    let serialLabel = document.createElement("label");
    serialLabel.setAttribute("for", `wurcom_serial_${unitCount}`);
    serialLabel.textContent =  ` Wur-Com Serial #${unitCount} *: `;
    let serialInput = document.createElement("input");
    serialInput.id = `wurcom_serial_${unitCount}`;
    serialInput.type = "text";
    serialInput.name = `wurcom_serial_${unitCount}`;
    serialInput.minLength = 8;
    serialInput.maxLength = 12;
    serialInput.required = true;

    // Add a delete button to the new fieldset
    let deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-unit");
    deleteButton.innerHTML = "&times;";
    deleteButton.onclick = removeWurcomUnit;

    // Append the label and input to the fieldset
    newDiv1.appendChild(nameLabel);
    newDiv1.appendChild(nameInput);
    newDiv1.appendChild(locationLabel);
    newDiv1.appendChild(locationSelect);
    newDiv2.appendChild(serialLabel);
    newDiv2.appendChild(serialInput);
    newDiv2.appendChild(typeLabel);
    newDiv2.appendChild(typeSelect);
    newFieldset.appendChild(deleteButton);

    // Append the new fieldset and horizontal line to the form
    lastFieldset.insertAdjacentElement('afterend', newFieldset);
    lastFieldset.insertAdjacentElement('afterend', document.createElement("hr"));
}

// Remove the last wurcom unit fieldset when button is clicked
function removeWurcomUnit() {
    let fieldsets = document.querySelectorAll("fieldset");
    let hrElements = document.querySelectorAll("hr")
    if (fieldsets.length > 1) {
        fieldsets[fieldsets.length - 1].remove();
        hrElements[hrElements.length - 1].remove();
    }
}

const formModal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");

openModalButton.addEventListener("click", () => {
    formModal.showModal();
})

closeModalButton.addEventListener("click", () => {
    formModal.close();
})