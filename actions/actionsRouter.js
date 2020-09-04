const express = require("express");

const router = express.Router();

const actionsDB = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  actionsDB.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  actionsDB.get(id).then((user) => {
    res.status(200).json(user);
  });
});

router.post('/', validateAction, (req, res, next) => {
  actionsDB.insert(req.body)
  .then(action => {
    res.status(201).json(action)
  })
})

// Custom Middleware

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(404).json({ error: "id, description and notes required" });
  } else {
    next();
  }
}

module.exports = router;
