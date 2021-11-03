var express = require('express');
const catalyst = require('zcatalyst-sdk-node');
var router = express.Router();
const constants = require("./../../utils/constants")

const handler = require("./collectionHandler");

router.get("/", async(req, res)=> {
    const capp = catalyst.initialize(req);
    // let items = await handler.getValueFromDB.all(capp, []);
    const hand = handler.itemObj(capp);
    const items = await hand.getItems();
    return res.status(200).json(items);
})

router.get("/:id",async (req, res)=> {
    const id = req.params.id;
    const capp = catalyst.initialize(req);
    const data = handler.itemObj(capp).getItemById(id);
    // const data = await handler.getValueFromDB.byId(capp, id, null);
    return res.status(200).json(data);
})

router.post("/", async(req, res)=> {
    const capp = catalyst.initialize(req);
    let item = await capp.datastore().table("Collections").insertRow(req.body);
    return res.status(200).json(item)
})

router.put("/", async(req, res)=> {
    const capp = catalyst.initialize(req);
    let item = await capp.datastore().table("Collections").updateRow(req.body);
    return res.status(200).json(item)
})

router.delete("/:id", async(req, res)=> {
    const id = req.params.id;
    const capp = catalyst.initialize(req);
    const data = await capp.datastore().table("Collections").deleteRow(id);
    return res.status(200).json(data);
})

module.exports = router;
