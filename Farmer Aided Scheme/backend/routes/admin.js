const express = require('express');
const router = express.Router();
const Crops = require('../models/Crop');
const Scheme = require('../models/Scheme');
const verifyToken = require('../verifyToken');
const Application = require('../models/Application');

// Post Crops Details
router.post('/createCrops',verifyToken,async(req,res)=>{
    try{
        const newCrop = new Crops(req.body);
        const savedCrop = await newCrop.save();
        res.status(200).json(savedCrop)
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Post Scheme Details
router.post('/createScheme',verifyToken, async(req, res)=>{
    try{
        const newScheme = new Scheme(req.body);
        const savedScheme = await newScheme.save();
        res.status(200).json(savedScheme)
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.put('/application/:id', verifyToken, async (req, res) => {
    try {
        // Find the application by ID and update it
        const updateApplication = await Application.findByIdAndUpdate(
            req.params.id,                // Find by ID
            { $set: req.body },           // Update with the request body
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // If no application is found, return a 404 error
        if (!updateApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Return the updated application
        res.status(200).json(updateApplication);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getApplication', async (req, res) => {
    const application = await Application.find();
    res.json(application);
});


module.exports = router;