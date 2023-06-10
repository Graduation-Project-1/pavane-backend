const Advertisement = require('./advertisement.model');

exports.create = async (Data) => {
    try {
        let new_advertisement = new Advertisement(Data);
        let result = await new_advertisement.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "advertisementAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "advertisementNotAdded"
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


exports.isExist = async (filter) => {
    try {
        let result = await Advertisement.findOne(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "advertisement is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "advertisement is Not Exist"
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


exports.list = async (filter, page, size) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Advertisement.find(filter).limit(limit).skip(skip);
        const totalResult = await Advertisement.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Advertisement is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Advertisement is Not Exist"
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



exports.update = async (id, Data) => {
    try {
        let result = await Advertisement.findOneAndUpdate({_id : id}, Data,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "advertisementUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "advertisementNotUpdated"
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


exports.delete = async (id) => {
    try {
        let result = await Advertisement.findOneAndDelete({_id : id});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "advertisementDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "advertisementNotDeleted"
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