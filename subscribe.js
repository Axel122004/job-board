const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

const router = express.Router();

router.post("/inscription", async (req, res) => {
  const { role, name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Tous les champs sont obligatoires");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.pool.query(
      "INSERT INTO inscription (role, nom, mail, password) VALUES (?, ?, ?, ?)",
      [role ? role : "user", name, email, hashedPassword]
    );
    res.status(200).send("Inscription réussie");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de l'inscription");
  }
});


router.post("/connexion", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email et mot de passe sont requis");
  }

  try {
    const [rows] = await db.pool.query(
      "SELECT * FROM inscription WHERE mail = ?",
      [email]
    );
    if (rows) {
      const match = await bcrypt.compare(password, rows.password);
      console.log(rows);

      if (match) {
        // req.session.userId = rows
        //   window.location.href = "/job.html";.id;
        // res.send(rows.id);
        res.send({
          userId: rows.id,
        });
        // res.status(200).send("Connexion réussie");
      } else {
        res.status(401).send("Mot de passe incorrect");
      }
    } else {
      res.status(401).send("Utilisateur non trouvé");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la connexion");
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

module.exports = router;
