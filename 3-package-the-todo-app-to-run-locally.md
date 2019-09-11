# Module 3: Package the Todo App to Run Locally

In this module, you will clone a GitHub repo that will serve as the starting point for the Node.js app that you will be extending in the next module. To run the app, you will build a docker image that includes Node.js and various dependencies necessary for the application to run. This configuration will allow you to work on the application code from your host operating system while minimizing cross platform issues in this lab setting.

## Objectives

* Download client credentials for secure connections
* Clone the todo application's Git repo
* Build a docker image to host the application
* Run a docker container based on the image

## Required Artifacts

* Git - The todo application is hosted in GitHub so Git is used to clone the repo. If Git isn't available, you may opt to download the repo from GitHub as a zip file and extract the contents where you wish.
* Docker - Docker is a standard tool for packaging and deploying applications, especially when Continuous Integration and Continuous Deployment strategies are used. Here's [a link to a Docker cheat sheet](https://www.docker.com/sites/default/files/Docker_CheatSheet_08.09.2016_0.pdf) which includes examples of the most common commands, such as how to list and remove images and containers.

## Parts

### **Part 1**: Download ATP client credentials (wallet)

With Oracle Autonomous Database, data is encrypted both at rest and over the network. For network encryption to work, clients need to have the correct encryption keys and related connection details. In this part, you'll learn how to access and configure these credentials so that various clients can connect to the database.

1. Within your cloud account, navigate to the Autonomous Transaction Processing service page and click the name of the ATP instance you would like to connect to. This will take you to the Database Details page for that instance.

   ![select atp instance](images/3/select-atp-instance.png)

2. Click the **DB Connection** button to open a dialog with connection related information.

   ![db connection](images/3/click-db-connection.png)

3. Click the **Download** button to download your client credentials.

   ![download](images/3/download.png)

4. Enter **`SecretPassw0rd`** for the **PASSWORD** and **CONFIRM PASSWORD** fields, then click **Download**. *The password entered will not be used in this lab because you will be using an auto-login capable client.* 

   ![password](images/3/password.png)

   After clicking **Download**, the client credentials will be downloaded to your machine as a zip file. These files should be treated securely to prevent unauthorized database access.

5. Extract the contents of the zip file to a directory named **Wallet_TODODB**. Note the absolute path to the client credentials directory on your machine, e.g. `/Users/username/Downloads/Wallet_TODODB`. You'll need this path in Part 4 when mapping a Docker volume.

6. Open the **sqlnet.ora** file in the Wallet_TODODB directory (the directory you extracted to in the previous step). Change the **DIRECTORY** value from `"?/network/admin"` to `"/db_credentials"` (include the double-quotes), then save your changes. In Part 4, the `/db_credentials` path will be mapped to the actual location of the client credentials as a Docker volume.

   If you're working on *Windows*, but sure to extract the contents to a folder somewhere under your user directory (e.g. C:\Users\yourusername).

### **Part 2**: Clone Git repo with the "starter" app

To allow you to focus primarily on the SODA APIs, you will be cloning a starter application. The application is wired up to provide a REST API to a front-end app, but it is not 100% complete. You will finish building out the app in the next module.

1. Open a command line terminal on your machine and navigate to a directory where you'd like to download the starter app, then run the following command:

   ```
   git clone https://github.com/dmcghan/soda-app.git
   ```

   If you're working on *Windows*, but sure to run the clone command in a folder somewhere under your user directory (e.g. C:\Users\yourusername).

2. Once the application has finished downloading, change directories into the **soda-app** directory to see the files included with the app. Note the absolute path to the application directory, e.g. `/Users/username/Documents/soda-app`. You'll need this path in Part 4 when mapping a Docker volume.

### **Part 3**: Build Docker image

In this part, you will build a docker image to host the application downloaded in the previous part.

