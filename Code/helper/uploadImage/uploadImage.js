const app = require('express').Router();
const { uploadFile, deleteFile } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const Customer = require('../../models/customer/customer.repo');
const Brand = require('../../models/brand/brand.repo');
const Category = require('../../models/category/category.repo');
const Collection = require('../../models/collection/collection.repo');
const Advertisement = require('../../models/advertisement/advertisement.repo');
const Item = require('../../models/item/item.repo');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniquePrifix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrifix + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
  if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
      cb(null, true);
  } else{
      cb(null, false);

  }

};


const upload = multer({storage : storage, fileFilter: fileFilter,});


const uploadImages = async(req,res)=>{
    try{
      var files = [];
      // var fileKeys = Object.keys(req.files);
      // fileKeys.forEach(function(key) {
      //    files.push(req.files[key].path.replace(/\\/g, "/"));
      // });
      req.files.map(async(item)=>{
          await uploadFile(item).then((data)=>{
                    files.push(data.Location);
                    if(files.length == req.files.length){
                        res.json({ "state": true, "message": "File Uploaded SuceesFully", Data: files});
                    }
          });
          await unlinkFile(item.path);
      })
    }
    catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
     })
    }
    
}


const uploadImageCustomer = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Customer.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const customerData = {
          image : result.Key,
      };
      data = await Customer.update({_id : id}, customerData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck customer Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}

const deleteImageCustomer = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Customer.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
        const customerData = {
          image : null,
        };
        data = await Customer.update({_id : id}, customerData);
        data.message = "Image Deleted SuceesFully";
      }else{
        data = {
          success : true,
          status : 200,
          message : "Image is Already Deleted",
        }
      }
    }else{
      data.message = "please ckeck customer Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}


const uploadImageBrand = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Brand.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const brandData = {
        image : result.Key,
      };
      data = await Brand.update({_id : id}, brandData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck brand Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}

const uploadCoverImageBrand = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Brand.isExist({_id : id});
    if(data.success == true){
      if(data.Data.coverImage){
        const r = await deleteFile(data.Data.coverImage);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const brandData = {
        coverImage : result.Key,
      };
      data = await Brand.update({_id : id}, brandData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck brand Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}

const uploadImageCategory = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Category.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const categoryData = {
        image : result.Key,
      };
      data = await Category.update({_id : id}, categoryData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck category Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}

const uploadImageCollection = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Collection.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const collectionData = {
        image : result.Key,
      };
      data = await Collection.update({_id : id}, collectionData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck collection Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}


const uploadImageAdvertisement = async(req,res)=>{
  try{
    const id = req.params.id;
    let data = await Advertisement.isExist({_id : id});
    if(data.success == true){
      if(data.Data.image){
        const r = await deleteFile(data.Data.image);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const advertisementData = {
        image : result.Key,
      };
      data = await Advertisement.update({_id : id}, advertisementData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck advertisement Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}


const uploadItemCover = async(req,res)=>{
 try{
    const id = req.params.id;
    let data = await Item.isExist({_id : id});
    if(data.success == true){
      if(data.Data.cover){
        const r = await deleteFile(data.Data.cover);
      }
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const itemData = {
        cover : result.Key,
      };
      data = await Item.update({_id : id}, itemData);
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck item Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}


const uploadImagesItem = async(req,res)=>{
  try{
    var files = [];
    const id = req.params.id;
    let data = await Item.isExist({_id : id});
    if(data.success == true){
      files.push.apply(files, data.Data.images);
      req.files.map(async(item)=>{
        await uploadFile(item).then(async(result)=>{
                  files.push(result.Key);
                  if(files.length == (req.files.length + data.Data.images.length)){
                        const id = req.params.id;
                        const itemData = {
                            images : files,
                        };
                        let dataItem = await Item.update({_id : id}, itemData);
                        dataItem.message = "Image Uploaded SuceesFully";
                        res.status(dataItem.status).json(dataItem);
                  }
        });
        await unlinkFile(item.path);
    })
    }else{
      data.message = "please ckeck item Id";
      res.status(data.status).json(data);
    }
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}



const deleteImagesFromItem = async(req,res)=>{
  try{
    var files = [];
    const id = req.params.id;
    let data = await Item.isExist({_id : id});
    if(data.success == true){
      files.push.apply(files, data.Data.images);
      let count  = 0;
      req.body.images.map(async(item)=>{
        await deleteFile(item).then(async(result)=>{
                  const index = files.indexOf(item);
                  if (index > -1) {
                    files.splice(index, 1); 
                  }
                  count++;
                  if(req.body.images.length == count){
                    const id = req.params.id;
                    const itemData = {
                        images : files,
                    };
                    let dataItem = await Item.update({_id : id}, itemData);
                    dataItem.message = "Image Uploaded SuceesFully";
                    res.status(dataItem.status).json(dataItem);
                  }
        });
        
    })
    }else{
      data.message = "please ckeck item Id";
      res.status(data.status).json(data);
    }
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}



app.post('/uploadImages', upload.array("images"), uploadImages);

app.post('/uploadImageCustomer/:id', upload.single("images"), uploadImageCustomer);
app.post('/deleteImageCustomer/:id', upload.single("images"), deleteImageCustomer);
app.post('/uploadImageBrand/:id', upload.single("images"), uploadImageBrand);
app.post('/uploadCoverImageBrand/:id', upload.single("images"), uploadCoverImageBrand);
app.post('/uploadImageCategory/:id', upload.single("images"), uploadImageCategory);
app.post('/uploadImageCollection/:id', upload.single("images"), uploadImageCollection);
app.post('/uploadImageAdvertisement/:id', upload.single("images"), uploadImageAdvertisement);
app.post('/uploadItemCover/:id', upload.single("images"), uploadItemCover);
app.post('/uploadImagesItem/:id', upload.array("images"), uploadImagesItem);
app.post('/deleteImagesFromItem/:id', upload.array("images"), deleteImagesFromItem);

module.exports = app;
