import { Router } from "express";
const router = Router();
import { signin, signup, signout, details, send, edit } from "../controllers/provider";
import { authenticatePro } from "../middleware/authenticate";

/**Post Method */

router.route("/signup").post(signup);
router.route("/signin").post(signin);

//Authentication

router.route("/details").post(authenticatePro, details);
router.route("/signout").get(authenticatePro, signout);
router.route("/send").post(authenticatePro, send);
router.route("/edit").put(edit);

export default router;
