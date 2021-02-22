const express = require('express');
const router= express.Router()

router.all("/", (req, res) => {
    res.json({message:"return from ticket router"})

})

module.exports=router