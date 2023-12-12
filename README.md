# CRUD Operations Using Node JS, Typescript and PostgreSQL

## Step 1
Create Database and table using:

CREATE DATABASE pg_db1;
\c pg_db1

CREATE TABLE users (
id uuid DEFAULT uuid_generate_v1 (),
name VARCHAR (50) UNIQUE NOT NULL,
email VARCHAR (100) UNIQUE NOT NULL,
password VARCHAR (50) NOT NULL,
role VARCHAR (50) NOT NULL,
PRIMARY KEY (id)
);

### Add one user in the table to perform the crud operations
INSERT INTO users (name, email, password, role)
VALUES ('Gayatri', 'gayatri@gmail.com', '12345', 'admin');

## Step 2
After cloning the project, install the packages using:
npm i

## Step 3
Set up envionment variables related to database connection in .env file

## Step 4
Run the Program using:
npm start

## Step 5
Check the APIs on Postman:

# APIs:

1.  **login(http://localhost:3000/login)**
   
    Get token from this api and use it in Headers' 'authorization' to perform crud operations.

    Output:{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7Im5hbWUiOiJHYXlhdHJpIiwiZW1haWwiOiJnYXlhdHJpQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzAyMjg2NDM1LCJleHAiOjE3MzIyODY0MzV9.QdAOQtUaToflhYdYi1EKHEnrqM7Fb4BRCp40MV99utw"
    }

2.  **getAll(http://localhost:3000/getAll)**

    output: Array of all users

3.  **get/{id}**
   
    output:
    {id: "21dbc60e-958f-11ee-8f05-5405dbf465db",
    name: "Gayatri
    email: "gayatri123@gmail.com"
    password: "12345",
    role: "admin"}

4.  **create(http://localhost:3000/create)**
   
    input: {
    name: "Sakshi",
    password: "222",
    email: "sakshi@gmail.com",
    role: "user"
    }

5.  **update/{id}(http://localhost:3000/update/{id})**
   
    input:{
    name: "Sakshi",
    password: "222",
    email: "sakshi123@gmail.com",
    role: "user"
    }

6.  **delete/{id}(http://localhost:3000/delete(id))**
