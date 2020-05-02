const helpers = require("../helpers");
const utilityModelController = require("./utilityModelController");

module.exports.addSpecialization = async (req, res) => {
    try {
        let fields = ["name"];
        let modelData = await helpers.initializeData(fields, req);
        if (!modelData.valid) {
            return res.json({
                success: false,
                message: 'name missing',
                data: {}
            });
        }
        let response = await utilityModelController.addSpecialization(modelData.data);
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

module.exports.deleteSpecialization = async (req, res) => {
    try {
        let fields = ["specializationId"];
        let modelData = await helpers.initializeData(fields, req);
        if (!modelData.valid) {
            return res.json({
                success: false,
                message: 'specializationId missing',
                data: {}
            });
        }
        let response = await utilityModelController.deleteSpecialization(modelData.data);
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

module.exports.listSpecialization = async (req, res) => {
    try {
        let response = await utilityModelController.listSpecialization();
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