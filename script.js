// Variables for form and form elements
const formTitle = document.getElementById("form-title");
const submitButton = document.getElementById("submit-button");
const toggleFormText = document.getElementById("toggle-form-text");
const toggleForm = document.getElementById("toggle-form");
const confirmPasswordContainer = document.getElementById("confirm-password-container");
const userNameContainer = document.getElementById("user-name-container");
const form = document.getElementById("form");

// Password fields and eye icons
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const passwordEye = document.querySelector(".eye.password");
const confirmPasswordEye = document.querySelector(".eye.confirm-password");
const passwordIcons = passwordEye.querySelectorAll("i");
const confirmPasswordIcons = confirmPasswordEye.querySelectorAll("i");

// Regex for validating email and password
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

let isSignUp = true; // Default to Sign Up

// Function to toggle between Sign Up and Sign In forms
toggleForm.addEventListener("click", () => {
    isSignUp = !isSignUp; // Toggle the form state
    updateFormState(); // Update the form UI accordingly
});
 
// Toggle password visibility for both password fields
passwordEye.addEventListener("click", () => {
    togglePasswordVisibility(passwordField, passwordIcons);
});

confirmPasswordEye.addEventListener("click", () => {
    togglePasswordVisibility(confirmPasswordField, confirmPasswordIcons);
});

// Function to toggle the visibility of password
function togglePasswordVisibility(inputField, icons) {
    const isPasswordVisible = inputField.type === 'text'; // Check if password is currently visible

    if (isPasswordVisible) {
        inputField.type = 'password'; // Hide password
        icons.forEach(icon => icon.style.display = 'none'); // Hide both eye icons
        icons[0].style.display = 'block'; // Show the "eye-slash" icon
    } else {
        inputField.type = 'text'; // Show password
        icons.forEach(icon => icon.style.display = 'none'); // Hide both eye icons
        icons[1].style.display = 'block'; // Show the "eye" icon
    }
}

function updateFormState() {
    if (isSignUp) {
        formTitle.textContent = "Sign Up";
        submitButton.textContent = "Sign Up";
        confirmPasswordContainer.style.display = "block"; // Show the confirm password field
        userNameContainer.style.display = "block"; // Show username field
        toggleFormText.innerHTML = 'Already have an account? <span id="toggle-form">Sign In</span>';

        // Set name field as required for Sign Up
        document.getElementById("name").required = true;
        document.getElementById("confirmPassword").required = true;

    } else {
        formTitle.textContent = "Sign In";
        submitButton.textContent = "Sign In";
        userNameContainer.style.display = "none"; // Hide the username field
        confirmPasswordContainer.style.display = "none"; // Hide the confirm password field
        toggleFormText.innerHTML = 'Don\'t have an account? <span id="toggle-form">Sign Up</span>';

        // Set name field as not required for Sign In
        document.getElementById("name").required = false;
        document.getElementById("confirmPassword").required = false;
    }

    // Re-add event listener to toggle text in case of re-render
    const toggleForm = document.getElementById("toggle-form");
    toggleForm.addEventListener("click", () => {
        isSignUp = !isSignUp; // Toggle the form state
        updateFormState(); // Update the form UI accordingly
    });
}

// Handle form submission for both Sign Up and Sign In
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission to server

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword") ? document.getElementById("confirmPassword").value : null;

    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.'
        });
        return;
    }

    if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Weak Password',
            text: 'Password must be at least 8 characters long and contain both letters and numbers.'
        });
        return;
    }

    if (isSignUp && password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match.'
        });
        return;
    }

    if (isSignUp) {
        // Simulate sign up action
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful!',
            text: 'You can now log in.'
        });
     } else {
        // Simulate sign-in action (checking if the user exists)
        const storedEmail = "user@example.com";  // Example
        const storedPassword = "Password123";    // Example

        if (email === storedEmail && password === storedPassword) {
            Swal.fire({
                icon: 'success',
                title: 'Sign In Successful!',
                text: 'Welcome back!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: 'Invalid email or password.'
            });
        }
    }
    //  clear the form after submission
    form.reset();
});
