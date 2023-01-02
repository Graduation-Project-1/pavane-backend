const CollectionReview = require('../../models/collectionReview/collection.review.repo');
const Collection = require('../../models/collection/collection.repo');

const addCollectionReview = async(req,res)=>{
    const reviewData = req.body;
    reviewData.customerId = req.user.id;
    let collectionData = await Collection.isExist({_id : reviewData.collectionId});
    if(collectionData.success == true){
        let data = await CollectionReview.create(reviewData);
        let sumOfRate = collectionData.Data.averageRate * collectionData.Data.numberOfReviews;
        sumOfRate += reviewData.rate;
        let averageRate = sumOfRate / (collectionData.Data.numberOfReviews+1);
        await Collection.update({_id : reviewData.collectionId}, {$inc : {'numberOfReviews' : 1} , averageRate : averageRate})
        res.status(data.status).json(data);
    }else{
        res.status(collectionData.status).json(collectionData);
    }
    
}

const getCollectionReviewById = async(req,res)=>{
    const id = req.params.id;
    let data = await CollectionReview.isExist({_id:id});
    res.status(data.status).json(data);
}

const updateCollectionReview = async(req,res)=>{
    const id = req.params.id;
    const {rate , comment} = req.body;
    let reviewData = await CollectionReview.isExist({_id:id});
    let data = await CollectionReview.update({_id:id, customerId : req.user.id}, {rate , comment});
    if(data.success == false){
        data.message = "you can not update this comment";
    }else{
        if(rate){
            let collectionData = await Collection.isExist({_id : reviewData.Data.collectionId})
            let sumOfRate = collectionData.Data.averageRate * collectionData.Data.numberOfReviews;
            sumOfRate -= reviewData.Data.rate;
            sumOfRate += rate;
            let averageRate = sumOfRate / (collectionData.Data.numberOfReviews);
            await Collection.update({_id : reviewData.Data.collectionId}, {averageRate : averageRate})   
        }
    }
    res.status(data.status).json(data);
}


const deleteCollectionReview = async(req,res)=>{
    const id = req.params.id;
    let reviewData = await CollectionReview.isExist({_id:id});
    let data = await CollectionReview.delete({_id:id, customerId : req.user.id});
    if(data.success == false){
        data.message = "you can not delete this comment";
    }else{
        let collectionData = await Collection.isExist({_id : reviewData.Data.collectionId})
        let sumOfRate = collectionData.Data.averageRate * collectionData.Data.numberOfReviews;
        sumOfRate -= reviewData.Data.rate;
        let averageRate;
        if(collectionData.Data.numberOfReviews-1 == 0){
            averageRate = 0;
        }else{
            averageRate = sumOfRate / (collectionData.Data.numberOfReviews-1);
        }
        await Collection.update({_id : reviewData.Data.collectionId}, {$inc : {'numberOfReviews' : -1}, averageRate : averageRate})
    }
    res.status(data.status).json(data);
    
}


const getAllCollectionReviews = async(req,res)=>{
    const id = req.params.id;
    let {page, size } = req.query;
    let data = await CollectionReview.list({collectionId : id},page,size, { path: 'customerId', select: 'name image' } , "-collectionId");
    res.status(data.status).json(data);
}


module.exports = {
    addCollectionReview,
    getCollectionReviewById,
    updateCollectionReview,
    deleteCollectionReview,
    getAllCollectionReviews,
}