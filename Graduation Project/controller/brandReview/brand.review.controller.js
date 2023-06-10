const BrandReview = require('../../models/brandReview/brand.review.repo');
const Brand = require('../../models/brand/brand.repo');
const logger = require('../../helper/logger/logger');

const addBrandReview = async(req,res)=>{
    const reviewData = req.body;
    reviewData.customerId = req.user.id;
    let brandData = await Brand.isExist({_id : reviewData.brandId});
    if(brandData.success == true){
        let data = await BrandReview.create(reviewData);
        let sumOfRate = brandData.Data.averageRate * brandData.Data.numberOfReviews;
        sumOfRate += reviewData.rate;
        let averageRate = sumOfRate / (brandData.Data.numberOfReviews+1);
        await Brand.update({_id : reviewData.brandId}, {$inc : {'numberOfReviews' : 1} , averageRate : averageRate})
        res.status(data.status).json(data);
    }else{
        res.status(brandData.status).json(brandData);
    }
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'addBrandReview',});
}

const getBrandReviewById = async(req,res)=>{
    const id = req.params.id;
    let data = await BrandReview.isExist({_id:id});
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getBrandReviewById',});
}

const updateBrandReview = async(req,res)=>{
    const id = req.params.id;
    const {rate , comment} = req.body;
    let reviewData = await BrandReview.isExist({_id:id});
    let data = await BrandReview.update({_id:id, customerId : req.user.id}, {rate , comment});
    if(data.success == false){
        data.message = "you can not update this comment";
    }else{
        if(rate){
            let brandData = await Brand.isExist({_id : reviewData.Data.brandId})
            let sumOfRate = brandData.Data.averageRate * brandData.Data.numberOfReviews;
            sumOfRate -= reviewData.Data.rate;
            sumOfRate += rate;
            let averageRate = sumOfRate / (brandData.Data.numberOfReviews);
            await Brand.update({_id : reviewData.Data.brandId}, {averageRate : averageRate})   
        }
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'updateBrandReview',});
}


const deleteBrandReview = async(req,res)=>{
    const id = req.params.id;
    let reviewData = await BrandReview.isExist({_id:id});
    let data = await BrandReview.delete({_id:id, customerId : req.user.id});
    if(data.success == false){
        data.message = "you can not delete this comment";
    }else{
        let brandData = await Brand.isExist({_id : reviewData.Data.brandId})
        let sumOfRate = brandData.Data.averageRate * brandData.Data.numberOfReviews;
        sumOfRate -= reviewData.Data.rate;
        let averageRate;
        if(brandData.Data.numberOfReviews-1 == 0){
            averageRate = 0;
        }else{
            averageRate = sumOfRate / (brandData.Data.numberOfReviews-1);
        }
        await Brand.update({_id : reviewData.Data.brandId}, {$inc : {'numberOfReviews' : -1}, averageRate : averageRate})
    }
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'deleteBrandReview',});
    
}


const getAllBrandReviews = async(req,res)=>{
    const id = req.params.id;
    let {page, size } = req.query;
    let data = await BrandReview.list({brandId : id},page,size, { path: 'customerId', select: 'name image' } , "-brandId");
    res.status(data.status).json(data);
    logger.log({level : 'info' , id: req.user.id , role: req.user.role, action : 'getAllBrandReviews',});
}


module.exports = {
    addBrandReview,
    getBrandReviewById,
    updateBrandReview,
    deleteBrandReview,
    getAllBrandReviews,
}