const specialization = require("../../models/doctor/specialization");

module.exports.addSpecialization = async (name) => {
    try {
        let newSpecialization = new specialization(name);
        newSpecialization.save();
        return {
            success: true,
            message: 'successfully added',
            data: { newSpecialization }
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
}

module.exports.deleteSpecialization = async (data) => {
    try {
        console.log(data.specializationId);
        await specialization.deleteOne({ _id: data.specializationId });
        return {
            success: true,
            message: 'successfully deleted',
            data: {}
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
}

module.exports.listSpecialization = async (req, res) => {
    try {
        let list = await specialization.find();
        return {
            success: true,
            message: 'list generated',
            data: { specializations: list }
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
};