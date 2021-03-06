const express = require("express");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

//GET all actions
router.get("/", (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: "Error GETing project", err });
        });
});

//GET actions by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Actions.get(id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ error: "Error GETing project by ID", err });
    })
})

//POST new action
router.post("/", validateById, (req, res) => {
    Actions.insert(req.body)
    .then((action) => {
        res.status(201).json(action);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Error creating new POST", err });
    })
})

//PUT for specific ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updateAction = req.body
    Actions.update(id, updateAction)
    .then(updateAction => {
        res.status(200).json(updateAction)
    })
    .catch(err => {
        res.status(500).json({ error: "Error updating action", err });
    })
})

//DELETE specific action
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
    .then(() => {
        res.status(204).end();
    })
    .catch(err => {
        res.status(500).json({ error: "Error deleting action", err });
    })
})

//middleware
function validateById(req, res, next) {
    const { project_id } = req.body;
    Actions.get(project_id)
        .then(action => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ error: "the specified action does not exist" })
            }
        })
}



module.exports = router;