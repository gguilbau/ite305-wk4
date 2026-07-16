// Loads the content of a page into the bodyContent div
function loadBody(content){
    $("#bodyContent").load(content, function(responseText, textStatus, jqXHR) {
        if (textStatus === "error") {
            $("#bodyContent").html(`<p>Failed to load ${content}.</p> <p>${jqXHR.statusText}</p>`);
        }
    });
}

// Set user data at higher scope so it can persist through confirmation page.
let userData = null;

$(document).on("click", "#submitRequest", function (e) {
    // Stop the submit from reloading page
    e.preventDefault();

    // Store user data..
    userData = {
        name: $("#inputName").val(),
        email: $("#inputEmail").val(),
        phone: $("#inputPhone").val(),
        category: $("#inputCategory").val(),
        description: $("#inputDescription").val()
    };
    
    // Load using jquery and flush input to new page
    $("#bodyContent").load("confirmation.html", function() {
        $("#confirmName").text(userData.name);
        $("#confirmEmail").text(userData.email);
        $("#confirmPhone").text(userData.phone);
        $("#confirmCategory").text(userData.category);
        $("#confirmDescription").text(userData.description);
    });
});

$(document).on("click", "#confirmRequest", function(e)
{
    // Stop the submit from reloading page
    e.preventDefault();
    
    // Check if user verified accuracy..
    if ($('#confirmAccuracy').is(':checked')) {            
        // Load using jquery and flush input to new page
        $("#bodyContent").load("success.html", function() {
            $("#successMessage").text(`Thank you, ${userData.name}! You will receive a reply at ${userData.email} within 24 hours.`);
        });

    }

    // Display error..
    else {
        alert("You must confirm your information is accurate to submit a request.");
    }
});