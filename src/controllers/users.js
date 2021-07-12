const userModels = require('../models/users')
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const getAllUser = (req, res, next) => {
    userModels.getAllUser()
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
            userModels.sortingTable(column)
            .then((result2)=>{
                const users = result2
                console.log('test + ' + result2);
                helpers.response(res, users, 200)
            })
            .catch((error)=>{
                console.log(error);
                const errorMessage = new createError.InternalServerError()
                next(errorMessage)
            })
        }else if (searchColumn != undefined && name != undefined) {
            userModels.searchUser(searchColumn, name)
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
            const users = result
            helpers.response(res, users, 200)   
        }
    })
    .catch((error)=>{
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}
const getUserById =(req, res, next) =>{
    const id = req.params.idsaya
    userModels.getUserById(id)
    .then((result) => {
        const users = result
        helpers.response(res, users, 200)
    })
    .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError()
        next(errorMessage)
    })
}

const insertUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
const { name, email, password, phoneNumber, gender } = req.body
const data = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    gender: gender,
    createdAt: new Date()
}

userModels.insertUser(data)
    .then((result) => {
        helpers.response(res, {data}, 200)
    })
    .catch((error) => {
        console.log(error);

        helpers.response(res, null, 500, { message: 'internal server error' })
    })
}

const updateUser = (req, res) => {
    // const name = req.body.name
    // const price = req.body.price
    // const description =req.body.description
const id = req.params.id
const { name, email, password, phoneNumber, gender } = req.body
const data = {
    name: name,
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    gender: gender,
    modifiedAt: new Date()
}
userModels.updateUser(id, data)
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

const deleteUser = (req, res)=>{
const id = req.params.id
userModels.deleteUser(id)
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
    getAllUser,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
}