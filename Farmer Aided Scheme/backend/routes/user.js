const express  = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const Application  = require('../models/Application');
const Scheme = require('../models/Scheme');
const verifyToken = require('../verifyToken');

router.get('/crops',verifyToken, async(req,res)=>{
    const crops = await Crop.find();
    res.json(crops);
});

router.get('/scheme',verifyToken,async(req,res)=>{
    const scheme = await Scheme.find();
    res.json(scheme);
});

router.get('/application/:userId',verifyToken,async(req,res)=>{
    try{
        const applications = await Application.find({userId: req.params.userId});
        res.status(200).send(applications);
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.get('/getApplication', async (req, res) => {
    try {
        // Fetch all applications and only include the userId and schemeId fields
        const applications = await Application.find({}, { userId: 1, schemeId: 1, _id: 0 }); // Exclude _id field

        // Respond with the userId and schemeId(s)
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// router.post('/createApplication',verifyToken, async(req,res)=>{
//     try{
//         const newApplication = new Application(req.body);
//         const savedApplication = await newApplication.save();
//         res.status(200).json(savedApplication);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// });

router.post('/createApplication', verifyToken, async (req, res) => {
    try {
        const { userId, schemeId } = req.body;

        // Check if an application already exists for the given userId and schemeId
        const existingApplication = await Application.findOne({ userId, schemeId });

        if (existingApplication) {
            // If an application exists, return an error response
            return res.status(400).json({ message: "You have already applied for this scheme." });
        } else {
            // If no existing application, create a new one
            const newApplication = new Application(req.body);
            const savedApplication = await newApplication.save();
            res.status(200).json(savedApplication);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;


