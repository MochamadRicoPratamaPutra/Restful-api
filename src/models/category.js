const connection = require('../controllers/db')

const getAllCategory = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM category", (error, result) => {
        if (!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}

const insertCategory = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO category SET ?', data, (error, result)=>{
        if(!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}

const updateCategory = (id, data) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE category SET ? WHERE categoryID = ?', [data, id] , (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}

const deleteCategory = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM category WHERE categoryID = ?', id, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}
const getCategoryById =(id)=>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM category where categoryID = ?",id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const sortingTable = (column) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM category ORDER BY ${column} ASC`, (error, result2) =>{
            if(!error){
                resolve(result2)
            }else{
                reject(error)
            }
        })
    })
}
const searchCategory = (column, name)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM category WHERE ${column} LIKE '%${name}%'`, (error, result)=>{
            if (!error) {
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}
module.exports = {
    getAllCategory,
    insertCategory,
    getCategoryById,
    sortingTable,
    updateCategory,
    searchCategory,
    deleteCategory
}