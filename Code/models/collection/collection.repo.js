const Collection = require('./collection.model');

exports.create = async (Data) => {
    try {
        let new_collection = new Collection(Data);
        let result = await new_collection.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "collectionAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collectionNotAdded"
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
        let result = await Collection.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "collection is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collection is Not Exist"
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


exports.list = async (filter, page, size, sort) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Collection.find(filter).limit(limit).skip(skip).sort(sort);
        const totalResult = await Collection.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Collection is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Collection is Not Exist"
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
        let result = await Collection.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "collectionUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collectionNotUpdated"
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


exports.updateList = async (filter, query) => {
    try {
        let result = await Collection.updateMany(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "collectionUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collectionNotUpdated"
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
        let result = await Collection.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "collectionDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collectionNotDeleted"
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


exports.deleteList = async (filter) => {
    try {
        let result = await Collection.deleteMany(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "collectionDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "collectionNotDeleted"
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