# Module 1: Create an ATP Instance

In this module, you will create an Autonomous Transaction Processing (ATP) instance. The database will be used to store the data related to the todo tracking application.

## Objectives

* Sign-in to the Oracle Public Cloud
* Create an ATP database

## Required Artifacts

* Oracle Cloud account credentials - You may use your own account, a trial account, or a training account provided by an Oracle instructor.

## Parts

### **Part 1**: Sign in to the Oracle Cloud Infrastructure console

In this part, you will sign into your Oracle Cloud account so that you can work with various services using a GUI.

1. Go to cloud.oracle.com, click **Sign In** to sign in with your Oracle Cloud account.

   ![sign in](images/1/signin.png)

2. Enter your **Cloud Account Name** and click **Next**.

   ![account name](images/1/account-name.png)

3. Enter your **User Name** and **Password**, then click **Sign In**.

   ![user name and password](images/1/user-name-and-password.png)

   Once you've successfully authenticated, you'll be redirected to the Oracle Cloud Infrastructure dashboard where you can start working with various cloud services.

### **Part 2**: Create an ATP instance

In this part, you will create an instance of the ATP database service for the todo tracking application.

1. Open the services menu by clicking the navigation menu icon in the upper left-hand corner, then select Autonomous Transaction Processing.

   ![services menu atp](images/1/select-atp-in-nav-menu.png)

2. Click **Create Autonomous Database**.

   ![](images/1/click-create-autonomous-database.png)

3. Enter the following details and click **Create Autonomous Database**.

   | Property | Value |
   | --- | --- |
   | Display name | **TODODB** |
   | Database name | **TODODB** |
   | Password | **`SecretPassw0rd`** |
   | Confirm password | **`SecretPassw0rd`** |

   ![](images/1/atp-settings-1.png)
   ![](images/1/atp-settings-2.png)
   ![](images/1/atp-settings-3.png)

   After clicking **Create Autonomous Database**, you will be redirected to the Autonomous Database Details page for the new instance. Continue to the next part when the status changes from:
   
   ![](images/1/status-provisioning.png) 

   to:
   
   ![](images/1/status-available.png)

## Summary

This completes Module 1. At this point, you know how to log into your cloud account and create an ATP instance. As you have seen, it takes only minutes to create an autonomous database that can instantly scale to meet the demands of mission critical applications. [Click here to navigate to Module 2](2-create-a-database-user-with-soda-privileges.md).