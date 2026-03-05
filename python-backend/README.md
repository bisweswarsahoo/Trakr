# Trakr Python Backend

This is the primary Python (FastAPI) backend for the **Trakr** application. It provides a robust, production-ready RESTful API for handling user authentication, financial transactions, categories, and report generation.

## Features ✨

- **Authentication System**: Secure JWT-based login and registration (using `passlib` and `python-jose`).
- **RESTful API**: Fast and fully documented endpoints built with FastAPI.
- **Database**: PostgreSQL integration using SQLAlchemy ORM.
- **Data Validation**: strict request/response validation and serialization with Pydantic.
- **Database Migrations**: Managed via Alembic (if schema changes are required later).
- **Interactive Documentation**: Auto-generated Swagger UI and ReDoc for easy API testing and exploration.

## Tech Stack 🛠️

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3.10+
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Data Validation**: Pydantic
- **Authentication**: JWT & Bcrypt
- **Migrations**: Alembic

## Getting Started 🚀

### Prerequisites

- [Python](https://www.python.org/) (v3.10+)
- [PostgreSQL](https://www.postgresql.org/) server running locally or remotely

### 1. Database Setup

Ensure PostgreSQL is running and create the necessary database. For example:

```bash
createdb expense_tracker
```

### 2. Installation

Navigate to the `python-backend` directory:

```bash
cd python-backend
```

Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the root of the `python-backend` directory by copying the example file:

```bash
cp .env.example .env
```

Make sure to update the `.env` file with your specific PostgreSQL connection string (e.g., `DATABASE_URL=postgresql://user:password@localhost/expense_tracker`) and a secure `SECRET_KEY`.

### 4. Running the Server

Start the FastAPI development server using Uvicorn:

```bash
uvicorn app.main:app --reload
```

The server will be available at `http://127.0.0.1:8000`.

### 5. API Documentation

Once the server is running, you can explore and test the API endpoints interactively:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Project Structure 📂

```
app/
├── api/              # API router endpoints (auth, categories, expenses, etc.)
├── core/             # Configuration settings and security (JWT, hashing)
├── models/           # SQLAlchemy database models
├── schemas/          # Pydantic schemas for data validation
├── database.py       # Database connection setup
└── main.py           # FastAPI application entry point
alembic/              # Database migration configurations
requirements.txt      # Python dependencies
```
