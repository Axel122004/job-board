Technologies utilisées : 

Nodejs, Mariadb, Expressjs, Bcrypt, HTML, CSS, JS, express-session, body-parser, cors


Explication des Technologies : 

Nodejs : Création du serveur
Mariadb : Création de la base de données
Expressjs : Permet de faire le routage 
Bcrypt : Hacher les mots de passes des utilisateurs
express-session : stocke les données de session dur le serveur
body-parser : Module lié à expressjs, permet d'interprêter les fichiers json d'un réponse HTTP


Etape 1, Installation des modules :

apt install nodejs npm
npm install expressjs mariadb express-session bcrypt body-parser cors 



Etape 3, Création de la database et du serveur : 

    Création d'une database via mariadb et initialisation 

        host: "127.0.0.1",
        port: 3306,
        user: "admin",
        password: "motdepasse123",
        database: "job_advertisements"

    Création du serveur 

        const express = require("express");
        const db = require("./db");
        const app = express();
        const cors = require("cors");
        const port = 8080;
        const bodyParser = require("body-parser");
        const subscribe = require("./subscribe.js");
        const session = require("express-session");


Etape 4, Création du Front :

Création d'une page d'inscription/connexion et d'une page de recherche de job en HTML, CSS, JS 


Etape 5, Routage :

Communication entre le front, le back, et la base de donnée.

Route entre la table companie (database) et le back-end (même chose pour les autres tables):
/companies_get (Récupère les données de la table)
/companies_post (Créer de nouvelles données)
/companies_put (Remplacer des données)
/companies_delete (Suprimer des données)



Route entre le front, le serveur et la bdd :
router.post(/inscription) -> Création de nouvelles données utilisateur dans la bdd
router.post(/connexion) -> Recherche de données déjà existante dans la bdd pour établir la connexion


Etape 6, Mise en relation du Front et du Back avec Fetch : 

Premier fetch au niveau de la page de connexion, récuperation des informations dans la database via une requête. Différentes possibilités, connexion réussie et accès au offres de job si les données corresponde, sinon, accès au site refusé.

Deuxième fetch au niveau des job, pour afficher en front les données des offres disponibles de la database

Troisième fetch pour afficher les données de toute la database dans une page uniquement accessible en admin


Etape 7 : Lancement du serveur (node server.js)


Conclusion : 

Le serveur et le routage permettent la communication en la database, le back et le front, et la methode fetch permet la communication entre cette ensemble