1. If not already done, open a terminal in the **soda-app** directory (created automatically with the previous docker clone command) where the Dockerfile is located, then run the following command:

   ```
   docker build -t soda-app-image .
   ```

   That command will create an image with the tag **soda-app-image**. The docker image may take a few minutes to build as there are a fair number of dependencies that must be downloaded. While the image is building, take a moment to review the Dockerfile so that you have a better understanding of what's included.

   When complete, the final output of the Docker build should look something like the following:

   ```
   > oracledb@4.0.1 install /usr/lib/node_modules/oracledb
   > node package/install.js
   
   oracledb  ********************************************************************************
   oracledb ** Node-oracledb 4.0.1 installed for Node.js 10.16.3 (linux, x64)
   oracledb **
   oracledb ** To use node-oracledb:
   oracledb ** - Oracle Client libraries (64-bit) must be configured with ldconfig or  LD_LIBRARY_PATH
   oracledb ** - To get libraries, install an Instant Client Basic or Basic Light  package from
   oracledb **   https://www.oracle.com/technetwork/topics linuxx86-64soft-092277.html
   oracledb **
   oracledb ** Installation instructions: https://oracle.github.io/node-oracledb  INSTALL.html
   oracledb  ********************************************************************************
   
   + oracledb@4.0.1
   added 1 package in 0.529s
   + todomvc@0.1.1
   added 51 packages from 37 contributors in 5.782s
   v10.16.3
   6.9.0
   Installed
   Removing intermediate container c6f7d66c1356
   ---> 020db4f0f027
   Step 6/6 : CMD ["pm2-runtime", "/app/process.json"]
   ---> Running in d429b95bf10a
   Removing intermediate container d429b95bf10a
   ---> e99d594b59b9
   Successfully built e99d594b59b9
   Successfully tagged soda-app-image:latest
   ```

### **Part 4**: Run Docker image and test sample app

With the Docker image built, you're now ready to run a container based on the image. In this part, you'll start a docker container which maps some ports and directories on your host machine to the docker container. 

4. Copy the modified command from your text editor and run it in a terminal. This will create and run a Docker container named **soda-app-container** based on the **soda-app-image** image created previously. The last lines in the output from the command should look like the following:
1. Open the **database.js** file in the **config** directory. Replace the `[SERVICE_NAME]` token for the `connectString` property with `TODODB_tp`. That's the appropriate connect string for transaction processing workloads. Additional connect strings can be found in the **tnsnames.ora** file in the client credentials directory. [Click here to learn more about the different connect strings](https://docs.oracle.com/en/cloud/paas/atp-cloud/atpug/connect-predefined.html#GUID-9747539B-FD46-44F1-8FF8-F5AC650F15BE).

2. Copy and paste the following terminal command into your favorite text editor: 

   ```shell
   docker run -it \
     --name soda-app-container \
     -v [APP_DIR]:/app \
     -v [WALLET_DIR]:/db_credentials \
     -p 3000:3000 \
     soda-app-image:latest
   ```

3. In the text editor, replace the `[APP_DIR]` and `[WALLET_DIR]` tokens with the correct values. The `[APP_DIR]` value should be the absolute path to where the starter app was cloned. The `[WALLET_DIR]` value should be the absolute path to where the client credentials were extracted. Here's an example of what the command should look like on a Mac after replacing the tokens:

   ```shell
   docker run -it \
     --name soda-app-container \
     -v /Users/username/Documents/soda-app:/app \
     -v /Users/username/Downloads/Wallet_TODODB:/db_credentials \
     -p 3000:3000 \
     soda-app-image:latest
   ```
  
   If you're running on *Windows*, note the following:

   * The Linux line continuation character (/) will need to be replaced with the caret (^). Alternatively, you may compress the command to a single line. 
   * The exact path for the volume mappings may vary depending on the version of Docker you are using. Forward slashes should be used in place of backslashes and the path should start with either **/c/Users/yourusername** or **//c/Users/yourusername**.
   
   Here's an example of what the command should look like on a Windows after replacing the tokens:

   ```shell
   docker run -it ^
     --name soda-app-container ^
     -v /c/Users/username/Documents/soda-app:/app ^
     -v /c/Users/username/Downloads/Wallet_TODODB:/db_credentials ^
     -p 3000:3000 ^
     soda-app-image:latest
   ```

   If for any reason the `docker run` command fails to finish, you may need to run `docker rm soda-app-container` before running it again.

4. Copy the modified command from your text editor and run it in a terminal. This will create and run a Docker container named **soda-app-container** based on the **soda-app-image** image created previously. The last lines in the output from the command should look like the following:

   ```shell
   Starting application
   Initializing database module
   Initializing web server module
   Web server listening on localhost:3000
   ```

5. Test the image by opening a browser and navigating to **localhost:3000**. If you see the following app, then you're ready to proceed to the next module.

   ![todo app](images/3/todo-app.png)

   If you're running on *Windows* with Docker Toolbox, you will need to add a port mapping to the VirtualBox image created by Docker. In VirtualBox, open the **Settings** dialog for the VM, click **Advanced**, and then select **Port forwarding**. Leave both IP addresses blank and add **3000** for the host and guest ports. Save your changes and test again.

## Summary

This completes Module 3. At this point, you have the starter application running in a docker container. If you test the app by adding some todos, you'll find that the todos are not saved (just refresh the browser to verify). This is because the CRUD functionality for the REST API hasn't been added yet. You'll add that logic using the SODA APIs in the next module. [Click here to navigate to Module 4](4-use-soda-apis-for-crud-operations.md).