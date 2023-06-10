const BrandBatch = require('../../models/brandBatch/brand.batch.repo');
const ItemReview = require('../../models/itemReview/item.review.repo');
const BrandReview = require('../../models/brandReview/brand.review.repo');
const CollectionReview = require('../../models/collectionReview/collection.review.repo');
const Customer = require('../../models/customer/customer.repo');

const deleteBrandBatch = async()=>{
    let data = await BrandBatch.list({});
    if(data.Data.length > 0){
        let brandData = data.Data[0];
        for(let i =0; i < brandData.itemList; i++){
            await ItemReview.deleteList({itemId : brandData.itemList[i]});
            await Customer.updateList({ likedItems: brandData.itemList[i] }, { '$pull': { likedItems: brandData.itemList[i] }});
        }
        for(let i =0; i < brandData.collectionList; i++){
            await Customer.updateList({ likedCollections: brandData.collectionList[i] }, { '$pull': { likedCollections: brandData.collectionList[i] }});
            await CollectionReview.deleteList({collectionId : brandData.collectionList[i]});
        }
        await BrandReview.deleteList({brandId : brandData.brandId});
        await BrandBatch.delete({_id : brandData._id});
    }
}

const checkSubscriptionCustomer = async()=>{
    await Customer.updateList({accountType: "premium"},{ $inc: { 'daysOfSubscription': -1 } });
    await Customer.updateList({accountType: "premium", daysOfSubscription : 0}, {accountType: "standard"});
}

module.exports = {
    deleteBrandBatch,
    checkSubscriptionCustomer,
}