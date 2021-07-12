const orderDetailModel = require('../models/order_detail')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllOrderDetail = (req, res, next) => {
    orderDetailModel.getAllOrderDetail()
    .then((result)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const column = req.query.column
        const searchColumn = req.query.search
        const name = req.query.name
        if (Number.isNaN(page)==false && Number.isNaN(limit)==false) {
            const model = result
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const paginatingResult = {}
            if (endIndex < model.length) {
                paginatingResult.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                paginatingResult.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            paginatingResult.result = model.slice(startIndex, endIndex)
            try {
                // paginatingResult.result = model.slice(startIndex, endIndex)
                helpers.response(res, paginatingResult, 200)
            } catch (err) {
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            }
        }else if (column != undefined) {
            console.log('column ' + column);
            orderDetailModel.sortingTable(column)
            .then((result2)=>{
                const orderDetail = result2
                console.log('test + ' + result2);
                helpers.response(res, orderDetail, 200)
            })
            .catch((error)=>{
                console.log(error);
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            })
        }else if (searchColumn != undefined && name != undefined) {
            orderDetailModel.searchOrderDetail(searchColumn, name)
            .then((result2)=>{
                const products = result2
                // console.log('test + ' + result2);
                helpers.response(res, products, 200)
            })
            .catch((error)=>{
                console.log(error);
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            })
        }
        else{
            const orderDetail = result
            helpers.response(res, orderDetail, 200)   
        }
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
const getOrderDetailById =(req, res, next) =>{
    const id = req.params.idsaya
    orderDetailModel.getOrderDetailById(id)
    .then((result) => {
        const orderDetail = result
        helpers.response(res, orderDetail, 200)
    })
    .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}

const insertOrderDetail = (req, res, next)=>{
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
    const {categoryID, name} = req.body
    const data = {
        name: name,
        createdAt: new Date(),
    }
orderDetailModel.insertOrderDetail(data)
    .then(()=>{
        helpers.response(res, data, 200)
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
} 


const updateOrderDetail = (req, res) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
const id = req.params.id
const { userID, total} = req.body
const data = {
    id: id,
    userID: userID,
    total: total,
    modifiedAt: new Date()
}
orderDetailModel.updateOrderDetail(id, data)
    .then(() => {
        res.json({
            message: 'data berhasil di insert',
            data: data
        })
    })
    .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}

const deleteOrderDetail = (req, res)=>{
const id = req.params.id
orderDetailModel.deleteOrderDetail(id)
    .then(()=>{
        res.status(200)
        res.json({
        message: 'data berhasil di hapus',
        })
    })
    .catch((err)=>{
        console.log(err);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
module.exports = {
    getAllOrderDetail,
    getOrderDetailById,
    insertOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}