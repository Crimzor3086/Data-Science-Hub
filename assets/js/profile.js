document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const sessionToken = sessionStorage.getItem('session_token');
    if (!sessionToken) {
        window.location.href = 'login.html';
        return;
    }

    // Load user profile data
    loadUserProfile();

    // Handle form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', handleProfileUpdate);

    // Handle logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Handle avatar change
    document.querySelector('.edit-avatar-btn').addEventListener('click', handleAvatarChange);
});

async function loadUserProfile() {
    try {
        const response = await fetch('/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load profile');
        }

        const userData = await response.json();

        // Update profile information
        document.getElementById('user-name').textContent = userData.full_name || 'Not set';
        document.getElementById('user-email').textContent = userData.email;
        document.getElementById('user-role').textContent = userData.role || 'User';

        // Update form fields
        document.getElementById('full-name').value = userData.full_name || '';
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('bio').value = userData.bio || '';

        // Update statistics
        document.getElementById('courses-enrolled').textContent = userData.courses_enrolled || 0;
        document.getElementById('blog-posts').textContent = userData.blog_posts || 0;
        document.getElementById('services-booked').textContent = userData.services_booked || 0;
        document.getElementById('account-age').textContent = userData.account_age || 0;

        // Update avatar if available
        if (userData.avatar_url) {
            document.getElementById('user-avatar').src = userData.avatar_url;
        }

    } catch (error) {
        console.error('Error loading profile:', error);
        showError('Failed to load profile data. Please try again later.');
    }
}

async function handleProfileUpdate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        full_name: formData.get('full_name'),
        phone: formData.get('phone'),
        bio: formData.get('bio')
    };

    // Only include password fields if they are filled
    const currentPassword = formData.get('current_password');
    const newPassword = formData.get('new_password');
    const confirmPassword = formData.get('confirm_password');

    if (currentPassword && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
            showError('New passwords do not match');
            return;
        }
        data.current_password = currentPassword;
        data.new_password = newPassword;
    }

    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const result = await response.json();
        showSuccess('Profile updated successfully');
        
        // Clear password fields
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        // Reload profile data
        loadUserProfile();

    } catch (error) {
        console.error('Error updating profile:', error);
        showError('Failed to update profile. Please try again later.');
    }
}

async function handleAvatarChange() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch('/api/user/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update avatar');
            }

            const result = await response.json();
            document.getElementById('user-avatar').src = result.avatar_url;
            showSuccess('Avatar updated successfully');

        } catch (error) {
            console.error('Error updating avatar:', error);
            showError('Failed to update avatar. Please try again later.');
        }
    };

    input.click();
}

async function handleLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`
            }
        });

        if (response.ok) {
            sessionStorage.removeItem('session_token');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error logging out:', error);
        showError('Failed to logout. Please try again.');
    }
}

function showError(message) {
    // Implement error notification
    alert(message); // Replace with a proper notification system
}

function showSuccess(message) {
    // Implement success notification
    alert(message); // Replace with a proper notification system
} 