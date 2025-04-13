from database.db import Database

def create_admin_user():
    db = Database()
    
    # Admin user details
    name = "Enoch Osenwafulah"
    email = "enochosenwafulah@gmail.com"
    password = "e2n3o4c50987#$"
    
    try:
        # Create the user
        success = db.create_user(name, email, password)
        
        if success:
            print("Admin user created successfully!")
            print(f"Email: {email}")
            print(f"Password: {password}")
        else:
            print("Failed to create admin user. User might already exist.")
            
    except Exception as e:
        print(f"Error creating admin user: {str(e)}")

if __name__ == "__main__":
    create_admin_user() 