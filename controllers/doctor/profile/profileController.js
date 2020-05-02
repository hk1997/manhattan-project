const helpers = require('../../helpers');
const profileModelController = require('../profile/profileModelController');

module.exports.updateProfile = async (req, res) => {
    try {
        let fields = ["name", "qualifications", "clinic", "specialization", "profileImage"];
        let modelData = helpers.initializePartialData(fields, req);
        let response = await profileModelController.updateProfile(req.payload._id, modelData.data);
        return res.json(response);

    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'some error occured',
            data: {}
        });
    }
};

module.exports.getProfile = async (req, res) => {
    try {
        let response = await profileModelController.getProfile(req.payload._id);
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'some error occured',
            data: {}
        });
    }
};

module.exports.deleteProfile = async (req, res) => {
    try {
        let response = await profileModelController.deleteProfile(req.payload._id);
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'some error occured',
            data: {}
        });
    }
};

module.exports.listProfile = async (req, res) => {
    try {
        let response = await profileModelController.listProfile();
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'some error occured',
            data: {}
        });
    }
};