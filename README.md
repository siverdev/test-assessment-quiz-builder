## Setup Instructions

Follow these steps to get the app running locally.

### 1. Backend

1. Navigate to the backend directory:
```bash
   cd backend
```

2. Install dependencies:
```bash
    npm install
```

3. Create a .env file and configure your database connection and port:
```bash
DATABASE_URL=file:./dev.db
PORT=5000
```
(app uses SQLite with DATABASE_URL=file:./dev.db)

### 2. Database

1. Run database migrations
```bash
npx prisma migrate dev
```

2. Generate Prisma client 
```bash
npx prisma generate
```
3. Optionally, open Prisma Studio to view the database
```bash
npx prisma studio
```

4. Optionally, run seed script on backend to create sample data
```bash
npm run db:seed
```

5. Start the backend server
```bash
   npm run dev
```

### 3. Frontend

1. Navigate to the frontend directory
```bash
   cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file and configure the API base URL
```bash
API_URL=http://localhost:5000
```
(where 5000 is the PORT from backend .env)

4. Start the frontend server
```bash
   npm run dev
```

5. Open the app in your browser at http://localhost:3000


## Creating a sample quiz
There are three ways to create a sample quiz:

#### Option 1: Using the Frontend Interface

1. Open the frontend app in your browser: http://localhost:3000/create
2. Navigate to the create page
3. Fill in the quiz title
4. Add one or more questions  
5. Submit the form to save the quiz to the database


#### Option 2: Using the Seed Script

```bash
cd backend
npm run db:seed
```
(Running the seed script will remove all existing data in the database and replace it with the sample data)

#### Option 3: Using Postman or API Client
You can create a quiz by sending a POST request to the backend API:
Endpoint: ```POST http://localhost:5000/quizzes```

Example JSON body:
```json
{
  "title": "Another Quiz",
  "questions": [
    {
      "text": "What is the capital of France?",
      "type": "BOOLEAN",
      "options": [
        { "text": "Paris" },
        { "text": "London" },
        { "text": "Berlin" }
      ]
    },
    {
      "text": "Select all prime numbers",
      "type": "CHECKBOX",
      "options": [
        { "text": "2" },
        { "text": "3" },
        { "text": "4" },
        { "text": "5" }
      ]
    },
    {
      "text": "Explain the theory of relativity",
      "type": "INPUT"
    }
  ]
}
```