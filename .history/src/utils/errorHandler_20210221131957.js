

const handleError=  (error, res) => {
    console.log(error)
    
    res.json({message:error.message})

})

module.exports=router