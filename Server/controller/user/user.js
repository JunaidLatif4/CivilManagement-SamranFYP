const roles = require("../../constants/roles");
const STATUS_CODE = require("../../constants/statusCode");
const userModel = require("../../model/user");
const bycrypt = require("../../utils/bycrypt");
const saveFileToPublic = require("../../utils/saveFileToPublic");
const catchAsync = require("../../utils/catchAsync");
// const { uploadFile } = require("../../utils/s3Uploader")

exports.approve = catchAsync(async (req, res, next) => {
    try {
        let _id = req.params.id;
        let approved = req.params.status;
        if (!_id) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Id is required.", statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }
        if (!approved) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: "status is required.", statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }
        await userModel.updateOne({ _id }, {
            $set: {
                approved,
            }
        })
            .then(doc => {
                if (doc.modifiedCount) {
                    res.status(STATUS_CODE.OK).json({ message: `Approved status is set to ${approved} successfully.`, statusCode: STATUS_CODE.OK });
                    return;
                }
                res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Unable to approve.", statusCode: STATUS_CODE.BAD_REQUEST });
            })
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.ban = catchAsync(async (req, res) => {
    try {
        let _id = req.params.id;
        let banned = req.params.status;
        if (!_id) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Id is required.", statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }
        if (!banned) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: "status is required.", statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }
        await userModel.updateOne({ _id }, {
            $set: {
                banned,
            }
        })
            .then(doc => {
                if (doc.modifiedCount) {
                    res.status(STATUS_CODE.OK).json({ message: `banned status is set to ${banned} successfully.`, statusCode: STATUS_CODE.OK });
                    return;
                }
                res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Unable to ban.", statusCode: STATUS_CODE.BAD_REQUEST });
            })
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.getById = catchAsync(async (req, res) => {
    try {
        let _id = req.params.id;
        if (!_id) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Id is required.", statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }
        await userModel.findOne({ _id })
            .then(doc => {
                if (doc) {
                    res.status(STATUS_CODE.OK).json({ data: doc, statusCode: STATUS_CODE.OK });
                    return;
                }
                res.status(STATUS_CODE.NOT_FOUND).json({ message: "Not found", statusCode: STATUS_CODE.NOT_FOUND });
            })
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.updateAccount = catchAsync(async (req, res) => {
    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let password = req.body.password;
        // let directoryPath = 

        let data = {};
        if (firstName) data.firstName = firstName;
        if (lastName) data.lastName = lastName;
        if (req.file) {
            // data.profileImage = await uploadFile(req.file);
        }
        if (password) {
            const hashPassword = await bycrypt.hashPassword(password);
            if (hashPassword) {
                data.password = hashPassword;
            } else {
                res.status(STATUS_CODE.SERVER_ERROR).json({ message: `Unable to hash password`, statusCode: STATUS_CODE.SERVER_ERROR });
                return;
            }
        }

        if (Object.entries(data).length === 0) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: `Please provide some data to modify`, statusCode: STATUS_CODE.BAD_REQUEST });
            return;
        }

        let docs = await userModel.findOneAndUpdate({ _id: req.user._id }, {
            $set: data,
        }, { returnOriginal: false });

        if (docs.isModified) {
            res.status(STATUS_CODE.OK).json({ message: `Profile updated successfully`, statusCode: STATUS_CODE.OK, data: docs });
            return;
        }

        res.status(STATUS_CODE.BAD_REQUEST).json({ message: `Profile updatetion failed`, statusCode: STATUS_CODE.BAD_REQUEST });
        return;



    } catch (err) {
        console.log(err)
        res.status(STATUS_CODE.SERVER_ERROR).json({ message: `Server error occur`, statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.getAll = catchAsync(async (req, res) => {
    try {
        let role = req.query.role?.split(",");
        if (Array.isArray(role)) {
            role = role.map(el => el.trim());
        }
        let search = req.query.search;
        let condition = {
            archived: false,
            _id: { $ne: req.user._id }
        };
        if (role) {
            condition.$and = [{ role }];
        }

        if (search) {
            condition.$and = [
                ...(condition.$and ? condition.$and : []),
                {

                    $or: [
                        { "firstName": { "$regex": search, "$options": "i" } },
                        { "lastName": { "$regex": search, "$options": "i" } },
                        { "email": { "$regex": search, "$options": "i" } }
                    ],
                }
            ];
        }

        let perPage = req.query.perPage || 20;
        let page = req.query.page || 0;
        let doc = await userModel.find({ ...condition }).skip(page * perPage).limit(perPage);
        let count = await userModel.countDocuments(condition);
        res.status(STATUS_CODE.OK).json({ data: doc, total: count, page, perPage, statusCode: STATUS_CODE.OK });
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.getAllClients = catchAsync(async (req, res) => {
    try {
        const result = await userModel.find({ role: roles.CLIENT }).select("firstName lastName email _id")
        res.status(STATUS_CODE.OK).json({ result, statusCode: STATUS_CODE.OK });
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.getAllContractors = catchAsync(async (req, res) => {
    try {
        const result = await userModel.find({ role: roles.CONTRACTOR }).select("firstName lastName email _id")
        res.status(STATUS_CODE.OK).json({ result, statusCode: STATUS_CODE.OK });
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})

exports.getAllEngineers = catchAsync(async (req, res) => {
    try {
        const result = await userModel.find({ role: roles.ENGINEER }).select("firstName lastName email _id")
        res.status(STATUS_CODE.OK).json({ result, statusCode: STATUS_CODE.OK });
    } catch (err) {
        console.log(err);
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR });
    }
})
