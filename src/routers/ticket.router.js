const express = require('express');
const router= express.Router()

router.all("/", (req, res) => {
    console.log(name)
    res.json({message:"return from ticket router"})

})

module.exports=router