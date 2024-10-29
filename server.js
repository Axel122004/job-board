const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");
const port = 8080;
const bodyParser = require("body-parser");
const subscribe = require("./subscribe.js");
const session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/test", subscribe);

app.get("/companies_get", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM companies");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.post("/companies_post", async (req, res) => {
  let company = req.body;
  try {
    const result = await db.pool.query(
      "insert into companies (name, description) values (?, ?)",
      [company.name, company.description]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.put("/companies_put", async (req, res) => {
  let company = req.body;
  try {
    const result = await db.pool.query(
      "update companies set description = ?, name = ? where id = ?",
      [company.description, company.name, company.id]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.delete("/companies_delete", async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query("delete from companies where id = ?", [
      id,
    ]);
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.get("/people_get", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM people");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.post("/people_post", async (req, res) => {
  let person = req.body;
  const role = "user";
  try {
    const result = await db.pool.query(
      "insert into people (name, email, phone, role) values (?, ?, ?, ?)",
      [person.name, person.email, person.phone, role]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.put("/people_put", async (req, res) => {
  let person = req.body;
  try {
    const result = await db.pool.query(
      "update people set name = ?, email = ?, role = ? where id = ?",
      [person.name, person.email, role, person.id]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.delete("/people_delete", async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query("delete from people where id = ?", [id]);
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.get("/advertisements_get", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM advertisements");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/advertisements_get_name", async (req, res) => {
  try {
    const result = await db.pool.query(
      "SELECT advertisements.title, advertisements.description, advertisements.wage, advertisements.localisation, companies.name FROM advertisements INNER JOIN companies ON advertisements.company_id = companies.id"
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.post("/advertisements_post", async (req, res) => {
  let advertisement = req.body;
  try {
    const result = await db.pool.query(
      "insert into advertisements (company_id, title, description, localisation, wage) values (?, ?, ?, ?, ?)",
      [
        advertisement.company_id,
        advertisement.title,
        advertisement.description,
        advertisement.localisation,
        advertisement.wage,
      ]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.put("/advertisements_put", async (req, res) => {
  let advertisement = req.body;
  try {
    const result = await db.pool.query(
      "update advertisements set company_id = ?, title = ?, description = ?, localisation = ?, wage = ? where id = ?",
      [
        advertisement.company_id,
        advertisement.title,
        advertisement.description,
        advertisement.localisation,
        advertisement.wage,
        advertisement.id,
      ]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.delete("/advertisements_delete", async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query(
      "delete from advertisements where id = ?",
      [id]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.get("/applications_get", async (req, res) => {
  try {
    const result = await db.pool.query("SELECT * FROM applications");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.post("/applications_post", async (req, res) => {
  let application = req.body;
  try {
    const result = await db.pool.query(
      "insert into applications (advertisement_id, person_id, email_sent) values (?, ?, ?)",
      [
        application.advertisement_id,
        application.person_id,
        application.email_sent,
      ]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.put("/applications_put", async (req, res) => {
  let application = req.body;
  try {
    const result = await db.pool.query(
      "update applications set advertisement_id = ?, person_id = ?, email_sent = ? where id = ?",
      [
        application.advertisement_id,
        application.person_id,
        application.email_sent,
        application.id,
      ]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.delete("/applications_delete", async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query(
      "delete from applications where id = ?",
      [id]
    );
    res.send({
      insertId: result.insertId.toString(),
    });
  } catch (err) {
    throw err;
  }
});

app.get("/inscription_get_role/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.pool.query(
      `SELECT role FROM inscription WHERE id = ${userId}`
    );

    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
