Example authorization
=============================

INSTALLATION
------------
Open the terminal in the project folder and enter

    $ git clone https://github.com/AndriiSvirskyi/Authorization.git

REQUIREMENTS
------------
node -v > v8.12.0

QUICK START
-----------
Сreate a file config.js :
```
module.exports = {
  secret: your_secret_key;
};
```
in the directory  /backend.

Run your database

    sudo systemctl start mongodb
    

On command line, type in the following commands:
        
        $ cd authorization/frontend
        $ npm install
        $ npm start

open the new terminal and enter

        $ cd authorization/backend
        $ npm install
        $ npm start

The project is ready for work
------------
