const doctorInfo = require('../../../models/doctor/doctorInfo');
const paymentInfo = require('../../../models/doctor/paymentInfo');
const costInfo = require('../../../models/doctor/costInfo');

module.exports.updateProfile = async (id, data) => {
    try {
        let doctor = await doctorInfo.findOne({ doctorId: id });
        if (!doctor) {
            doctor = new doctorInfo(data);
            doctor.doctorId = id;
            let profileId = await doctor.save();
            return {
                success: true,
                message: 'profile created successfully',
                data: {}
            }
        }
        await doctorInfo.updateOne({ doctorId: id }, { $set: data });
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
        let profile = await doctorInfo.findOne({ doctorId: id })
            .populate("doctorId")
            .populate("specialization");
        if (!profile) {
            return {
                success: false,
                message: 'profile does not exist',
                data: {}
            }
        }
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
        await doctorInfo.deleteOne({ doctorId: id });
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

module.exports.listProfile = async () => {
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

module.exports.updatePaymentInfo = async (id, data) => {
    try {
        let doctorPaymentInfo = await paymentInfo.findOne({ doctorId: id });
        if (!doctorPaymentInfo) {
            let newDoctorPaymentInfo = new paymentInfo();
            newDoctorPaymentInfo.bankDetails = data;
            newDoctorPaymentInfo.doctorId = id;
            await newDoctorPaymentInfo.save();
            return {
                success: true,
                message: 'successfully created',
                data: { paymentInfoId: newDoctorPaymentInfo._id }
            };
        }
        doctorPaymentInfo.bankDetails = data;
        await doctorPaymentInfo.save();
        return {
            success: true,
            message: 'successfully updated',
            data: { paymentInfoId: doctorPaymentInfo._id }
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
};

module.exports.getPaymentInfo = async (id) => {
    try {
        let doctorPaymentInfo = await paymentInfo.findOne({ doctorId: id });
        if (!doctorPaymentInfo) {
            return {
                success: false,
                message: 'payment info does not exists',
                data: {}
            };
        }
        bankDetails = doctorPaymentInfo.bankDetails;
        return {
            success: true,
            message: 'payment info found',
            data: { bankDetails }
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
};

module.exports.deletePaymentInfo = async (id) => {
    try {
        await paymentInfo.deleteOne({ doctorId: id });
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

module.exports.listPaymentInfo = async () => {
    try {
        let list = await paymentInfo.find()
            .populate("doctorId");
        return {
            success: true,
            message: 'list generated',
            data: { "list": list }
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

module.exports.updateCostInfo = async (id, data) => {
    try {
        let doctorCostInfo = await costInfo.findOne({ doctorId: id });
        if (!doctorCostInfo) {
            let newDoctorCostInfo = new costInfo();
            newDoctorCostInfo.doctorId = id;
            newDoctorCostInfo.charges = data;
            await newDoctorCostInfo.save();
            return {
                success: true,
                message: 'successfully created',
                data: { costInfoId: newDoctorCostInfo._id }
            };
        }
        newDoctorCostInfo.charges = data;
        await doctorcostInfo.save();
        return {
            success: true,
            message: 'successfully updated',
            data: { costInfoId: newDoctorcostInfo._id }
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
};

module.exports.getCostInfo = async (id) => {
    try {
        let doctorCostInfo = await costInfo.findOne({ doctorId: id });
        if (!doctorCostInfo) {
            return {
                success: false,
                message: 'cost info does not exists',
                data: {}
            };
        }
        charges = doctorCostInfo.charges;
        return {
            success: true,
            message: 'payment info found',
            data: { charges }
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'some error occured',
            data: {}
        };
    }
};

module.exports.deleteCostInfo = async (id) => {
    try {
        await costInfo.deleteOne({ doctorId: id });
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

module.exports.listCostInfo = async () => {
    try {
        let list = await costInfo.find()
            .populate("doctorId");
        return {
            success: true,
            message: 'list generated',
            data: { "list": list }
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
