Welcome to the Personal-Blog-API wiki!
Article Management API

A simple Article Management REST API built with Node.js, Express, and MongoDB, following a Clean Architecture / Use‑Case Driven design.

The project supports article creation, update, deletion, retrieval, pagination, filtering, and sorting.

The system is structured with clear separation of concerns using:

    Entities
    Use Cases
    Repositories
    Controllers
    Infrastructure (MongoDB / JSON storage)

It also includes unit tests and Docker support for easy deployment.
Features

    Create articles
    Update articles
    Delete articles
    Get article by ID
    Get all articles
    Pagination support
    Filtering by topic and author
    Sorting by date
    Input validation
    Repository pattern
    MongoDB persistence
    Optional JSON file storage
    Dockerized environment
    Unit testing with Jest

Project Architecture

This project follows a simplified Clean Architecture approach:
````
Entities
   ↓
Use Cases
   ↓
Repositories
   ↓
Controllers
   ↓
Express API
````

**Entities**

Business models and validation rules.

Example:
````
`entities/article.js`
````

**Use Cases**

Application logic for specific operations.

Examples:
````
use-cases/create-article.js
use-cases/update-article.js
use-cases/delete-article.js
use-cases/get-article-by-id.js
use-cases/get-all-articles.js
````

**Repositories**

Data access layer.
Two implementations are available:
````
repositories/mongodb/
repositories/json/
````

**Controllers**

HTTP layer connecting Express requests to use cases.
````
controllers/article-controller.js
````

**Infrastructure**

Database connection and application startup.
````
app.js
config/db.js
````

**Project Structure**
````
backend
│
├── entities
│   └── article.js
│
├── use-cases
│   ├── create-article.js
│   ├── delete-article.js
│   ├── update-article.js
│   ├── get-article-by-id.js
│   └── get-all-articles.js
│
├── repositories
│   ├── mongodb
│   │   ├── article-model.js
│   │   └── article-repository.js
│   │
│   └── json
│       └── article-repository.js
│
├── controllers
│   └── article-controller.js
│
├── tests
│   └── unit
│       └── entities
│           └── article.test.js
│
├── config
│   └── db.js
│
└── app.js
````

**Installation**

**1. Clone the repository**
````
git clone https://github.com/yourusername/article-api.git
cd article-api
````

**2. Install dependencies**
````
npm install
````

**3. Create environment file**

Create .env in the project root:
````
PORT=3000
MONGO_URI=mongodb://root:example123@localhost:27017/blogdb?authSource=admin
````

**4. Start the server**
````
npm start
````
Server will run on:
````
http://localhost:3000
````

Running with **Docker**
Build and run
````
docker-compose up --build
````

Services started:

    API → http://localhost:3000
    MongoDB → mongodb://localhost:27017

Stop containers
````
docker-compose down
````

API Endpoints

Create Article
POST /articles

Request body:
````
{
  "topic": "Node.js Architecture",
  "content": "This article explains clean architecture in Node.js...",
  "author": "Ali",
  "date": "2025-10-15"
}
````

Response:
````
201 Created
````



**Get All Articles**

GET /articles
Query parameters:
````
?page=1
&limit=10
&sort=date-desc
&topic=node
&author=ali
````
Example:
````
GET /articles?page=1&limit=5&sort=date-desc

Response:

{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
````



**Get Article by ID**

GET /articles/:id
Example:

````
GET /articles/64a12c7b8d21
````



**Update Article**

PUT /articles/:id
Request body:
````
{
  "topic": "Updated Topic",
  "content": "Updated article content...",
  "author": "Ali"
}
````



**Delete Article**

DELETE /articles/:id
Response:
````
{
  "message": "Article deleted successfully",
  "id": "article_id"
}
````



Validation Rules

Articles must follow these rules:

    topic
        required
        minimum length: 3 characters

    content
        required
        minimum length: 20 characters

    author
        required

    date
        must be a valid date or ISO string

Validation is handled in the Article Entity.
Testing

The project includes unit tests for the Article entity.

Run tests with:
````
npm test
````

Tests verify:

    validation rules
    edge cases
    correct date normalization
    minimum length constraints

Technologies Used

    Node.js
    Express.js
    MongoDB
    Mongoose
    Docker
    Jest

Design Patterns Used
Clean Architecture

Separates business logic from infrastructure.
Repository Pattern

Abstracts database access.
Use Case Pattern

Each business operation is implemented as a dedicated class.
Future Improvements

Possible enhancements:

    authentication (JWT)
    role based access
    article categories
    full text search
    caching
    integration tests
    API documentation with Swagger
