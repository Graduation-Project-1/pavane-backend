const Customer = require('../../models/customer/customer.repo');
const Item = require('../../models/item/item.repo');
const Brand = require('../../models/brand/brand.repo');
const Collection = require('../../models/collection/collection.repo');
const ItemReview = require('../../models/itemReview/item.review.repo');
const BrandReview = require('../../models/brandReview/brand.review.repo');
const CollectionReview = require('../../models/collectionReview/collection.review.repo');
const logger = require('../../helper/logger/logger');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');


const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    let customer = await Customer.isExist({ email: email });
    if (customer.success == false) {
        res.status(400).json({ message: "Please enter a valid email" })
    } else {
        let match = await bcrypt.compare(password, customer.Data.password);
        if (match) {
            let token = jwt.sign({ id: customer.Data._id, email: customer.Data.email, role: customer.Data.role }, process.env.SECRET_KEY);
            res.status(200).json({ message: "Success", token });
        } else {
            res.status(422).json({ message: "This password is invalid" })
        }
        logger.log({ level: 'info', id: customer.Data._id, role: "user", action: 'loginCustomer', });
    }
}


const addCustomer = async (req, res) => {
    const { email } = req.body;
    const customerData = req.body;
    let customerisExist = await Customer.isExist({ email: email });
    if (customerisExist.success == true) {
        res.status(400).json({
            success: false,
            message: "this email is taken",
        });
    } else {
        const hashPassword = await bcrypt.hash(customerData.password, saltRounds);
        customerData.password = hashPassword;
        customerData.role = "user";
        let data = await Customer.create(customerData);
        res.status(data.status).json(data);
    }
}

const getCustomer = async (req, res) => {
    const { email } = req.user;
    let data = await Customer.isExist({ email: email }, [], "-password");
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getCustomer', });
}

const updateCustomer = async (req, res) => {
    const id = req.params.id;
    const customerData = req.body;
    let data = await Customer.update({ _id: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'updateCustomer', });
}


const updateProfileCustomer = async (req, res) => {
    const id = req.user.id;
    const customerData = req.body;
    let data = await Customer.update({ _id: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'updateProfileCustomer', });
}


const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    let data = await Customer.delete({ _id: id });
    await ItemReview.deleteList({ customerId: id });
    await BrandReview.deleteList({ customerId: id });
    await CollectionReview.deleteList({ customerId: id });
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'deleteCustomer', });
}


const deleteProfileCustomer = async (req, res) => {
    const id = req.user.id;
    let data = await Customer.delete({ _id: id });
    await ItemReview.deleteList({ customerId: id });
    await BrandReview.deleteList({ customerId: id });
    await CollectionReview.deleteList({ customerId: id });
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'deleteProfileCustomer', });
}


const addToWishList = async (req, res) => {
    const id = req.params.id;
    const { email } = req.user;
    let dataCustomer = await Customer.isExist({ email: email });
    if(dataCustomer.status != 200){
        res.status(dataCustomer.status).json(dataCustomer);
    }else if (dataCustomer.Data.wishList.includes(id) == true) {
        res.status(400).json({
            success: false,
            message: "this item already in wishList",
        });
    } else {
        const data = await Customer.update({ _id: dataCustomer.Data._id }, { $push: { wishList: id } })
        if(data.status == 200){
            data.message = "this item is added to wishList";
        }
        res.status(data.status).json(data);
        logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'addToWishList', });
    }
}

const deleteFromWishList = async (req, res) => {
    const id = req.params.id;
    const { email } = req.user;
    let dataCustomer = await Customer.isExist({ email: email });
    const data = await Customer.update({ _id: dataCustomer.Data._id }, { $pull: { wishList: id } })
    data.message = "this item is deleted from wishList";
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'deleteFromWishList', });
}

const getWishList = async (req, res) => {
    const { email } = req.user;
    let populationQuery = {
        path: 'wishList',
        populate: { path: 'brandId', select: 'name' }
    }
    let data = await Customer.isExist({ email: email }, populationQuery);
    if (data.success == true) {
        res.status(data.status).json({
            wishList: data.Data.wishList,
        });
    } else {
        res.status(data.status).json(data);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getWishList', });
}


const likeItem = async (req, res) => {
    const id = req.params.id;
    const { email } = req.user;
    let dataCustomer = await Customer.isExist({ email: email });
    if (dataCustomer.success == true) {
        if (dataCustomer.Data.likedItems.includes(id) == true) {
            res.status(400).json({
                success: false,
                message: "this item already in likedItems",
            });
        } else {
            const data = await Customer.update({ _id: dataCustomer.Data._id }, { $push: { likedItems: id } })
            const itemData = await Item.update({ _id: id }, { $inc: { 'numberOfLikes': 1 } })
            data.message = "this item is liked";
            res.status(data.status).json(data);
        }
    } else {
        res.status(dataCustomer.status).json(dataCustomer);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'likeItem', });
}

