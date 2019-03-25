# Databases Course 2019-03-23

Example application for the databases course.

## Introduction

What is a database
- a software for saving data in an ordered way
- has a query language to retrieve data

Example: SQL statement + data
![SQL](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/DVD_Rental_Query.png/800px-DVD_Rental_Query.png)

Try Online (German example):  
https://www.sachsen.schule/~terra2014/sql_abfragen.php

Try online (English example):  
https://sqlzoo.net/wiki/SELECT_basics

## Relational Databases

Download MySQL:  
https://dev.mysql.com/downloads/mysql/

Start MySQL:
```
cd /usr/local/mysql/bin
```
```
./mysql -u root -p
```

Show databases:
```
SHOW DATABASES;
```

Create new database:
```
CREATE DATABASE school;
```

Switch database:
```
USE school
```

Close:
```
QUIT
```

Create table:
```
CREATE TABLE students
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the student
  email           VARCHAR(150) NOT NULL,                # Email address of the student
  address         VARCHAR(260),                         # Invoice address
  PRIMARY KEY     (id)                                  # Make the id the primary key
);
```

Show tables:
```
SHOW TABLES;
```

See what columns our table has:
```
DESCRIBE students;
```

Insert values:
```
INSERT INTO students ( name, email, address) VALUES
  ( 'Stefan', 'stefan@gmail.com', 'Hauptstr. 1, 22679 Hamburg' ),
  ( 'Anna', 'anna@hotmail.de', 'Rödingsmarkt 4, 22089 Hamburg' ),
  ( 'Michael', 'info@micha.me', null);
```

Show values:
```
SELECT * FROM students;
```

Tables
- Table = entity
- Columns = attributes
- Rows = records

### Relations

Add column `trainer` to `courses`:
```
ALTER TABLE courses ADD trainer INT(10) UNSIGNED;
```
Add reference `id` of `trainers`:
```
ALTER TABLE courses ADD FOREIGN KEY (trainer) REFERENCES trainers(id);
```

Create table `bookings`, where student and course are foreign keys:
```
mysql> create table bookings (
    -> id INT unsigned NOT NULL AUTO_INCREMENT,
    -> student INT(10) unsigned,
    -> course INT(10) unsigned,
    -> PRIMARY KEY (id),
    -> FOREIGN KEY (student) REFERENCES students(id),
    -> FOREIGN KEY (course) REFERENCES courses(id)
    -> );
Query OK, 0 rows affected (0.05 sec)
```

Relations:
- Primary key, foreign key
- the table of the "many" side of the relation has the attribute with the foreign key reference
- whenever we see a lot of repetitive information in a table, that means we probably did something wrong
- solution: split it up in tables that keep the relationship

Cardinality
- one to many
- one to one
- many to many
- "many" = any number of

ER diagram cheat sheet  
https://www.vivekmchawla.com/erd-crows-foot-relationship-symbols-cheat-sheet/

### Joins

Problem:  
We want to see all the information about the students of course `HTML and CSS`.  
How to query that?

Solution: Joins  
Start with a rather small query, expand from that
```
select bookings.id, courses.name from bookings JOIN courses on bookings.course = courses.id;
```
```
select students.name, bookings.id from students JOIN bookings on students.id = bookings.student;
```
Now we additionally want to see courses.name:
```
select students.name, bookings.id, courses.name from students JOIN bookings on students.id = bookings.student JOIN courses on courses.id = bookings.course;
```
We don't need to see that bookings.id:
```
select students.name, courses.name from students JOIN bookings on students.id = bookings.student JOIN courses on courses.id = bookings.course;
```
And now, we only want these of HTML and CSS:
```
select students.name, courses.name from students JOIN bookings on students.id = bookings.student JOIN courses on courses.id = bookings.course and courses.name = 'HTML and CSS';
```

Delete a column:  
```
ALTER TABLE Customer DROP Birth_Date;
```
Delete a table:
```
DROP TABLE students;
```

Two kinds of keys:  
1 - surrogate keys (e.g. UUID)  
2 - natural keys (email address)  
If you use natural keys, you need to make sure that it will never change (email!)  

https://dev.mysql.com/doc/mysql-getting-started/en/

MySQL GUI for Mac:  
https://sequelpro.com/


## Document-based Databases

What does document-based mean?  
Everything is stored in documents  
In the case of MongoDB: JSON

Example:
```
{
  "FirstName": "Stefan", 
  "Email": "stefan@gmail.com",
  "Address": "Hauptstr. 1, 22679 Hamburg"
}
```

