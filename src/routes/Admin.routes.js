  import { Router } from "express";
  import {
    RegisterAdmin,
    logOutUser,
    login,
  } from "../controller/login.controller.js";
  import { verifyJwt } from "../middleware/auth.middleware.js";
  import {
    AddEmp,
    DeleteEmp,
    FindEmp,
    FindEmpById,
    ImgUpdateEmp,
    SearchEmp,
    UpdateEmp,
  } from "../controller/Emp.controller.js";
  import { upload } from "../middleware/img.middleware.js";
  const router = Router();

  router.route("/Reg").post(RegisterAdmin);
  router.route("/login").post(login);
  router.route("/logOut").post(verifyJwt, logOutUser);

  // Add Emp
  router.route("/Add_Emp").post(
    upload.fields([
      {
        name: "f_img",
        maxCount: 1,
      },
    ]),
    AddEmp,
  );
  router.route("/UpdateEmp/:id").put(verifyJwt, UpdateEmp);
  router.route("/ImgUpdate/:id").put(
    upload.fields([
      {
        name: "f_img",
        maxCount: 1,
      },
    ]),
    verifyJwt,
    ImgUpdateEmp,
  );
  router.route("/DeleteEmp/:id").delete(verifyJwt, DeleteEmp);
  router.route("/SearchEmp").get(verifyJwt, SearchEmp);
  router.route("/logOutUser").get(verifyJwt, logOutUser);
  router.route("/FindEmp").get(verifyJwt, FindEmp);
  router.route("/FindEmpId/:id").get(verifyJwt, FindEmpById);
  export default router;
