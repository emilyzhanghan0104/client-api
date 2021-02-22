const express = require('express');
const router= express.Router()

router.all("/", (req, res) => {
    req.json({message:"return from user router"})

})

module.exports=router