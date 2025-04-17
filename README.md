# Coding Temple Module 7 Project: Marvel Character Full-Stack Application

This project is a full-stack web application that allows users to view, add, update, and delete Marvel characters. It combines a React-based frontend with a Flask/MySQL backend for managing character data. The backend side was pre-exisiting for this assignment.

## Features

- **View Characters**: Browse a list of Marvel characters with their details, including name, alias, alignment, powers, and image.
- **Add Characters**: Add new characters to the database using a form.
- **Edit Characters**: Update existing character details.
- **Delete Characters**: Remove characters from the database.
- **Responsive Design**: The frontend is designed to work across various devices and screen sizes.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React-Bootstrap**: For styling and responsive components.
- **Vite**: For fast development and build tooling.

### Backend (Backend was pre-exisiting for this assignment)
- **Flask**: A lightweight Python web framework for building RESTful APIs.
- **Flask-SQLAlchemy**: For database interaction and ORM.
- **Flask-Marshmallow**: For data serialization and validation.
- **Flask-CORS**: To enable cross-origin requests.

### Database
- **MySQL**: For storing character data.

### Other Tools
- **SQLAlchemy**: For database schema definition and queries.
- **Marshmallow**: For schema validation.
- **MySQL Connector**: For connecting Flask to the MySQL database.

## How to Run the Application

1. Clone repository

### Backend
1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
- On Windows:
    ```bash
    venv\Scripts\activate
    ```
- On macOS/Linux:
    ```bash
    source venv/bin/activate
    ```
4. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the Flask server:
- server.py

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
    ```bash
        npm install
    ```
3. Start the development server:
    ```bash
        npm run dev
    ```

### Database Setup
Ensure MySQL is installed and running.
The database will be created automatically when the Flask server starts, using the create_database function in server.py. Pre-populated character data is available in marvel_characters.sql.



