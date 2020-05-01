const doctorInfo = require('../../../models/doctor/doctorInfo');

module.exports.updateProfile = async (id, data) => {
    try {
        let doctor = await doctorInfo.findOne({ doctorId: id });
        if (!doctor) {
            doctor = new doctorInfo(data);
            let profileId = await doctor.save();
            return {
                success: true,
                message: 'profile created successfully',
                data: {}
            }
        }
        await doctorInfo.updateOne({ _id: id }, { $set: data });
        return {
            success: true,
            message: 'successfully updated',
            data: {}
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

module.exports.getProfile = async (id) => {
    try {
        let profile = await doctorInfo.findOne({ doctorId: id });
        if (!profile) {
            return {
                success: false,
                message: 'profile does not exist',
                data: {}
            }
        }
        profile
            .populate("doctorId")
            .populate("specialization");
        return {
            success: true,
            message: 'profile found',
            data: profile
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

module.exports.deleteProfile = async (id) => {
    try {
        doctorInfo.deleteOne({ doctorId: id });
        return {
            success: true,
            message: 'successfully deleted',
            data: {}
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

module.exports.listProfile = async (req, res) => {
    try {
        let list = await doctorInfo.find()
            .populate("doctorId")
            .populate("specialization");
        return {
            success: true,
            message: 'list generated',
            data: { profile: list }
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