const Item = require('./item.model');

exports.create = async (Data) => {
    try {
        let new_Item = new Item(Data);
        let result = await new_Item.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "ItemAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ItemNotAdded"
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
        let result = await Item.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Item is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Item is Not Exist"
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


exports.list = async (filter, page, size, populateType, sort) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Item.find(filter).limit(limit).skip(skip).populate(populateType).sort(sort);
        const totalResult = await Item.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Items is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Items is Not Exist"
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
        let result = await Item.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ItemUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ItemNotUpdated"
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
        let result = await Item.updateMany(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ItemUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ItemNotUpdated"
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
        let result = await Item.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ItemDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ItemNotDeleted"
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
        let result = await Item.deleteMany(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ItemDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ItemNotDeleted"
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