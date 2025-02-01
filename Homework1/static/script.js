// Function to submit a new application (name, zipcode)
function submitApplication() {
    document.getElementById("applicationConfirmation").innerText = "" // Clear previous message

    const name = document.getElementById("name").value; // Get name input
    const zipcode = document.getElementById("zipcode").value; // Get zipcode input

    console.log("Submitting application...");  // Debuging log to verify function execution

    fetch("/api/accept_application", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, zipcode: zipcode }) // Send data as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Debugging log to check backend response
        
        if (data.application_number) {
            document.getElementById("applicationConfirmation").innerText = 
                `Application received successfully! Your application number is ${data.application_number}`;
        } else {
            document.getElementById("applicationConfirmation").innerText = 
                "There was an error with your application. Please try again.";
        }
    })
    .catch(error => console.log(error)); // Handle potential errors
}

// Function to check the status of an application
function checkStatus() {
    document.getElementById("statusResult").innerText = "" // Clear previous status message

    const appNumber = document.getElementById("appNumberCheck").value; // Get application number input

    if (appNumber.trim() === "") { // Validate input
        alert("Please enter a valid application number.");
        return;
    }
    
    fetch(`/api/check_status?app_number=${appNumber}`) // Make a GET request to check status
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById("statusResult").innerText = 
                `Application Status: ${data.status}`; // Display application status
        } else {
            document.getElementById("statusResult").innerText = data.message; // Show error message
        }
    })
    .catch(error => console.log(error)); // Handle erros 
}

// Function to change the status of an application
function changeStatus() {
    document.getElementById("statusUpdateResult").innerText = ""; // Clear previous update message

    const appNumber = document.getElementById("appNumberChange").value; // Get application number input
    const newStatus = document.getElementById("newStatus").value; // Get new status input

    fetch("/api/change_status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ app_number: appNumber, status: newStatus }) // Send updated status
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("statusUpdateResult").innerText = data.message; // Display update confirmation
    })
    .catch(error => console.log(error)); // Log errors if any
}
