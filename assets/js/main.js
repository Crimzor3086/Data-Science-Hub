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
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
          email: this.querySelector('input[name="email"]').value,
          password: this.querySelector('input[name="password"]').value
        };
        
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

          const data = await response.json();

          if (response.ok) {
            // Store session token
            sessionStorage.setItem('session_token', data.session_token);
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.setAttribute('role', 'status');
            successDiv.textContent = 'Login successful! Redirecting...';
            document.querySelector('.auth-card').prepend(successDiv);
            
            // Redirect to dashboard
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          } else {
            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.textContent = data.error || 'Login failed. Please try again.';
            document.querySelector('.auth-card').prepend(errorDiv);
          }
        } catch (error) {
          console.error('Login error:', error);
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.setAttribute('role', 'alert');
          errorDiv.textContent = 'An error occurred. Please try again later.';
          document.querySelector('.auth-card').prepend(errorDiv);
        }
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
  
  // Search functionality
  document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchQuery = document.getElementById('search-query');
    const resultsGrid = document.querySelector('.results-grid');
    const resultsCount = document.querySelector('.results-count');
    const noResults = document.querySelector('.no-results');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchQuery.value.trim();
            const filters = Array.from(document.querySelectorAll('input[name="filter"]:checked'))
                .map(checkbox => checkbox.value);

            if (query) {
                performSearch(query, filters);
            }
        });
    }

    function performSearch(query, filters) {
        // In a real application, this would make an API call
        // For now, we'll simulate a search with some sample results
        const sampleResults = [
            {
                title: 'Introduction to Machine Learning',
                description: 'Learn the fundamentals of machine learning and its applications.',
                type: 'course',
                link: 'pages/courses.html'
            },
            {
                title: 'Data Preprocessing Best Practices',
                description: 'Essential techniques for cleaning and preparing your data.',
                type: 'article',
                link: 'pages/blog.html'
            },
            {
                title: 'Python for Data Science',
                description: 'Comprehensive guide to using Python for data analysis.',
                type: 'resource',
                link: 'pages/resources.html'
            }
        ];

        // Filter results based on selected filters
        let filteredResults = sampleResults;
        if (filters.length > 0) {
            filteredResults = sampleResults.filter(result => 
                filters.includes(result.type)
            );
        }

        // Display results
        displayResults(filteredResults, query);
    }

    function displayResults(results, query) {
        resultsGrid.innerHTML = '';
        noResults.style.display = 'none';

        if (results.length === 0) {
            noResults.style.display = 'block';
            resultsCount.textContent = 'Showing 0 results';
            return;
        }

        resultsCount.textContent = `Showing ${results.length} results for "${query}"`;

        results.forEach(result => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.description}</p>
                <div class="result-meta">Type: ${result.type}</div>
                <a href="${result.link}" class="result-link">View Details</a>
            `;
            resultsGrid.appendChild(card);
        });
    }
  });
  
  // Contact Form Validation
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.style.display = 'none');
            
            // Validate form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Name validation
            if (name.value.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Email validation
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Subject validation
            if (subject.value.length < 5) {
                document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters long';
                document.getElementById('subject-error').style.display = 'block';
                isValid = false;
            }
            
            // Message validation
            if (message.value.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully:', {
                    name: name.value,
                    email: email.value,
                    subject: subject.value,
                    message: message.value
                });
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
  });
  