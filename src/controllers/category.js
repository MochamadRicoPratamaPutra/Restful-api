const categoryModel = require('../models/category')
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllCategory = (req, res, next) => {
    categoryModel.getAllCategory()
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
            categoryModel.sortingTable(column)
            .then((result2)=>{
                const category = result2
                console.log('test + ' + result2);
                helpers.response(res, category, 200)
            })
            .catch((error)=>{
                console.log(error);
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            })
        }else if (searchColumn != undefined && name != undefined) {
            categoryModel.searchCategory(searchColumn, name)
            .then((result2)=>{
                const category = result2
                // console.log('test + ' + result2);
                helpers.response(res, category, 200)
            })
            .catch((error)=>{
                console.log(error);
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            })
        }
        else{
            const category = result
            helpers.response(res, category, 200)   
        }
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
const getCategoryById =(req, res, next) =>{
    const id = req.params.idsaya
    categoryModel.getCategoryById(id)
    .then((result) => {
        const category = result
        helpers.response(res, category, 200)
    })
    .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
const insertCategory = (req, res, next)=>{
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
    const {categoryID, name} = req.body
    const data = {
        name: name,
        createdAt: new Date(),
    }
    categoryModel.insertCategory(data)
    .then(()=>{
        helpers.response(res, data, 200)
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
} 


const updateCategory = (req, res) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
    const id = req.params.id
    const {categoryID, name} = req.body
    const data = {
        categoryID: categoryID,
        name: name,
        updatedAt: new Date()
}
categoryModel.updateCategory(id, data)
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

const deleteCategory = (req, res)=>{
const id = req.params.id
categoryModel.deleteCategory(id)
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
    getAllCategory,
    getCategoryById,
    insertCategory,
    updateCategory,
    deleteCategory
}