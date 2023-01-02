const Customer = require('../../models/customer/customer.repo');
const Item = require('../../models/item/item.repo');
const Brand = require('../../models/brand/brand.repo');
const Collection = require('../../models/collection/collection.repo');
const ItemReview = require('../../models/itemReview/item.review.repo')
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');


const loginCustomer = async(req,res)=>{
    const {email,password} = req.body;
    let customer = await Customer.isExist({email:email});
    if (customer.success == false) {
        res.status(400).json({ message: "Please enter a valid email" })
    } else {
        let match = await bcrypt.compare(password, customer.Data.password);
        if (match) {
            let token = jwt.sign({ id: customer.Data._id, email : customer.Data.email, role: customer.Data.role }, process.env.SECRET_KEY);
            res.status(200).json({ message: "Success", token });
        } else {
            res.status(422).json({ message: "This password is invalid" })
        }
    }
}


const addCustomer = async(req,res)=>{
    const {email} = req.body;
    const customerData = req.body;
    let customerisExist = await Customer.isExist({email:email});
    if(customerisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this email is taken",
        });
    }else{
        const hashPassword =  await bcrypt.hash(customerData.password, saltRounds);
        customerData.password = hashPassword;
        customerData.role = "user";
        let data = await Customer.create(customerData);
        res.status(data.status).json(data);
    }
}

const getCustomer = async(req,res)=>{
    const {email} = req.user;
    let data = await Customer.isExist({email:email}, [], "-password");
    res.status(data.status).json(data);
}

const updateCustomer = async(req,res)=>{
    const id = req.params.id;
    const customerData = req.body;
    let data = await Customer.update({_id : id}, customerData);
    res.status(data.status).json(data);
}


const updateProfileCustomer = async(req,res)=>{
    const id = req.user.id;
    const customerData = req.body;
    let data = await Customer.update({_id : id}, customerData);
    res.status(data.status).json(data);
}


const deleteCustomer = async(req,res)=>{
    const id = req.params.id;
    let data = await Customer.delete({_id : id});
    await ItemReview.deleteList({customerId : id});
    res.status(data.status).json(data);
}


const deleteProfileCustomer = async(req,res)=>{
    const id = req.user.id;
    let data = await Customer.delete({_id : id});
    res.status(data.status).json(data);
}


const addToWishList = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataCustomer = await Customer.isExist({email:email});
    if(dataCustomer.Data.wishList.includes(id) == true){
        res.status(400).json({
            success: false,
            message: "this item already in wishList",
        });
    }else{
        const data  = await Customer.update({_id : dataCustomer.Data._id}, { $push: { wishList : id } })
        data.message = "this item is added to wishList";
        res.status(data.status).json(data);
    }
}

const deleteFromWishList = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataCustomer = await Customer.isExist({email:email});
    const data  = await Customer.update({_id : dataCustomer.Data._id}, { $pull: { wishList : id } })
    data.message = "this item is deleted from wishList";
    res.status(data.status).json(data);
}

const getWishList = async(req,res)=>{
    const {email} = req.user;
    let populationQuery = {
        path: 'wishList',
        populate: { path: 'brandId', select: 'name'}
    }
    let data = await Customer.isExist({email:email}, populationQuery);
    if(data.success == true){
        res.status(data.status).json({
            wishList : data.Data.wishList,
        });
    }else{
        res.status(data.status).json(data);
    }
    
}


const likeItem = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataCustomer = await Customer.isExist({email:email});
    if(dataCustomer.success == true){
        if(dataCustomer.Data.likedItems.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this item already in likedItems",
            });
        }else{
            const data  = await Customer.update({_id : dataCustomer.Data._id}, { $push: { likedItems : id } })
            const itemData = await Item.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this item is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataCustomer.status).json(dataCustomer);
    }
}

const likeBrand = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataCustomer = await Customer.isExist({email:email});
    if(dataCustomer.success == true){
        if(dataCustomer.Data.likedBrands.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this brand already in likedBrands",
            });
        }else{
            const data  = await Customer.update({_id : dataCustomer.Data._id}, { $push: { likedBrands : id } })
            const brandData = await Brand.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this brand is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataCustomer.status).json(dataCustomer);
    }
    
}

const likeCollection = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataCustomer = await Customer.isExist({email:email});
    if(dataCustomer.success == true){
        if(dataCustomer.Data.likedCollections.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this collection already in likedCollections",
            });
        }else{
            const data  = await Customer.update({_id : dataCustomer.Data._id}, { $push: { likedCollections : id } })
            const collectionData = await Collection.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this collection is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataCustomer.status).json(dataCustomer);
    }
}


const getLikedItems = async(req,res)=>{
    const {email} = req.user;
    let populationQuery = {
        path: 'likedItems',
        populate: { path: 'brandId', select: 'name' }
    }
    let data = await Customer.isExist({email:email}, populationQuery);
    if(data.success == true){
        res.status(data.status).json({
            likedItems : data.Data.likedItems,
        });
    }else{
        res.status(data.status).json(data);
    }
    
}

const getLikedBrands = async(req,res)=>{
    const {email} = req.user;
    let data = await Customer.isExist({email:email},['likedBrands']);
    if(data.success == true){
        res.status(data.status).json({
            likedBrands : data.Data.likedBrands,
        });
    }else{
        res.status(data.status).json(data);
    }
   
}


const getlikedCollections = async(req,res)=>{
    const {email} = req.user;
    let data = await Customer.isExist({email:email},['likedCollections']);
    if(data.success == true){
        res.status(data.status).json({
            likedCollections : data.Data.likedCollections,
        });
    }else{
        res.status(data.status).json(data);
    }
}


const getAllCustomers = async(req,res)=>{
    let { page, size } = req.query;
    let data = await Customer.list({}, page, size, ["-password", "-cardNumber"]);
    res.status(data.status).json(data);
}


const getCustomerById = async(req,res)=>{
    const id = req.params.id;
    let data = await Customer.isExist({_id:id}, ['wishList', 'likedBrands', 'likedItems', 'likedCollections'],["-password", "-cardNumber"]);
    res.status(data.status).json(data);
}


const calculateNumberOfLikes = async(req,res)=>{
    let page = 1;
    let size = 2000000;
    let data = await Customer.list({}, page, size);
    console.log(data.Data.length);
    for(var i =0; i < data.Data.length; i++){
        let itemReviewData = await ItemReview.list({customerId : data.Data[i]._id},page,size);
        for(var j = 0; j < itemReviewData.Data.length; j++){
            if(itemReviewData.Data[j].rate >= 3){
                await Customer.update({_id : data.Data[i]._id}, { $push: { likedItems : itemReviewData.Data[j].itemId } })
                await Item.update({_id : itemReviewData.Data[j].itemId}, {$inc : {'numberOfLikes' : 1}})
            }
        }
        //console.log(itemReviewData);
    }
    res.status(data.status).json(data);

}


module.exports = {
    loginCustomer,
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    addToWishList,
    deleteFromWishList,
    getWishList,
    likeItem,
    likeBrand,
    likeCollection,
    getLikedItems,
    getLikedBrands,
    getlikedCollections,
    updateProfileCustomer,
    deleteProfileCustomer,
    getAllCustomers,
    getCustomerById,
    calculateNumberOfLikes,
}