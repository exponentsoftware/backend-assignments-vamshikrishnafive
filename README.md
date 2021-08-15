# Backend Assignment

## TODO List

- Create APIs to get all, get by id, add, update by id and delete by id a TODO list
- Should use MongoDB as a database
- API should not have any additional routes

Fields required in Todo list:

- user name
- title for todo
- field to track whether task is complete or not
- created at
- updated at
- category (work, hobby, task)


### Prefered Technologies

| Environment  | Framework  |
|--------------|------------|
| Backend APIs | Express Js |
| Database     | MongoDB    |
| ORM/ODM      | Mongoose   |

### Days 2

In the existing APIs that you have created in day 1, add filters to the todo list
Get all todo list should be able to have additional filters to :
fetch by category
search by title
Add capability to sort the data by created_at
Add api to mark Todo as done, can you use an exisiting api to achieve this?

### Days 3

Add User collection to store below user information:
User name
email
phone
created at
updated at
role
Add validation on phone and email from the Mongoose schema itself with error message handling
Link Todo list with User
Create api to get TODO list for User
Create User roles for Admin 0, App user 1
User with Admin role should be able to get all Todos
User with App user role, should be able to fetch only his Todo list


### Days 4

TODO List with Authentication
Use Passport Js and add authentication to your App
Create Register and Sign in APIs and on successful signin use Token based authentication
Signed in User should only be able to call the routes
Create a basic html page and serve it using express app
Html page for Register, Sign in and display users Todo list should be created


### Days 5

TODO List with Pagination
Add Pagination on all get routes
Api should be able to take in two fields - page number and no. of records
Pagination should work with existing features
Create an API to get number of registered users for the Day
Create API to get active users for the below:
for current day
for a week
for a month

### Days 6

TODO Aggregation
Create API to get all completed task per Learner
Add Sorting logic to sort by Users who have completed maximum task 
Add a collection to store views for Task, likes and ratings
Create one API to get task either by most views, likes and ratings

### Day 7

Backend Assignment
TODO List with Postgres/Sequelize
Migrate your entire application created in Previous Assignment to use Postgres as DB and Sequelize as ORM
Prefered Technologies
Environment	Framework
Backend APIs	Express Js
Database	Postgres
ORM/ODM Sequelize

### Day 8

TODO with comments and Tags
Add 2 new schemas

One for Comments:
text
created_at
updated_at
posted_by (user_id)
You can create flat comments or nested comments
Another for Tags:

title
created_at
updated_at
category

Every TODO list can have multiple comments
Every Tag can be part of multiple TODO list and every TODO list can have multiple tags
Create APIs for Adding/Updating/Reading Comments on a TODO list
Delete and Update comment should only be allowed for Admin Users or for the user who added the comments
Create APIs for Adding/Updating Tags and on a TODO list
Delete and Update tags should only be allowed for Admin Users
Users can add Tags, update tags on their own TODO list
Update API for TODO list to send comments and tags

Prefered Technologies
Environment	Framework
Backend APIs	Express Js
Database	Postgres
ORM/ODM