const Brand = require('../../models/brand/brand.repo');
const Collection = require('../../models/collection/collection.repo');
const Sale = require('../../models/sale/sale.repo');
const Item = require('../../models/item/item.repo');
const Customer = require('../../models/customer/customer.repo');
const BrandReview = require('../../models/brandReview/brand.review.repo');
const BrandBatch = require('../../models/brandBatch/brand.batch.repo');
const logger = require('../../helper/logger/logger');
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');


const loginBrand = async(req,res)=>{
    const {email,password} = req.body;
    let brand = await Brand.isExist({email:email});
    if (brand.success == false) {
        res.status(400).json({ message: "Please enter a valid email" })
    } else {
        let match = await bcrypt.compare(password, brand.Data.password);
        if (match) {
            let token = jwt.sign({ id: brand.Data._id, email : brand.Data.email, role: brand.Data.role }, process.env.SECRET_KEY);
            res.status(200).json({ message: "Success", token });
        } else {
            res.status(422).json({ message: "This password is invalid" })
        }
        logger.log({level : 'info' , id: brand.Data._id , role: "vendor", action : 'loginBrand',});
    }
}


const addBrand = async(req,res)=>{
    const {email} = req.body;
    const brandData = req.body;
    let brandisExist = await Brand.isExist({email:email});
    if(brandisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this email is taken",
        });
    }else{
        const hashPassword =  await bcrypt.hash(brandData.password, saltRounds);
        brandData.password = hashPassword;
        brandData.role = "vendor";
        let data = await Brand.create(brandData);
        res.status(data.status).json(data);
        logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'addBrand',});
    }
}

const getBrand = async(req,res)=>{
    const {email} = req.user;
    let data = await Brand.isExist({email:email}, ['categoryList'], "-password");
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getBrand',});
}

const getAllBrands = async(req,res)=>{
    let {categoryList,page, size } = req.query;
    let query= {};
    if(categoryList){
        query.categoryList = categoryList;
    }
    let data = await Brand.list(query, page, size, "-password");
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllBrands',});
}

const getBrandById = async(req,res)=>{
    const id = req.params.id;
    let data = await Brand.isExist({_id:id}, ['categoryList'],"-password");
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getBrandById',});
}

const updateBrand = async(req,res)=>{
    const id = req.params.id;
    const brandData = req.body;
    let data = await Brand.update({_id:id}, brandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'updateBrand',});
}

const updateProfileBrand = async(req,res)=>{
    const id = req.user.id;
    const brandData = req.body;
    let data = await Brand.update({_id:id}, brandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'updateProfileBrand',});
}


const deleteBrand = async(req,res)=>{
    const id = req.params.id;
    let itemList = await Item.list({brandId : id});
    let collectionList = await Collection.list({brandId : id});
    let batchData = {
        brandId : id,
        itemList : itemList.Data,
        collectionList : collectionList.Data
    }
    let data = await Brand.delete({_id:id});
    await Item.deleteList({brandId : id});
    await Customer.updateList({ likedBrands: id }, { '$pull': { likedBrands: id }});
    await Collection.deleteList({brandId : id});
    await Sale.deleteList({brandId : id});
    if(data.success == true){
        await BrandBatch.create(batchData);
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'deleteBrand',});
}


const deleteProfileBrand = async(req,res)=>{
    const id = req.user.id;
    let itemList = await Item.list({brandId : id});
    let collectionList = await Collection.list({brandId : id});
    let batchData = {
        brandId : id,
        itemList : itemList.Data,
        collectionList : collectionList.Data
    }
    let data = await Brand.delete({_id:id});
    await Item.deleteList({brandId : id});
    await Customer.updateList({ likedBrands : id }, { '$pull': { likedBrands: id }});
    await Collection.deleteList({brandId : id});
    await Sale.deleteList({brandId : id});
    if(data.success == true){
        await BrandBatch.create(batchData);
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'deleteProfileBrand',});
}


const getAllCategoriesByBrand = async(req,res)=>{
    const id = req.params.id;
    let data = await Brand.isExist({_id:id}, ['categoryList']);
    res.status(data.status).json({
        categoryList : data.Data.categoryList,
    });
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllCategoriesByBrand',});
}

const brandSearch = async (req, res) => {
    let { page, size, search } = req.query;
    let data = await Brand.list({ name: { $regex: search, $options: 'i' } }, page, size, "-password");
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'brandSearch',});
}


const getMostLikedBrands = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Brand.list({}, page, size, "-password", { numberOfLikes : -1});
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getMostLikedBrands',});
}

const archiveBrand = async(req,res)=>{
    const id = req.params.id;
    const BrandData = {
        isArchived : true,
    };
    let data = await Brand.update({_id : id}, BrandData);
    await BrandReview.updateList({brandId : id}, BrandData);
    await Item.updateList({brandId : id}, BrandData);
    await Collection.updateList({brandId : id}, BrandData);
    await Sale.updateList({brandId : id}, BrandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'archiveBrand',});
}

const disArchiveBrand = async(req,res)=>{
    const id = req.params.id;
    const BrandData = {
        isArchived : false,
    };
    let data = await Brand.update({_id : id}, BrandData);
    await BrandReview.updateList({brandId : id}, BrandData);
    await Item.updateList({brandId : id}, BrandData);
    await Collection.updateList({brandId : id}, BrandData);
    await Sale.updateList({brandId : id}, BrandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'disArchiveBrand',});
}


const archiveProfileBrand = async(req,res)=>{
    const id = req.user.id;
    const BrandData = {
        isArchived : true,
    };
    let data = await Brand.update({_id : id}, BrandData);
    await BrandReview.updateList({brandId : id}, BrandData);
    await Item.updateList({brandId : id}, BrandData);
    await Collection.updateList({brandId : id}, BrandData);
    await Sale.updateList({brandId : id}, BrandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'archiveProfileBrand',});
}

const disArchiveProfileBrand = async(req,res)=>{
    const id = req.user.id;
    const BrandData = {
        isArchived : false,
    };
    let data = await Brand.update({_id : id}, BrandData);
    await BrandReview.updateList({brandId : id}, BrandData);
    await Item.updateList({brandId : id}, BrandData);
    await Collection.updateList({brandId : id}, BrandData);
    await Sale.updateList({brandId : id}, BrandData);
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'disArchiveProfileBrand',});
}


module.exports = {
    loginBrand,
    addBrand,
    getBrand,
    getBrandById,
    updateBrand,
    deleteBrand,
    getAllBrands,
    getAllCategoriesByBrand,
    brandSearch,
    updateProfileBrand,
    deleteProfileBrand,
    getMostLikedBrands,
    archiveBrand,
    disArchiveBrand,
    archiveProfileBrand,
    disArchiveProfileBrand,
}