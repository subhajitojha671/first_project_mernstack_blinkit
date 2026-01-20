import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/ayncHandler.js"
import { Category } from "../models/category.models.js"
import {uploadOnCloudinary } from "../utils/cloudinary.js"
import { json } from "stream/consumers"

export const addCategory = asyncHandler( async function (req,res) {
    const {name ,  description ,isActive }=req.body;

    //only validate name  , because des. is  optional  and slug genarate automatically and isActive default value is true 
    if(!name )
    {
      throw new  ApiError(400, "Name category required");
    }

    if(!name.length > 3)
    {
        throw new  ApiError(400, "Name of length must greater than 3 ");
    }

    const existCategory = await Category.findOne({name});
    if(existCategory){
      throw new ApiError(400, "category already exists")
    }


     // Upload avatar
  const imagePath = req.file?.path;
  if (!imagePath) throw new ApiError(400, "Avatar file is required");

    const image = await uploadOnCloudinary(imagePath);
   if (!image?.url) throw new ApiError(400, "Error uploading avatar");

   const category = await Category.create({
    name: name.toLowerCase(),
    description:description,
    isActive:isActive,
    image:image.url
   })


   return  res
   .status(200)
   .json(new ApiResponse(201 , category , "Category created successfully"));



})

export const getAllCategories = asyncHandler(async (req,res)=>{
  const allActiveCategories = await Category.find({isActive: true});

  return res
  .status(200)
  .json(new ApiResponse(200 , allActiveCategories , "all categories fetched successfully"));
})

export const getCategoryBySlug = asyncHandler(async (req , res)=>{
  const {slug}=req.params;
  
  const category = await Category.findOne({slug , isActive:true});
  if(!category){
    throw new ApiError(404 , "category not found")
  }
  return res
  .status(200)
  .json(new ApiResponse(200, category, "Category fetched successfully"))
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully"));
});

export const updateCategory = asyncHandler(async (req,res)=>{
  const {id}=req.params;
   const { description ,isActive }=req.body;
   if(!name )
    {
      throw new  ApiError(400, "Name category required");
    }

    if(!name.length > 3)
    {
        throw new  ApiError(400, "Name of length must greater than 3 ");
    }
    
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {$set : {name , description , isActive}},
      {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,updateCategory,"Category details updated"));
})

export const updateCategoryImage = asyncHandler(async (req,res)=>{
  const {id}=req.params;
  const imagePath = req.file?.path;
  if(!imagePath)
  {
    throw new ApiError(400 , "Image file is missing");
  }

  const image = await uploadOnCloudinary(imagePath);
  if(!image.url)
  {
    throw new ApiError(400 , "Error while uploading image of category");

  }
  const updateCategory = await Category.findByIdAndUpdate(
    id,
    {$set:{image:image.url}},
    {new:true}
  )

  return res
  .status(200)
  .json(new ApiResponse(200 , updateCategory , "Image updated successfully"));
})