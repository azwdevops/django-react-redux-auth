<!-- About -->

<!-- BACKEND -->

backend uses django and postgres

 <!-- frontend -->

frontend uses react and redux(for state management)

<!-- running the application -->

- Download/clone the project into your computer
<!-- django i.e server -->

1. create a virtual environment
2. activate your virtual environment
3. run pip install -r requirements.txt (this installs the django packages)
4. create a postgres database and update the DB_NAME in the .env file
5. since this uses gmail to send user activation emails, enter your gmail details in the .env file.
6. gmail values under EMAIL_HOST_USER and EMAIL_HOST_PASSWORD in the .env file
7. In the .env file update all the relevant fields are indicated in the .env file
8. After this run python manage.py runserver

<!-- react redux frontend -->

1. cd into the client folder
2. run npm i
3. Then run npm start

There you go.
