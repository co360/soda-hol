# Lab 1: Create a DB user with SODA privileges

## Introduction

When you create an Autonomous Transaction Processing (ATP) database instance, you are prompted for a password for the ADMIN user. The ADMIN user account should be used for administrative purposes only, not for typical application development. In this lab, you will use the ADMIN account to create a new user for the todo tracking app.

## Objectives

- Sign-in to the Oracle Public Cloud
- Connect to an ATP instance from SQL Developer Web
- Create a database user with SODA privileges

## Required Artifacts

- Oracle Public Cloud account credentials - You may use your own cloud account, a cloud account that you obtained through a trial, or a training account provided by an Oracle instructor.
- ATP instance and ADMIN credentials - This lab assumes that an ATP instance has already been created and that you have the ADMIN password. You may create an ATP instance if needed before continuing, just make a note of the ADMIN password specified when creating the instance.

# Create a DB user with SODA privileges

## Steps

### Step 1: Sign in to the Oracle Cloud Infrastructure console

In this step, you will sign into your Oracle cloud account so that you can work with various services using a GUI.

- Go to cloud.oracle.com, click **Sign In** to sign in with your Oracle Cloud account.

  ![sign in](images/1/signin.png)

- Enter your **Cloud Account Name** and click **Next**.

  ![account name](images/1/account-name.png)

- Enter your **User Name** and **Password**, then click **Sign In**.

  ![user name and password](images/1/user-name-and-password.png)

  Once you've successfully authenticated, you'll be redirected to the Oracle Cloud Infrastructure dashboard where you can start working with various cloud services.

### Step 2: Connect to ATP from SQL Developer Web

The easiest way to connect to an ATP instance is using SQL Developer Web. In this step, you will learn how to access SQL Developer Web and log in with the ADMIN account.

- Open the services menu by clicking the Navigation Drawer icon in the upper left-hand corner, then select Autonomous Transaction Processing.

  ![services menu atp](images/1/services-menu-atp.png)

- Click the name of the ATP instance you would like to connect to. This will take you to the Database Details page for that instance.

  ![select atp instance](images/1/select-atp-instance.png)

- Click the **Service Console** button. This will open the ATP Service Console in a new window.

  ![click service console](images/1/click-service-console.png)

- Click the **Development** option in the menu on the left, then click the **SQL Developer Web** option. This will open SQL Developer Web in a new window.

  ![click service console](images/1/click-development-sql-dev-web.png)

- Log into SQL Developer Web using **admin** as the user name (case insensitive) and the admin password (case sensitive) that was provided when the ATP instance was created, then click **Sign in**.

  ![click service console](images/1/sql-dev-web-auth.png)

  Once authenticated, you should see a GUI similar to SQL Developer that will allow you to work with the ATP instance.

  ![click service console](images/1/sql-dev-web.png)

### Step 4: Create a database user with SODA privileges

Now that you are connected to the database as the ADMIN user, you will use that account to create a new user/schema that will be used for the todo app. 

- Enter the following code in the **[Worksheet]**:

  ```sql
  create user todo_soda 
  identified by "SecretP@ssw0rd"
  default tablespace data
  temporary tablespace temp;

  alter user todo_soda quota unlimited on data;

  grant connect to todo_soda;
  grant resource to todo_soda;
  grant create view to todo_soda;
  grant soda_app to todo_soda;
  ```

  The last line of the code is the most significant with respect to SODA. That line grants the **SODA_APP** role to the **TODO_SODA** user, giving that user the necessary privileges to use the SODA APIs.

- To run the code, click the "Run Script" button.

  ![run script](images/1/run-script.png)

  Look at the **Script Output** tab at the bottom of the worksheet to ensure the script ran successfully.

  ![run script](images/1/script-output.png)

- Finally, execute the following script as before. This will allow the **TODO_SODA** user to connect to SQL Developer Web as well:
  ```sql
  begin

    ords_admin.enable_schema(
      p_enabled => true,
      p_schema => 'TODO_SODA',
      p_url_mapping_type => 'BASE_PATH',
      p_url_mapping_pattern => 'TODO_SODA',
      p_auto_rest_auth => true
    );

    commit;
    
  end;
  ```
  Verify that the script ran successfully by looking at the **Script Output** tab.

  ![run script](images/1/script-output-2.png)

### Summary

At this point, you are able to connect to your ATP instance from SQL Developer Web as the ADMIN user. You've used the ADMIN user to create an application user/schema that will be used in subsequent labs to host the todo application data.
