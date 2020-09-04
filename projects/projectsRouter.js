const express = require("express");

const router = express.Router();

const projectsDB = require('../data/helpers/projectModel')

router.get("/", (req, res) => {
  projectsDB.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id
  projectsDB.get(id).then((user) => {
    res.status(200).json(user);
  });
});




module.exports = router