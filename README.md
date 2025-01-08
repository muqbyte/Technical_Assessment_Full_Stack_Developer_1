# Interview Task: Full Stack Application Development
## Objective
This is the complete full-stack applications for mananging "items". This project consist of a front end application that use React.js, Redux Toolkit and TailwindCSS. For the backend API built with Express.js

## Instructions for backend
1. git clone this repo
2. Navigate to the backend directory
3. Before you run it, please change the MySQL database credential to your own configuration
4. run npm install
5. then run npm run dev
6. The insturction as stated below

```
git clone https://github.com/muqbyte/Technical_Assessment_Full_Stack_Developer_1.git

cd .\backend

npm install

npm run dev
```

### Backend explanation
1. This backend use Typescript, Joi and nodemon
2. It connect to the MySQL database locally
3. Joi use to validate incoming request
4. It have 4 endpoints
5. POST /api/items - Create a new item
6. GET /api/items - Get all items.
7. GET /api/items/:id - Get an item by its id.
8. PUT /api/items/:id - Update an existing item by its id.
9. DELETE /api/items/:id - Delete an item by its id.


### Instruction for frontend
1. If you already clone this repo, navigate your directory to frontend
2. Run npm install
3. Change the url endpoint
4. Run npm run dev
5. The instruction as stated below

```
cd .\frontend

npm install

npm run dev
```

### Frontend explanation
1. This frontend use Typescript, TailwindCSS for styling and responsiveness and axios
2. It only have a single page for submitting data and data visualisation
3. For submitting to the POST /api/items, it uses redux for state managenemnt
4. All the CRUD process is located inside Hooks folder
