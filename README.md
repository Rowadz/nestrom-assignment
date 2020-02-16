# nestrom-assignment

The steps and status :
1.Create a NodeJS server with any framework you want, we prefer to use hapi but it’s optional. ( DONE )
2. Connect to MongoDB cloud storage using one of the following connection strings ( I ran everything locally ) ( NOT DONE )
3. Create movie, actor and director mongoose schemas with the following ( DONE )
4. Create CRUDs RESTful APIs for all schemas mentioned above. ( DONE )
5. Create a script to insert datasets in the attached CSV file ( I inserted the movie - actors - director into the DB but didn't link them ...)
6. Link MongoDB with Elasticsearch using one of the following modules: ( NOT DONE )
7. Using elasticsearch, Create the following routes: ( NOT DONE )


#### How to run the api ( I used NestJs ) 
* nodejs version: `v10.16.0`

```bash
$ git clone https://github.com/MohammedAl-Rowad/nestrom-assignment.git
$ cd api
$ npm i
# pls go to app.module.ts and update the connection string ( sorry I didn't use .env files... ) line 12
$ npm run start:dev
```
* go to `actors.controller.ts` - `movies.controller.ts` - `director.controller.ts` to see the CRUD routes

#### How to run script that moves the CSV data into mongo 

```bash
$ git clone https://github.com/MohammedAl-Rowad/nestrom-assignment.git
$ cd api
$ npm i 
# pls go to migrationComposer.js and update the connection string ( sorry I didn't use .env files... ) line 6
$ node migration.js
```