const likeBrand = async (req, res) => {
    const id = req.params.id;
    const { email } = req.user;
    let dataCustomer = await Customer.isExist({ email: email });
    if (dataCustomer.success == true) {
        if (dataCustomer.Data.likedBrands.includes(id) == true) {
            res.status(400).json({
                success: false,
                message: "this brand already in likedBrands",
            });
        } else {
            const data = await Customer.update({ _id: dataCustomer.Data._id }, { $push: { likedBrands: id } })
            const brandData = await Brand.update({ _id: id }, { $inc: { 'numberOfLikes': 1 } })
            data.message = "this brand is liked";
            res.status(data.status).json(data);
        }
    } else {
        res.status(dataCustomer.status).json(dataCustomer);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'likeBrand', });
}

const likeCollection = async (req, res) => {
    const id = req.params.id;
    const { email } = req.user;
    let dataCustomer = await Customer.isExist({ email: email });
    if (dataCustomer.success == true) {
        if (dataCustomer.Data.likedCollections.includes(id) == true) {
            res.status(400).json({
                success: false,
                message: "this collection already in likedCollections",
            });
        } else {
            const data = await Customer.update({ _id: dataCustomer.Data._id }, { $push: { likedCollections: id } })
            const collectionData = await Collection.update({ _id: id }, { $inc: { 'numberOfLikes': 1 } })
            data.message = "this collection is liked";
            res.status(data.status).json(data);
        }
    } else {
        res.status(dataCustomer.status).json(dataCustomer);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'likeCollection', });
}


const getLikedItems = async (req, res) => {
    const { email } = req.user;
    let populationQuery = {
        path: 'likedItems',
        populate: { path: 'brandId', select: 'name' }
    }
    let data = await Customer.isExist({ email: email }, populationQuery);
    if (data.success == true) {
        res.status(data.status).json({
            likedItems: data.Data.likedItems,
        });
    } else {
        res.status(data.status).json(data);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getLikedItems', });
}

const getLikedBrands = async (req, res) => {
    const { email } = req.user;
    let data = await Customer.isExist({ email: email }, ['likedBrands']);
    if (data.success == true) {
        res.status(data.status).json({
            likedBrands: data.Data.likedBrands,
        });
    } else {
        res.status(data.status).json(data);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getLikedBrands', });
}


const getlikedCollections = async (req, res) => {
    const { email } = req.user;
    let data = await Customer.isExist({ email: email }, ['likedCollections']);
    if (data.success == true) {
        res.status(data.status).json({
            likedCollections: data.Data.likedCollections,
        });
    } else {
        res.status(data.status).json(data);
    }
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getlikedCollections', });
}


const getAllCustomers = async (req, res) => {
    let { page, size } = req.query;
    let data = await Customer.list({}, page, size, ["-password", "-cardNumber"]);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getAllCustomers', });
}


const getCustomerById = async (req, res) => {
    const id = req.params.id;
    let data = await Customer.isExist({ _id: id }, ['wishList', 'likedBrands', 'likedItems', 'likedCollections'], ["-password", "-cardNumber"]);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'getCustomerById', });
}


const archiveCustomer = async (req, res) => {
    const id = req.params.id;
    const customerData = {
        isArchived: true,
    };
    let data = await Customer.update({ _id: id }, customerData);
    await ItemReview.updateList({ customerId: id }, customerData);
    await BrandReview.updateList({ customerId: id }, customerData);
    await CollectionReview.updateList({ customerId: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'archiveCustomer', });
}

const disArchiveCustomer = async (req, res) => {
    const id = req.params.id;
    const customerData = {
        isArchived: false,
    };
    let data = await Customer.update({ _id: id }, customerData);
    await ItemReview.updateList({ customerId: id }, customerData);
    await BrandReview.updateList({ customerId: id }, customerData);
    await CollectionReview.updateList({ customerId: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'disArchiveCustomer', });
}

const archiveProfile = async (req, res) => {
    const id = req.user.id;
    const customerData = {
        isArchived: true,
    };
    let data = await Customer.update({ _id: id }, customerData);
    await ItemReview.updateList({ customerId: id }, customerData);
    await BrandReview.updateList({ customerId: id }, customerData);
    await CollectionReview.updateList({ customerId: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'archiveProfile', });
}

const disArchiveProfile = async (req, res) => {
    const id = req.user.id;
    const customerData = {
        isArchived: false,
    };
    let data = await Customer.update({ _id: id }, customerData);
    await ItemReview.updateList({ customerId: id }, customerData);
    await BrandReview.updateList({ customerId: id }, customerData);
    await CollectionReview.updateList({ customerId: id }, customerData);
    res.status(data.status).json(data);
    logger.log({ level: 'info', id: req.user.id, role: req.user.role, action: 'disArchiveProfile', });
}

const subscribe = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            metadata : {
                customerId : req.user.id,
            }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            customer : customer.id,
            line_items: [
                {
                  price: "price_1MjTQPEt8y70aFD8gztr4x7y",
                  quantity: 1,
                },
            ],
            success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/canceled.html',
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
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
    archiveCustomer,
    disArchiveCustomer,
    archiveProfile,
    disArchiveProfile,
    subscribe,
}