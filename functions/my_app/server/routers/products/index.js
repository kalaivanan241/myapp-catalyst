var express = require('express');
var router = express.Router();

    router.get("/", (req, res)=> {
        return res.status(200).send("products");
    })

    router.post("/", (req, res)=> {
        return res.json({products:"products post"})
    })

    router.put("/", (req, res)=> {
        return res.status(200).send("products");
    })

    router.get("/:id", (req, res)=> {
        return res.status(200).send(req.params.id);
    })

    router.delete("/:id", (req, res)=> {
        return res.status(200).send("products");
    })

module.exports = router;
