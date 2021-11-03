var express = require('express');
var router = express.Router();

    router.get("/", (req, res)=> {
        return res.status(200).send("categories");
    })

    router.post("/", (req, res)=> {
        return res.json({categories:"categories post"})
    })

    router.put("/", (req, res)=> {
        return res.status(200).send("categories");
    })

    router.get("/:id", (req, res)=> {
        
        return res.status(200).send(req.params.id);
            
    })

    router.delete("/:id", (req, res)=> {
        return res.status(200).send("categories");
    })

module.exports = router;
