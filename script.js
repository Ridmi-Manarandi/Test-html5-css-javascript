let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000);
}


document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            document.getElementById('response').textContent = 'Form submitted successfully!';
        }
    });
});

function validateForm() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var agreement = document.getElementById('agreement').checked;
    var isValid = true;

  
    document.querySelectorAll('.error').forEach(function(error) {
        error.textContent = '';
    });

    // Validate first name
    if (!firstName) {
        showError('first-name', 'First Name is required');
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        showError('last-name', 'Last Name is required');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Invalid email format');
        isValid = false;
    }

    // Validate message
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }

    // Validate agreement
    if (!agreement) {
        showError('agreement', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, errorMessage) {
    var errorElement = document.createElement('span');
    errorElement.classList.add('error');
    errorElement.textContent = errorMessage;
    document.getElementById(fieldId).parentNode.appendChild(errorElement);
}

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const menuPopup = document.getElementById('menu-popup');

    burgerMenu.addEventListener('click', function() {
        alert("Hi Ridmi");
        menuPopup.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!menuPopup.contains(event.target) && !burgerMenu.contains(event.target)) {
            menuPopup.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const moviesContainer = document.getElementById('moviesContainer');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMovies(searchTerm);
        }
    });

    function fetchMovies(searchTerm) {
        const apiUrl = `http://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayMovies(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayMovies(movies) {
        searchResults.innerHTML = '';

        movies.forEach(show => {
            const showDiv = document.createElement('div');
            showDiv.classList.add('show');
            showDiv.innerHTML = `
                <img src="${show.show.image ? show.show.image.medium : 'placeholder.png'}" alt="${show.show.name}">
                <h3>${show.show.name}</h3>
                <p>${show.show.summary}</p>
            `;
            searchResults.appendChild(showDiv);
        });
    }
});

