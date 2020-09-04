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

router.get('/:id/actions', (req, res, next) => {
  req.params.id = req.body.project_id
  req.params.project_id
  projectsDB.getProjectActions(req.params.project_id).then(list => {
    console.log('heres the id', req.project.id)
    res.status(200).json(list)
  })
})

router.post('/', validateProject, (req, res) => {
  projectsDB.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
})

router.put('/:id', validateProject, (req, res) => {
  const change = req.body
  const id = req.params.id
  projectsDB.update(id, change)
  .then(put => {
    res.status(201).json(put)
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  projectsDB.remove(id)
  .then(del => {
    res.status(204).end()
  })
})

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
