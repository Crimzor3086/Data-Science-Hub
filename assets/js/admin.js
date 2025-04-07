// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize admin dashboard
    initializeAdminDashboard();
});

async function initializeAdminDashboard() {
    try {
        // Check admin authentication
        const adminToken = sessionStorage.getItem('adminToken');
        if (!adminToken) {
            window.location.href = 'login.html';
            return;
        }

        // Load initial data
        await loadUsers();
        await loadCourses();
        await loadBlogPosts();
        await loadServices();

        // Set up event listeners
        setupSearchFilters();
        setupPagination();
    } catch (error) {
        console.error('Error initializing admin dashboard:', error);
        showError('Failed to initialize admin dashboard');
    }
}

// User Management
async function loadUsers() {
    try {
        const response = await fetch('/api/admin/users', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        showError('Failed to load users');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Course Management
async function loadCourses() {
    try {
        const response = await fetch('/api/admin/courses', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        showError('Failed to load courses');
    }
}

function displayCourses(courses) {
    const tbody = document.getElementById('courses-table-body');
    tbody.innerHTML = '';

    courses.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${course.id}</td>
            <td>${course.title}</td>
            <td>${course.level}</td>
            <td>${course.instructor}</td>
            <td>$${course.price}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editCourse(${course.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteCourse(${course.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Blog Management
async function loadBlogPosts() {
    try {
        const response = await fetch('/api/admin/blog', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const posts = await response.json();
        displayBlogPosts(posts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showError('Failed to load blog posts');
    }
}

function displayBlogPosts(posts) {
    const tbody = document.getElementById('blog-table-body');
    tbody.innerHTML = '';

    posts.forEach(post => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>${post.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editBlogPost(${post.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteBlogPost(${post.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Service Management
async function loadServices() {
    try {
        const response = await fetch('/api/admin/services', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }

        const services = await response.json();
        displayServices(services);
    } catch (error) {
        console.error('Error loading services:', error);
        showError('Failed to load services');
    }
}

function displayServices(services) {
    const tbody = document.getElementById('services-table-body');
    tbody.innerHTML = '';

    services.forEach(service => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${service.id}</td>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>$${service.price}</td>
            <td>${service.status}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editService(${service.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteService(${service.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Search and Filter Functionality
function setupSearchFilters() {
    // User search
    document.getElementById('user-search').addEventListener('input', debounce(async (e) => {
        const searchTerm = e.target.value;
        const filter = document.getElementById('user-filter').value;
        await searchUsers(searchTerm, filter);
    }, 300));

    // Course search
    document.getElementById('course-search').addEventListener('input', debounce(async (e) => {
        const searchTerm = e.target.value;
        const filter = document.getElementById('course-filter').value;
        await searchCourses(searchTerm, filter);
    }, 300));

    // Blog search
    document.getElementById('blog-search').addEventListener('input', debounce(async (e) => {
        const searchTerm = e.target.value;
        const filter = document.getElementById('blog-filter').value;
        await searchBlogPosts(searchTerm, filter);
    }, 300));

    // Service search
    document.getElementById('service-search').addEventListener('input', debounce(async (e) => {
        const searchTerm = e.target.value;
        const filter = document.getElementById('service-filter').value;
        await searchServices(searchTerm, filter);
    }, 300));
}

// Pagination
function setupPagination() {
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const page = btn.textContent;
            if (page === 'Previous' || page === 'Next') {
                // Handle previous/next navigation
                return;
            }
            // Load data for the selected page
            await loadPage(parseInt(page));
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showError(message) {
    // Implement error display logic
    console.error(message);
}

function showSuccess(message) {
    // Implement success display logic
    console.log(message);
}

// Edit and Delete Functions
async function editUser(userId) {
    // Implement user editing logic
    console.log('Edit user:', userId);
}

async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            showSuccess('User deleted successfully');
            await loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            showError('Failed to delete user');
        }
    }
}

// Similar functions for courses, blog posts, and services
async function editCourse(courseId) {
    console.log('Edit course:', courseId);
}

async function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            const response = await fetch(`/api/admin/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            showSuccess('Course deleted successfully');
            await loadCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
            showError('Failed to delete course');
        }
    }
}

async function editBlogPost(postId) {
    console.log('Edit blog post:', postId);
}

async function deleteBlogPost(postId) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        try {
            const response = await fetch(`/api/admin/blog/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog post');
            }

            showSuccess('Blog post deleted successfully');
            await loadBlogPosts();
        } catch (error) {
            console.error('Error deleting blog post:', error);
            showError('Failed to delete blog post');
        }
    }
}

async function editService(serviceId) {
    console.log('Edit service:', serviceId);
}

async function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        try {
            const response = await fetch(`/api/admin/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            showSuccess('Service deleted successfully');
            await loadServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            showError('Failed to delete service');
        }
    }
} 