const Customer = require('./customer.model');

exports.create = async (Data) => {
    try {
        let new_customer = new Customer(Data);
        let result = await new_customer.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "customerAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "customerNotAdded"
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

exports.isExist = async (filter,populateType , select) => {
    try {
        let result = await Customer.findOne(filter).populate(populateType).select(select);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Customer is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Customer is Not Exist"
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

exports.list = async (filter, page, size,select) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Customer.find(filter).limit(limit).skip(skip).select(select);
        const totalResult = await Customer.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Customer is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Customer is Not Exist"
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
        let result = await Customer.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "CustomerUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "CustomerNotUpdated"
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
        let result = await Customer.updateMany(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "CustomerUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "CustomerNotUpdated"
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
        let result = await Customer.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "CustomerDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "CustomerNotDeleted"
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