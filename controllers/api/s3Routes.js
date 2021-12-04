const router = require( "express" ).Router();
const s3 = require('../../config/s3');


router.get('/url', async (req, res) =>{
    const url = await s3.generateUploadURL();
    res.send({url});
});

module.exports = router;