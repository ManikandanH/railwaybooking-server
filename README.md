# RailwayBooking Server

Backend Service for RailwayBooking Application

# How to start the project

First you clone the project using the following command in your cmd or git bash:

git clone https://github.com/Mani030521/RailwayBookingServer.git.

install the project dependencies in your local by npm i or npm install in cmd(windows) or terminal(Mac).

Finally run your Service using the script npm run start-dev and browse the below URL to navigate through API's.

URL: http://localhost:8000/

# Api's in detail

## Admin API's: (/admin/)

      1. POST:   /sign-in - API to Authenticate Admin.
      2. POST:   /sign-up - API to create new sub Admin's.
      3. POST:   /add-train - API to add new train's(only by Admin).
      4. PUT:    /edit-train - API to update train's specification(only by Admin).
      5. DELETE: /delete-train - API to delete a specific train(only by Admin).
      6.POST:    /accept-admin - API to accept other sub admin's(only Main Admin can accept).

## User API's: (/user/)

      1. POST:   /sign-in - API to Authenticate Users.
      2. POST:   /sign-up - API to create new User.


## Train API: (/train/)

      1. GET:    /train-list - API to get all the trains currently available.


## Ticketing API: (/ticketing/)

      1.POST:    /book-ticket - API to book the ticket.
      2.DELETE:  /cancel-ticket - API to cancel the ticket.
      3.POST:    /booking-history - API to get the booking history details of a specific user.
