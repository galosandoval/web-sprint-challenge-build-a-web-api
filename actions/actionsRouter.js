const express = require("express");

const router = express.Router();

const actionsDB = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  actionsDB.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id
  actionsDB.get(id).then((user) => {
    res.status(200).json(user);
  });
});

router.post('/', (req, res) => {
  const id = req.body.project_id
  
  db.insert(req.body)
  .then(action => {
    res.status(201).json({message: 'successfully added action'})
  })
})

module.exports = router;
