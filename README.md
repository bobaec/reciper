What's in your Fridge Web App using PERN (Postgresql, Express, React, NodeJS), React Bootstrap, SASS and JsonWebToken Authorization with BCrypt password hashing

![image](https://github.com/bobaec/reciper/assets/22423987/c444198c-89ce-4711-9fe7-da16ad6350b4)

Stack:
**Postgresql**: Simple database table containing user, pantry, and favorite recipes<br/>
**Express & NodeJS**: CRUD operations for routes<br/>
**React, React Bootstrap, SASS**: Front End<br/>
**Authorization:** JSONWebToken with BCrypt Hashing<br/>
**Spoonacular**: API to pull recipes/ingredients (https://spoonacular.com/) <br/>


**Prerequisites:**
 - npm
 - Postgresql: https://www.postgresql.org/download/

How to run:
1. git clone https://github.com/bobaec/reciper
2. Run this command in a terminal to run Postgresql:
   - sudo -u postgresql pqsl
   - enter your password
   - run the two queries (found inside /server/database.sql) in your psql command line
    <br/>i. CREATE DATABASE reciper;
    <br/>ii. CREATE TABLE users(....);
3. In a new terminal, cd client
   - npm start (localhost:3000 will open up on your browser automatically)
4. In a new terminal, cd server
   - npm run dev

Once you have the steps above running, you should be all set up.

Your page will look like this:
![image](https://github.com/bobaec/reciper/assets/22423987/cb1b3373-8f6c-4b60-8561-df03f70462a1)

You can login/logout by clicking the button on the bottom left of the sidebar (optional).

By logging in you can:
1. save favorite recipes
2. save your ingredients
3. see your favorite recipes

If you click any ingredient on the left or search by ingredient in the sidebar, your recipes will update in the main content of the page.
If you do not have any ingredients it will show random popular recipes in the main content of the page.

If you click a recipe it will show you relevant information about said recipe:
![image](https://github.com/bobaec/reciper/assets/22423987/eedff635-2833-4e7a-9d10-3fcfcfb19c23)

If you have ingredients saved on the sidebar it will show used, unused, and/or missed ingredients like:
![image](https://github.com/bobaec/reciper/assets/22423987/2b39c283-2819-4349-9e42-87240eea4f3e)

If you are logged in you can favorite your recipe:
![image](https://github.com/bobaec/reciper/assets/22423987/5b1d089b-2e6d-4a2a-b1db-15485d36edd3)

Example video of functionality:
![chrome_BLSx5wN6Uk](https://github.com/bobaec/reciper/assets/22423987/b140e8e9-c40c-4ac1-a921-1c5bca9711fc)

Example video of login functionality:
![chrome_3CiULtm2EI](https://github.com/bobaec/reciper/assets/22423987/564f7e3f-b492-4c0b-81fa-69a9bd59743d)


