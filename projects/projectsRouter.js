const express = require("express");

const router = express.Router();

const actionsDB = require("../data/helpers/actionModel");
const projectsDB = require("../data/helpers/projectModel");
const { get } = require("../data/helpers/actionModel");
const { insert } = require("../data/dbConfig");

router.get("/", (req, res, next) => {
  projectsDB.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  projectsDB.get(id).then((user) => {
    res.status(200).json(user);
  });
});

router.post('/', validateProject, (req, res) => {
  projectsDB.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
})

router.post("/:id/actions", (req, res, next) => {
  const actions = req.body;
  actions.project_id = req.params.id;
  projectsDB.get(req.params.p_id).then((project) => {
    project
      ? actionsDB
          .insert(actions)
          .then((action) =>
            action
              ? res.status(201).json(action).end()
              : res.status(500).json({ message: "There was a problem" }).end()
          )
      : res.status(404).json({ message: "Project not found" }).end();
  });
});

// MiddleWare

function validateProject(req, res, next) {
  const { name } = req.body;
  const { description } = req.body;
  if (!name || !description) {
    res
      .status(404)
      .json({ error: "Need to enter a name and description" })
      .end();
  }
  next();
}


module.exports = router;
