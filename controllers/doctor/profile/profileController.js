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

module.exports.updatePaymentInfo = async (req, res) => {
    try {
        let fields = ["accountNo", "ifscCode"];
        let modelData = await helpers.initializeData(fields, req);
        if (!modelData.valid) {
            return res.json({
                success: false,
                message: 'necessary parameters missing',
                data: {}
            });
        }
        let response = await profileModelController.updatePaymentInfo(req.payload._id, modelData.data);
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

module.exports.getPaymentInfo = async (req, res) => {
    try {
        let response = await profileModelController.getPaymentInfo(req.payload._id);
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

module.exports.deletePaymentInfo = async (req, res) => {
    try {
        let response = await profileModelController.deletePaymentInfo(req.payload._id);
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

module.exports.listPaymentInfo = async (req, res) => {
    try {
        let response = await profileModelController.listPaymentInfo();
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

module.exports.updateCostInfo = async (req, res) => {
    try {
        let fields = ["virtualCall", "physicalExamination", "emergencyCharges"];
        let modelData = await helpers.initializeData(fields, req);
        if (!modelData.valid) {
            return res.json({
                success: false,
                message: 'necessary parameters missing',
                data: {}
            });
        }
        let response = await profileModelController.updateCostInfo(req.payload._id, modelData.data);
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

module.exports.getCostInfo = async (req, res) => {
    try {
        let response = await profileModelController.getCostInfo(req.payload._id);
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

module.exports.deleteCostInfo = async (req, res) => {
    try {
        let response = await profileModelController.deleteCostInfo(req.payload._id);
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

module.exports.listCostInfo = async (req, res) => {
    try {
        let response = await profileModelController.listCostInfo();
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
