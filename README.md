# IRCTC-API
railway management system like IRCTC,

Railway management platform built using NodeJS,ExpressJS,Mysql database

Steps to start the application:

 step 1) Clone the main branch
 
 step 2) cd Railway-management-API
 
 step 3) run "npm i" in terminal
 
 step 4) open .env file as i used my local mysql database you need to enter all necessary details here
 
 step 4) open sql workbench or anyother mysql platform
 
 step 5) please find txt file attached name as "SQL queries to run" 
 
 step 5) now run "npm run start" command in terminal
 
 step 6) please find postman collection attached in this repositary 

 #---------------------- Working Proof-------------------------------------#

 1) Register
    ![image](https://github.com/user-attachments/assets/759fa21f-ac34-44f7-8c9c-d02d00b8ef43)

 2) Login (token returned as response which can be stored in localstorage for further operation if UI implemented) 
    ![image](https://github.com/user-attachments/assets/4716f54c-5cab-4cda-b0bb-c0e97a3b9f83)

 3) Admin (admin have API key which need to be passed in header in order to add train routes)
    ![image](https://github.com/user-attachments/assets/82c60473-4534-4ef5-9400-5985c1a847c9)
    ![image](https://github.com/user-attachments/assets/bc995505-f43b-41d2-b329-837c8279745c)

  4) Booking Train( user need to pass jwt authorization token which later we decode to get user_id and validate if token is valid(1h validity)
     ![image](https://github.com/user-attachments/assets/f3a52a09-6491-4564-ad44-cf885000f04f)
     here train id passed as parameter
     user_id and train_id stored as foreign key in bookings table

  5) View Ticket( here also we use authorization token for validation and decoding user_id)
      ![image](https://github.com/user-attachments/assets/f086ecf0-1057-4b96-a0bb-2b75a338cdec)



Additional details:

1) we have implemented start_transaction,commit and rollback commands in our booking endpoint to tackle race condition
     




 
 





