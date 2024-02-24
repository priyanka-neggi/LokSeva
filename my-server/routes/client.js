const router = require("express")();
import { signin, signup, signout, service, create, details, send, edituser } from "../controllers/client";
import { authenticateUser } from "../middleware/authenticate";

/**Post Method */

router.route("/signup").post(signup);
router.route("/signin").post(signin);

//Authentication

router.route("/signout").get(authenticateUser, signout);
router.route("/service").get(authenticateUser, service);
router.route("/create").post(authenticateUser, create);
router.route("/details").post(authenticateUser, details);
router.route("/send").post(authenticateUser, send);
router.route("/edituser").put(edituser);

export default router;
