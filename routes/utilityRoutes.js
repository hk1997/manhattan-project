const router = require("express").Router();
const utilityController = require("../controllers/utility/utilityController");

/*adding a specialization
body: {name: name of specialization}
response: success status, a message and _id of the specialization 
*/
router.post("/specialization/add-specialization", utilityController.addSpecialization);

/*deleting a speciaization
body: {specializationId: _id}
reposnse: success status, a message and data field(currently empty)
*/
router.post("/specialization/delete-specialization", utilityController.deleteSpecialization);

/*listing all documents of collection specialization
response: success status, a message and data:{specialization:[array of specializations]}
*/
router.post("/specialization/list-specialization", utilityController.listSpecialization);

module.exports = router;