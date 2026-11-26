
import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/contacts")
  .get(authCtrl.requireSignin, contactCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.removeAll);

router
  .route("/api/contacts/:id")
  .get(authCtrl.requireSignin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.remove);

export default router;
