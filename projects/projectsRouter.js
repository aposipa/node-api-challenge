const express = require("express");

const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

//GET all projects
router.get("/", (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ error: "Error GETing project", err });
        });
});

//GET projects by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Projects.get(id)
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ error: "Error GETing project by ID", err });
    })
})

//POST new project
router.post("/", (req, res) => {
    Projects.insert(req.body)
    .then(() => {
        res.status(201).json(req.body);
    })
    .catch(err => {
        res.status(500).json({ error: "Error creating new POST", err });
    })
})

//PUT for specific ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updateProject = req.body
    Projects.update(id, updateProject)
    .then(updateProject => {
        res.status(200).json(updateProject)
    })
    .catch(err => {
        res.status(500).json({ error: "Error updating project", err });
    })
})

//DELETE specific project
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
    .then(() => {
        res.status(204).end();
    })
    .catch(err => {
        res.status(500).json({ error: "Error deleting project", err });
    })
})



module.exports = router;