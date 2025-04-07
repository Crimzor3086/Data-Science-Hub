// Main JavaScript file for the Data Science Hub website

// Function to handle form submissions
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Grab form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Check if the form is valid
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    // Handle form submission logic (e.g., send data to the server)
    console.log('Form Submitted:', { email, password });
  
    // Optionally, clear the form after submission
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }
  
  // Event listener for login form submission
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Toggle navigation menu on mobile view (for responsive design)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header nav ul');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
  
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Adjust for header height
          behavior: 'smooth',
        });
      }
    });
  });
  
  // Example: Highlight current page in the navigation
  const navLinks = document.querySelectorAll('header nav ul li a');
  const currentPage = window.location.pathname.split('/').pop();
  
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Course Filtering
  document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courses = document.querySelectorAll('.course');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            courses.forEach(course => {
                if (filter === 'all' || course.getAttribute('data-level') === filter) {
                    course.style.display = 'block';
                    setTimeout(() => {
                        course.style.opacity = '1';
                        course.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    course.style.opacity = '0';
                    course.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        course.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to course cards on page load
    courses.forEach((course, index) => {
        setTimeout(() => {
            course.style.opacity = '1';
            course.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(212, 175, 55, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.2)';
        });
    });

    // Add animation to navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
  });
  
  // Form submission handling
  document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.querySelector('form[action="#"]');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          email: this.querySelector('input[name="email"]').value,
          password: this.querySelector('input[name="password"]').value
        };
        
        // Log form data (for debugging)
        console.log('Login Form Submitted:', formData);
        
        // Here you would typically send the data to your server
        alert('Login successful!');
        window.location.href = '../index.html';
      });
    }
    
    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          name: this.querySelector('input[name="name"]').value,
          email: this.querySelector('input[name="email"]').value,
          password: this.querySelector('input[name="password"]').value
        };
        
        // Log form data (for debugging)
        console.log('Signup Form Submitted:', formData);
        
        // Here you would typically send the data to your server
        alert('Account created successfully!');
        window.location.href = 'login.html';
      });
    }
  });
  