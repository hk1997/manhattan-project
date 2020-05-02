const clientInfo = require("../../../models/client/clientInfo");

module.exports.completeProfile = async (id, data) => {
  try {
    let profile = await clientInfo.findOne({ clientId: id });
    if (profile == null) {
      //making new profile
      let newProfile =  clientInfo(data);
      newProfile['clientId']=id
      await newProfile.save()
    } else {
      await clientInfo.updateOne({ clientId: id }, { $set: data });
    }
    return { success: true, message: "Successful", data: {} };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};

module.exports.getProfile = async (id)=>{
    try{ 
        let profile = await clientInfo.findOne({_id:id})
       return { success: true, message: 'Successful', data:{profile:profile}}
    }
    catch(err){
       console.log(err)
       return { success: false, message: 'Some error occured', data: {} };
    }
}