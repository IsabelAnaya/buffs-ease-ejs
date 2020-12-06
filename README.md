# buffs-ease-ejs
Hosted at https://buffs-ease.herokuapp.com

Current version of the hosted website.

The Heroku site hosts the Postgres database, including tables for different kinds of searches and user profile information, and the website itself. It is run through a NodeJS script that renders pages using the EJS format and retrieves data from the database for the explore page.

Code is structured in so that server files are in the main level, and pages to render are contained within views/pages/ in compliance with EJS's format. EJS files contain all the necessary HTML and server-side Javascript to run. CSS, images, and other Javascript files are hosted at https://github.com/buffs-ease/buffapp/tree/main/resources to allow changes (this repo is meant to hold only the code that was pushed to Heroku).