Install MongoDB:  
```
brew tap mongodb/brew
```
```
brew install mongodb-community@4.0
```
Run MongoDB:
```
mongod --config /usr/local/etc/mongod.conf
```
In new terminal:
```
mongo
```

CRUD

Create Collections:  
> If the collection does not currently exist, insert operations will create the collection.

Create item:
```
db.students.insertOne(
  {
    "FirstName": "Stefan", 
    "Email": "stefan@gmail.com",
    "Address": "Hauptstr. 1, 22679 Hamburg"
  }
)
```
Automatically creates an ID for you:
```
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5c90fa4267a2421b44abf4e8")
}
```

Create multiple items:
```
db.students.insertMany([
  {
    "FirstName": "Anna", 
    "Email": "anna@hotmail.de",
    "Address": "Rödingsmarkt 4, 22089 Hamburg"
  },
  {
    "FirstName": "Michael", 
    "Email": "info@micha.me"
  }
])
```

Query all:
```
db.students.find({})
```

Query particular:
```
db.students.find({ "FirstName": "Anna" })
```

Query operators:
```
db.students.find( { "FirstName": { $in: [ "Anna", "Michael" ] } } )
```

Do more complex queries:  
https://docs.mongodb.com/manual/tutorial/query-documents/

Task:
- pick one, show it to the others

Update operators:
```
db.students.updateOne(
   { "FirstName": "Michael" },
   {
     $set: { "Address": "Borselstraße 7, 22765 Hamburg" }
   }
)
```

More complex operations:  
https://docs.mongodb.com/manual/tutorial/update-documents/

Delete all documents matching operator:  
```
db.students.deleteMany({ "FirstName": "Anna" })
```

Delete first document that matches:
```
db.students.deleteOne({ "FirstName": "Anna" })
```

Delete all:
```
db.students.deleteMany({})
```

Close the connection:
```
> exit
bye
```

Documentation:  
Install: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/  
Insert: https://docs.mongodb.com/manual/tutorial/insert-documents/  
Query: https://docs.mongodb.com/manual/tutorial/query-documents/  
Update: https://docs.mongodb.com/manual/tutorial/update-documents/  
Delete: https://docs.mongodb.com/manual/tutorial/remove-documents/

Example application:

Check if node is installed:
```
node -v
```

Check if npm is installed:
```
npm -v
```

Check if mongo is installed:
```
mongo --version
```

Install Turbo:  
Turbo 360 https://www.turbo360.co/
```
sudo npm i -g turbo-cli
```
Verify installation:
```
turbo version
```

Create a new project with Turbo:
```
turbo new example
```
Do the first 2 steps in the tutorial.
```
cd example
```
```
npm install
```

In `app.js`, we need the initialization of the express/vertex app with the configuration with the database in it.
Remove line 4 and uncomment the setup below.

Replace the content of `url` with a mongodb url:
```
url: 'mongodb://localhost/mongo-example',
```

Run a local server:
```
turbo devserver
```
If it shows a message like `DB Successfully Connected!`, you did everything right.  
If it shows an error message, we need to start mongo in a new tab with `mongod`.  
See if you can see your app in your browser: `http://localhost:3000/`

Mongoose:  
https://mongoosejs.com/

Create a model:

In your project folder, create a folder `model`.  
Create a file `Student.js`.  
Import mongoose: 
```
const mongoose = require('mongoose')
```
Create a new Schema:
```
const Student = new mongoose.Schema({

})
```
Export it:
```
module.exports = mongoose.model('Student', Student)
```
In the Schema we define all attributes.  
Add each one as empty JSON:
```
  firstName: {},
  lastName: {},
  email: {},
  address: {},
  number: {}
```
For each, we define the data type, either as `type:String` or `type:Number`.  
For each, we can define a default value: `default:''` or `default:0`.  
For the string values, we can say it should trim it: `trim:true`.  

Create routes:  

We need routes, because we want to create a REST api (remember Postman).  
We want to implement CRUD.  
One route per operation: `GET`, `POST`, `UPDATE`, `DELETE`.  
These are also called **endpoints**.

Create route for students:  
Go to `/routes/api.js`.  
Delete routes that are there.  
Add a route for `/student`:  
```
router.get('/student', (req, res) => {
  res.json({
    confirmation: 'success',
    data: 'this is the student endpoint'
  })
})
```
In your browser, go to `http://localhost:3000/api/student`

> **Problem: Error: listen EADDRINUSE: address already in use :::3000**  
> control + C  
> killall node  

