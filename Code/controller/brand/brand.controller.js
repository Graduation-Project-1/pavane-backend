const Brand = require('../../models/brand/brand.repo');
const Collection = require('../../models/collection/collection.repo');
const Item = require('../../models/item/item.repo');
const Customer = require('../../models/customer/customer.repo');
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
    }
}

const getBrand = async(req,res)=>{
    const {email} = req.user;
    let data = await Brand.isExist({email:email}, ['categoryList'], "-password");
    res.status(data.status).json(data);
}

const getAllBrands = async(req,res)=>{
    let {categoryList,page, size } = req.query;
    let query= {};
    if(categoryList){
        query.categoryList = categoryList;
    }
    let data = await Brand.list(query, page, size, "-password");
    res.status(data.status).json(data);
}

const getBrandById = async(req,res)=>{
    const id = req.params.id;
    let data = await Brand.isExist({_id:id}, ['categoryList'],"-password");
    res.status(data.status).json(data);
}

const updateBrand = async(req,res)=>{
    const id = req.params.id;
    const brandData = req.body;
    let data = await Brand.update({_id:id}, brandData);
    res.status(data.status).json(data);
}

const updateProfileBrand = async(req,res)=>{
    const id = req.user.id;
    const brandData = req.body;
    let data = await Brand.update({_id:id}, brandData);
    res.status(data.status).json(data);
}


const deleteBrand = async(req,res)=>{
    const id = req.params.id;
    let data = await Brand.delete({_id:id});
    await Item.deleteList({brandId : id});
    await Customer.updateList({ likedBrands: id }, { '$pull': { likedBrands: id }});
    await Collection.deleteList({brandId : id});  
    res.status(data.status).json(data);
}


const deleteProfileBrand = async(req,res)=>{
    const id = req.user.id;
    let data = await Brand.delete({_id:id});
    await Item.deleteList({brandId : id});
    await Customer.updateList({ likedBrands : id }, { '$pull': { likedBrands: id }});
    await Collection.deleteList({brandId : id});
    res.status(data.status).json(data);
}


const getAllCategoriesByBrand = async(req,res)=>{
    const id = req.params.id;
    let data = await Brand.isExist({_id:id}, ['categoryList']);
    res.status(data.status).json({
        categoryList : data.Data.categoryList,
    });
}

const brandSearch = async (req, res) => {
    let { page, size, search } = req.query;
    let data = await Brand.list({ name: { $regex: search, $options: 'i' } }, page, size, "-password");
    res.status(data.status).json(data);
}


const getMostLikedBrands = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Brand.list({}, page, size, "-password", { numberOfLikes : -1});
    res.status(data.status).json(data);
}

const hashAllPassword = async(req,res)=>{
    let page = 1;
    let size = 50;
    let data = await Brand.list({},page, size);
    
    data.Data.map(async(item)=>{
        //console.log(item.password);
        const hashPassword =  await bcrypt.hash(item.password, saltRounds);
        brandData = {
            password : hashPassword,
        }
        let data = await Brand.update({_id:item._id}, brandData);
    })
    res.status(data.status).json(data);
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
    hashAllPassword,
}