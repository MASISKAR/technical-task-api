# Shopping mall app API

## Developer Setup

---
## Requirements

You will need install `Node.js >= v14` and `MongoDB >= v5`  in your environement.

## Project installation and usage

### Install dependencies
    npm install

### Environment variables
Copy the configuration file located in `/config/env/` .env.sample, remove the `.sample` extension from the copy and set configs depending on your environment
    ```
    .env.sample -> .env
    ```
### Database
MongoDB transactions are used in this project, so in order for the transactions to work properly, you need to initialize a replica set.
To initialize a replica set, you can follow the steps below:
1. Add the replica set configuration in the MongoDB configuration file (mongod.conf) 
    ```
    replication:
        replSetName: "rs0"
    ```
2. Start the MongoDB server
3. Open a new terminal and connect to the MongoDB server (```mongo``` or ```mongosh```)
4. Run the following command to initialize the replica set
    ```
    rs.initiate()
    ```
5. You can check the status of the replica set by running the following command
    ```
    rs.status()
    ```

### Running the project

    npm start

## Notes
### ``By default, the API host is http://localhost:3001``
### For the Swagger documentation, please go to [http://localhost:3001/api-docs](http://localhost:3001/api-docs) and explore the API
