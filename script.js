// Sample data for lab equipment and reviews
const equipmentData = [
    { id: 1, name: "Microscope", description: "High-quality microscope for lab use." },
    { id: 2, name: "Centrifuge", description: "Used for separating fluids of different densities." },
    { id: 3, name: "Spectrophotometer", description: "Measures the intensity of light." },
];

const reviewsData = [
    { user: 'John Doe', comment: 'Great lab equipment!' },
    { user: 'Jane Smith', comment: 'Very helpful staff.' }
];

// Function to display equipment on the admin dashboard
function displayEquipment() {
    const equipmentList = document.getElementById('equipmentList');
    equipmentList.innerHTML = ''; // Clear existing items
    equipmentData.forEach(item => {
        const equipmentItem = document.createElement('div');
        equipmentItem.className = 'equipment-item';
        equipmentItem.innerHTML = `
            <strong>${item.name}</strong>
            <p>${item.description}</p>
            <button onclick="openEditPopup(${item.id})">Edit</button>
        `;
        equipmentList.appendChild(equipmentItem);
    });
}

// Function to handle adding new equipment
document.getElementById('addEquipmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const equipmentName = document.getElementById('equipmentName').value;
    const equipmentDescription = document.getElementById('equipmentDescription').value;

    if (validateEquipmentInput(equipmentName, equipmentDescription)) {
        // Add new equipment to the array
        equipmentData.push({ id: equipmentData.length + 1, name: equipmentName, description: equipmentDescription });

        // Clear the input fields
        document.getElementById('equipmentName').value = '';
        document.getElementById('equipmentDescription').value = '';

        // Display updated equipment list
        displayEquipment();

        // Show success message
        alert('Equipment added successfully!');
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to validate equipment input
function validateEquipmentInput(name, description) {
    return name.trim() !== '' && description.trim() !== '';
}

// Function to load reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = ''; // Clear existing reviews
    reviewsData.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `<strong>${review.user}</strong><p>${review.comment}</p>`;
        reviewsList.appendChild(reviewItem);
    });
}

// Function to open the edit popup
function openEditPopup(id) {
    const equipment = equipmentData.find(item => item.id === id);
    if (equipment) {
        document.getElementById('editEquipmentName').value = equipment.name;
        document.getElementById('editEquipmentDescription').value = equipment.description;
        document.getElementById('editEquipmentId').value = equipment.id;
        document.getElementById('editPopup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

// Function to save edited equipment
function saveEditedEquipment(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const id = parseInt(document.getElementById('editEquipmentId').value);
    const equipmentName = document.getElementById('editEquipmentName').value;
    const equipmentDescription = document.getElementById('editEquipmentDescription').value;

    const equipmentIndex = equipmentData.findIndex(item => item.id === id);
    if (equipmentIndex !== -1 && validateEquipmentInput(equipmentName, equipmentDescription)) {
        equipmentData[equipmentIndex] = { id, name: equipmentName, description: equipmentDescription };
        closeEditPopup();
        displayEquipment();
        alert('Equipment updated successfully!');
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to close the edit popup
function closeEditPopup() {
    document.getElementById('editPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Initialize equipment list and reviews list
window.onload = function() {
    displayEquipment();
    loadReviews();
};