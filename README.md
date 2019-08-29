# Node.js SODA APIs on Oracle Autonomous Database

This hands-on lab will introduce you to the Simple Oracle Document Access (SODA) APIs for Node.js and Oracle Autonomous Database. The front-end app will be a todo tracker from [TodoMVC](http://todomvc.com/). The mid-tier will be a Node.js based REST API that uses the SODA APIs included with node-oracledb (the database driver for Oracle Database) to persist data. For the database, the lab will use Oracle's Autonomous Transaction Processing (ATP) cloud service.

## Goals for this lab

- Securely connect to ATP from SQL Developer Web and Node.js
- Use SODA APIs in Node.js to fetch and persist data in ATP
- Use JSON functions in SQL to work with JSON data

## How to Get Your Free Cloud Trial Account
[Click this link](https://myservices.us.oraclecloud.com/mycloud/signup?language=en&sourceType=:ex:tb:::RC_NAMK181011P00041:ATPHOL&SC=:ex:tb:::RC_NAMK181011P00041:ATPHOL&pcode=NAMK181011P00041) and complete all the required steps to get your free Oracle Cloud trial account. When you complete the registration process, you'll receive a $300 credit that will enable you to complete the lab for free. After the lab, you'll be able to use any remaining credits to continue to explore the Oracle Cloud.

# Lab Overview

## Before You Begin

**What is Simple Oracle Document Access?**

Simple Oracle Document Access (SODA) is a set of NoSQL-style APIs that let you create and store collections of documents (in particular JSON) in Oracle Database, retrieve them, and query them, without needing to know Structured Query Language (SQL) or how the documents are stored in the database. SODA APIs are implemented in Java, REST, C, PL/SQL Python, and JavaScript (via Node.js).

**What is Autonomous Transaction Processing?**

Oracle Autonomous Transaction Processing delivers a self-driving, self-securing, self-repairing database service that can instantly scale to meet demands of mission critical transaction processing and mixed workload applications. 

## Modules

| # | Module | Est. Time |
| - | -      | -         |
| 1 | [Create an ATP instance](1-create-an-atp-database/index.md) | 20 min |
| 2 | [Create a DB user with SODA privileges](2-create-db-user-with-soda-privs/index.md) | 20 min |
| 3 | [Clone Git repo and build Docker image](3-clone-git-repo-and-build-docker-image/index.md) | 20 min |
| 4 | [Use SODA APIs for CRUD operations](4-use-soda-apis-for-crud-operations/index.md) | 20 min |
| 5 | [Use SQL features for JSON](5-use-sql-features-for-json/index.md) | 20 min |

## After You Finish

Use these links to get more information about Oracle Autonomous Transaction Processing

- [Oracle Autonomous Transaction Processing Cloud Website](https://www.oracle.com/database/autonomous-transaction-processing.html)
- [Oracle Autonomous Transaction Processing Cloud docs](https://docs.oracle.com/en/cloud/paas/atp-cloud/index.html)