Get data from database using mongoose:  
Import your model: `const Student = require('../model/Student')`.  
Edit the endpoint to return all:  
```
router.get('/student', (req, res) => {
Student.find()
  .then(students => {
    res.json({
      confirmation: 'success',
      data: students
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      data: err.message
    })
  })
})
```

Create students seed data:  
- create a folder `initial` and in there a file `students.json`
- what we will create needs to be consistent with the schema that we created
- fill file with some dummy data
- odd: we will not use commas between objects, and no array (`[]`)
- VS Code will mark it as invalid, but that's ok

Create a database for students:  
- cd into our folder `initial`
- we will use a tool called `mongoimport`
- recall the name of the database, what we put into `app.js`? e.g. `mongo-example` - we need that now
- collection: that is a new collection in the database, we can pick the name (`students`)
- file: our json file that we just wrote (`students.json`)
- `mongoimport --db mongo-example --collection students --file students.json`
- output something like:
```
2019-03-22T13:32:03.138+0100	connected to: localhost
2019-03-22T13:32:03.264+0100	imported 4 documents
```

Test it:
- run `turbo devserver` if it's not already running
- in your browser, go to `http://localhost:3000/api/student`
- we see data! :)
- `_id`: is created automatically by mongo

Create routes for queries
- this is done in `api.js`, in the `.find(...)` method of mongoose
- example: `Students.find({ number:3 })`
- we want to take the parameter from the url: `http://localhost:3000/api/student?number=3`
- in `api.js` get this from the request: `const query = req.query`
- this is already in json format, thanks to mongoose
- so we can pass it to Students: `Stundents.find(query)`
- we can do that with anything!

Query for ids:  
- we want to get a certain student
- like: `http://localhost:3000/api/student/1`
- in `api.js` create a new route:
```
router.get('/student/:id', (req, res) => {
	
})
```
- we can get the id by `req.params.id`: `const id = req.params.id`
- for now, let's just return the id:
```
res.json({
  confirmation: 'success',
  data: id
})
```
With mongoose, we can use `findById()`:
```
Student.findById(id)
  .then(student => {

  })
  .catch(err => {

  })
```

Task: return data like in the call before

Create new data with POST requests:
```
router.post('/student', (req, res) => {
	
})
```
As the response, we first return a hardcoded response, with the request body
```
res.json({
  confirmation: 'success',
  data: req.body
})
```

Postman: try post `http://localhost:3000/api/student` with some body

Usually, you create a website with a form to submit the data.  
- go to `/views/index.mustache`
- mustache is a templating engine, installed by default with turbo
- delete everything except the first `<div>` under "Welcome to Turbo"
- create a `<form>` with one `<input>` for every field in our students JSON
```
<form>
  <input type="text" name="firstName" /><br/>
  <input type="text" name="lastName" /><br/>
  <input type="text" name="email" /><br/>
  <input type="text" name="adress" /><br/>
  <input type="text" name="number" /><br/>
</form>
```
- add placeholders to see what is what: `<input type="text" name="firstName" placeholder="First Name" /><br/>`
- add a submit button: `<input type="submit" value="Add Student" />`
- right now it points to nothing, but we want to submit our student data and save it into the database
- edit form tag: `<form action="/api/student" method="post">`
- method is corresponding to our `router.post()` method
- action points to our endpoint that we specified there

We can use mongoose for that:
```
Student.create(req.body)
  .then(student => {
    res.json({
      confirmation: 'success',
      data: student
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      data: err.message
    })
  })
```

Updating a student object:  
```
router.update('/student', (req, res) => {
	
})
```
First, hard-code response and try it out:  
```
res.json({
  confirmation: 'success',
  data: 'this is the update endpoint'
})
```
We want to update something like this:  
`http://localhost:3000/api/student/update?id=5c94d5c328e7635dc9b61e56&lastName=Lehmann`

Get the id from the query:
```
const query = req.query
const id = query.id
```
Then we can use mongoose's `findByIdAndUpdate()`:
```
Student.findByIdAndUpdate(id, query, {new:true})
  .then(student => {
    res.json({
      confirmation: 'success',
      data: students
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      data: err.message
    })
  })
```
`{new:true}` says that mongoose returns the changed object rather than the original one

Deleting Students:  
```
router.delete('/student/remove', (req, res) => {
	
})
```
The `remove` path is not really necessary, but we use it here to make sure we don't delete by mistake.

We again use the id from the query:
```
const query = req.query
const studentId = query.id
```
And then it's in a similar form:
```
Student.findByIdAndRemove(studentId)
  .then(data => {
    res.json({
      confirmation: 'success',
      data: 'Student '+studentId+' successfully removed.'
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      data: err.message
    })
  })
```

