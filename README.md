# Challenger React

## About Project

This protection has the server and the client, the server is an API made in Node.js and the client is made in ReactJS. It aims to create an API that fulfills the following requirements:

- Service that locates/returns employees by Name;
- Service that locates/returns employees by CPF;
- Service that locates/returns employees by Position;
- Service that locates/returns employees by Registration Date;
- Service that returns employees grouped by UF of Nascimento, in a quantitative way;
- Service that locates/returns employees by salary range;
- Service that locates/returns employees by status;
- Service to add a new employee (if the employee already exists, just update);
- Service to exclude an employee by CPF number;


## About Server

##MongoDB

MongoDB is an open source, cross-platform, classified NoSQL database software.

- [Wikipedia](https://pt.wikipedia.org/wiki/MongoDB)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Settings


### settings MongoDB database

Configure MongoDB locally using data from [MongoDB Atlas for free](https://mongodb.com/atlas).

- First step is to create a shared cluster following print https://prnt.sc/Nkuag7M6Hl8f
- You need to create a username and password of your choice. - https://prnt.sc/j4QRx9Rwied4

### Setting environment variables

Copy variables from file`env.example` for the`.env`:

```bash
 .env.example
```

Set each variable on `.env`:

- Follow the print as an example  https://prnt.sc/z6bYjrebarJF which by default I usually run on port 27017 

- `MONGODB_URL` - In this variable you must put the MongoDB connection string from [MongoDB Atlas](https://mongodb.com/atlas) you can find it by clicking "Connect" in your cluster.

- `PORT` - In this variable you must put the port that will be used to raise the system.



### Connecting to MongoDB


- Connecting the Cluster, you just have to click on connect opening this modal - https://prnt.sc/61uTJx3DypBe in the first tab in green

```Add You Current Ip Address ```
- Right after just click on Add Ip Address https://prnt.sc/hMQX-vfYkebk

- Now connect our application by clicking ```Connect your application ``` https://prnt.sc/YDtRx0c-QG4S

- Now you will copy the generated url by clicking on the copy icon and this will be our mongodb url https://prnt.sc/TEyUNEyDVsF6

- following this way https://prnt.sc/_5Lkc_yuUuQw

- To finish where it is written password you must put your admin password created in the cluster where we did in the previous step remembering to remove the <> signs following the print as an example https://prnt.sc/fKvwuZX3rYuk

### Starting the project


```bash
go into the client folder and type the command in the npm terminal
enter the server folder and type the command in the npm terminal

You will have to open a second terminal leaving 2 open
First use the npm start command inside the server folder
Then use the npm start command inside the client folder


Only that will work our project
```
#### Scripts
Before testing the scripts it is necessary to configure the puplate in the server terminal, run the following command

```
npm run populate
```

Then run the next command

```
npm run test
```

### Documentation



The API documentation was done with swagger-ui you can access it in the /api-docs route

To access this route you will have to configure your localhost to 5000 providing the doc /api-docs

following this way http://localhost:5000/api-docs

---


## This project uses SASS 4.14.1

So that there is no problem, check if the node version you are using supports [Sass](https://sass-lang.com/).

## Implemented Pages


This application consumes only the routes that use the GET verb. The goal should be to consume all routes created on the server.


### Project explanation


 The part of creating employees is the most complete part, so we have to follow some rules in this filling where I put
- Our id will only be used to update information so we only pass the id when updating and that also for the registration date otherwise it will not be able to find the registered user.
- For the rest, we can easily make a user on that date, filling in the fields correctly, he will always create a user
on the current date.
- There is a rule in the cpf where it tests our cpf , it validates the cpf if it is real.
- Remembering that the id and the date of registration are created automatically, you would register a user using the name.

Explanatory Video https://files.fm/f/x5e3w6k9c (pt-BR) of how the program works
