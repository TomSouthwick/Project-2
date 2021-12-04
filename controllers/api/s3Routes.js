const router = require( "express" ).Router();
const s3 = require('../../config/s3');


router.get('/s3Url', async (req, res) =>{
    const url = await s3.generateUploadURL();
    res.send({url});
});