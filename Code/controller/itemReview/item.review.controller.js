const ItemReview = require('../../models/itemReview/item.review.repo');
const Item = require('../../models/item/item.repo');
var mongoose = require('mongoose');

const addItemReview = async(req,res)=>{
    const reviewData = req.body;
    reviewData.customerId = req.user.id;
    let itemData = await Item.isExist({_id : reviewData.itemId});
    if(itemData.success == true){
        let data = await ItemReview.create(reviewData);
        let sumOfRate = itemData.Data.averageRate * itemData.Data.numberOfReviews;
        sumOfRate += reviewData.rate;
        let averageRate = sumOfRate / (itemData.Data.numberOfReviews+1);
        await Item.update({_id : reviewData.itemId}, {$inc : {'numberOfReviews' : 1} , averageRate : averageRate})
        res.status(data.status).json(data);
    }else{
        res.status(itemData.status).json(itemData);
    }
    
}

const getItemReviewById = async(req,res)=>{
    const id = req.params.id;
    let data = await ItemReview.isExist({_id:id});
    res.status(data.status).json(data);
}

const updateItemReview = async(req,res)=>{
    const id = req.params.id;
    const {rate , comment} = req.body;
    let reviewData = await ItemReview.isExist({_id:id});
    let data = await ItemReview.update({_id:id, customerId : req.user.id}, {rate , comment});
    if(data.success == false){
        data.message = "you can not update this comment";
    }else{
        if(rate){
            let itemData = await Item.isExist({_id : reviewData.Data.itemId})
            let sumOfRate = itemData.Data.averageRate * itemData.Data.numberOfReviews;
            sumOfRate -= reviewData.Data.rate;
            sumOfRate += rate;
            let averageRate = sumOfRate / (itemData.Data.numberOfReviews);
            await Item.update({_id : reviewData.Data.itemId}, {averageRate : averageRate})   
        }
    }
    res.status(data.status).json(data);
}


const deleteItemReview = async(req,res)=>{
    const id = req.params.id;
    let reviewData = await ItemReview.isExist({_id:id});
    let data = await ItemReview.delete({_id:id, customerId : req.user.id});
    if(data.success == false){
        data.message = "you can not delete this comment";
    }else{
        let itemData = await Item.isExist({_id : reviewData.Data.itemId})
        let sumOfRate = itemData.Data.averageRate * itemData.Data.numberOfReviews;
        sumOfRate -= reviewData.Data.rate;
        let averageRate;
        if(itemData.Data.numberOfReviews-1 == 0){
            averageRate = 0;
        }else{
            averageRate = sumOfRate / (itemData.Data.numberOfReviews-1);
        }
        await Item.update({_id : reviewData.Data.itemId}, {$inc : {'numberOfReviews' : -1}, averageRate : averageRate})
    }
    res.status(data.status).json(data);
}


const getAllItemReviews = async(req,res)=>{
    const id = req.params.id;
    let {page, size } = req.query;
    let data = await ItemReview.list({itemId : id},page,size, { path: 'customerId', select: 'name image' } , "-itemId");
    res.status(data.status).json(data);
}


const convertItemIdInItemReviews = async(req,res)=>{
    let page = 1;
    let size = 5000000;
    let data = await ItemReview.list({},page,size);
    data.Data.map(async(item)=>{
        //console.log(item);
        var id = mongoose.Types.ObjectId(item.itemId);
        itemData = {
            itemId : id,
        }
        await ItemReview.update({_id : item._id}, itemData);
    })
    res.status(data.status).json(data);
}

const convertCustomerIdInItemReviews = async(req,res)=>{
    let page = 1;
    let size = 5000000;
    let data = await ItemReview.list({},page,size);
    data.Data.map(async(item)=>{
        //console.log(item);
        var id = mongoose.Types.ObjectId(item.customerId);
        itemData = {
            customerId : id,
        }
        await ItemReview.update({_id : item._id}, itemData);
    })
    res.status(data.status).json(data);
}


module.exports = {
    addItemReview,
    getItemReviewById,
    updateItemReview,
    deleteItemReview,
    getAllItemReviews,
    convertItemIdInItemReviews,
    convertCustomerIdInItemReviews,
}