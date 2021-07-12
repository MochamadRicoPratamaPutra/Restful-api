const productModel = require('../models/products')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')


const getAllProduct = (req, res, next) => {
    productModel.getAllProduct()
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
            // console.log('column ' + column);
            productModel.sortingTable(column)
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
        }else if (searchColumn != undefined && name != undefined) {
            productModel.searchProduct(searchColumn, name)
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
            const products = result
            helpers.response(res, products, 200)   
        }
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
const getProductById =(req, res, next) =>{
    const id = req.params.idsaya
    productModel.getProductById(id)
    .then((result) => {
        const products = result
        helpers.response(res, products, 200)
    })
    .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}

const insertProduct = (req, res, next)=>{
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
    const {name, price, description, stock, imgUrl} = req.body
    const data = {
        name: name,
        price: price,
        description: description,
        stock: stock,
        imgUrl: imgUrl,
        createdAt: new Date(),
    }
productModel.insertProduct(data)
    .then(()=>{
        helpers.response(res, data, 200)
    })
    .catch((error)=>{
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
} 


const updateProduct = (req, res) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
const id = req.params.id
const { name, price, description, stock, imgUrl} = req.body
const data = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    imgUrl: imgUrl,
    // categoryID: categoryID,
    updatedAt: new Date()
}
productModel.updateProduct(id, data)
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

const deleteProduct = (req, res)=>{
const id = req.params.id
productModel.deleteProduct(id)
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
    getAllProduct,
    getProductById,
    // sortingTable,
    // paginatedResults,
    insertProduct,
    updateProduct,
    deleteProduct
}