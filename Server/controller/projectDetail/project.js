const STATUS_CODE = require("../../constants/statusCode");
const project = require("../../model/project");
const catchAsync = require("../../utils/catchAsync");


exports.projectPost = catchAsync(async (req, res) => {
    const data = req.body
    const newData = new project()
    try {
        await newData.save()
        console.log("Store Data SucccessFully")
        res.status(STATUS_CODE.OK).json({ message: `Project Detail Inserted SuccessFully`, statusCode: STATUS_CODE.CREATED })
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR).json({ statusCode: STATUS_CODE.SERVER_ERROR, err })
    }

})

exports.projectGet = catchAsync(async(req, res)=>{
    try{
        const userData = await project.findById(req.params.id);
        res.status(userData).json({message : "Data Fatched Success Fully"})
    } catch(err) {
        res.status(STATUS_CODE.BAD_REQUEST).json({statusCode:STATUS_CODE.SERVER_ERROR , err})
    }
})