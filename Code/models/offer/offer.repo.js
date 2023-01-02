const Offer = require('./offer.model');

exports.create = async (Data) => {
    try {
        let new_offer = new Offer(Data);
        let result = await new_offer.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "offerAdded",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "offerNotAdded"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}

exports.isExist = async (filter, populateType) => {
    try {
        let result = await Offer.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "offer is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "offer is Not Exist"
            }
        }
    } 
    catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
   }
}


exports.list = async (filter, page, size,populateType) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Offer.find(filter).limit(limit).skip(skip).populate(populateType);
        const totalResult = await Offer.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Offer is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Offer is Not Exist"
            }
        }
    } 
    catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
   }
}


exports.update = async (filter, query) => {
    try {
        let result = await Offer.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "offerUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "offerNotUpdated"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.delete = async (filter) => {
    try {
        let result = await Offer.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "offerDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "offerNotDeleted"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}