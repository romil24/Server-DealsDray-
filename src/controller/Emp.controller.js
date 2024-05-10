import { Emp } from "../model/Employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudNary } from "../utils/CloudNary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const AddEmp = asyncHandler(async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  if (
    [f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course].some(
      (filed) => filed?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All Filed Required");
  }

  const alreadyEmp = await Emp.findOne({
    $or: [{ f_Email }],
  });

  if (alreadyEmp) {
    throw new ApiError(400, "Email  Already Exist ");
  }
  console.log(req.files);
  const imgPath = await req.files?.f_img[0]?.path;

  if (!imgPath) {
    throw new ApiError(400, "ImgLocalPath File is required");
  }

  const f_img = await uploadCloudNary(imgPath);

  if (!f_img) {
    throw new ApiError(400, "Img File is Required");
  }
  const emp = await Emp.create({
    f_img: f_img.url,
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, emp, "Emp Add SuccessFully"));
});

const UpdateEmp = asyncHandler(async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  if (
    !(f_Name || f_Email || f_Mobile || f_Designation || f_gender || f_Course)
  ) {
    throw new ApiError(409, "Filed Are Require");
  }
  const { id } = req.params;
  const user = await Emp.findByIdAndUpdate(
    id,
    {
      $set: {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course,
      },
    },
    { new: true },
  );

  if (!user) {
    throw new ApiError(400, "Employee not found with the provided ID");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Emp Updated SuccessFully "));
});

const ImgUpdateEmp = asyncHandler(async (req, res) => {
  const imgPath = req.files?.f_img[0]?.path;
  if (!imgPath) {
    throw new ApiError(409, "Img Not Upload");
  }
  const f_img = await uploadCloudNary(imgPath);
  if (!f_img.url) {
    throw new ApiError(409, "Error occur While  Upload Img");
  }
  const { id } = req.params;
  const updateEmpImg = await Emp.findByIdAndUpdate(
    id,
    { $set: { f_img: f_img.url } },
    { new: true },
  );
  if (!updateEmpImg) {
    throw new ApiError(400, "Employee not found with the provided ID");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updateEmpImg, "Img Updated SuccessFully"));
});

const DeleteEmp = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const EmpDe = await Emp.findByIdAndDelete(id);

  if (!EmpDe) {
    throw new ApiError(400, "Employee not found with the provided ID");
  }
  return res.status(200).json(new ApiResponse(200, "Emp Deleted SuccessFully"));
});

const SearchEmp = asyncHandler(async (req, res) => {
  const search = req.query.search || "";

  const data = await Emp.find({ f_Name: { $regex: search, $options: "i" } });

  if (!data) {
    throw new ApiError(400, "Data Not Found");
  }
  return res.status(200).json(new ApiResponse(200, data, "Selected"));
});

const FindEmp = asyncHandler(async (req, res) => {
  const Data = await Emp.find();
  return res.status(200).json(new ApiResponse(200, Data, "ALL Data "));
});
const FindEmpById = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const Data = await Emp.findById(id);
  return res.status(200).json(new ApiResponse(200, Data, " Data "));
});



export { AddEmp, UpdateEmp, ImgUpdateEmp, DeleteEmp, SearchEmp, FindEmp,FindEmpById };
