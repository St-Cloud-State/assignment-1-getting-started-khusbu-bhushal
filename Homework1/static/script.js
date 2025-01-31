// Function to submit a new application (name, zipcode)
function submitApplication() {
    const name = document.getElementById("name").value;
    const zipcode = document.getElementById("zipcode").value;

    console.log("Submitting application...");  // Add this line to check if function is called
    //line1 added

    fetch("/api/accept_application", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, zipcode: zipcode })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Log the response data to check if the backend returns the expected response
        //line2 added
        
        if (data.application_number) {
            document.getElementById("applicationConfirmation").innerText = 
                `Application received successfully! Your application number is ${data.application_number}`;
        } else {
            document.getElementById("applicationConfirmation").innerText = 
                "There was an error with your application. Please try again.";
        }
    })
    .catch(error => console.log(error));
}

// Function to check the status of an application
function checkStatus() {
    const appNumber = document.getElementById("appNumberCheck").value;

    if (appNumber.trim() === "") {
        alert("Please enter a valid application number.");
        return;
    }
//line5 added
    
    fetch(`/api/check_status?app_number=${appNumber}`)
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById("statusResult").innerText = 
                `Application Status: ${data.status}`;
        } else {
            document.getElementById("statusResult").innerText = data.message;
        }
    })
    .catch(error => console.log(error));
}

// Function to change the status of an application
function changeStatus() {
    const appNumber = document.getElementById("changeAppNumber").value;
    const newStatus = document.getElementById("newStatus").value;

    fetch("/api/change_status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ app_number: appNumber, status: newStatus })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("statusChangeResult").innerText = data.message;
    })
    .catch(error => console.log(error));
}
