const connection = require('../controllers/db')

const getAllOrderDetail = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM order_detail", (error, result) => {
        if (!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}

const insertOrderDetail = (data)=>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO order_detail SET ?', data, (error, result)=>{
        if(!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}

const updateOrderDetail = (id, data) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE order_detail SET ? WHERE id = ?', [data, id] , (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}

const deleteOrderDetail = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM order_detail WHERE id = ?', id, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}
const getOrderDetailById =(id)=>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM order_detail where id = ?",id, (error, result) => {
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
        connection.query(`SELECT * FROM order_detail ORDER BY ${column} ASC`, (error, result2) =>{
            if(!error){
                resolve(result2)
            }else{
                reject(error)
            }
        })
    })
}
const searchOrderDetail = (column, name)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM order_detail WHERE ${column} LIKE '%${name}%'`, (error, result)=>{
            if (!error) {
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}
module.exports = {
    getAllOrderDetail,
    getOrderDetailById,
    sortingTable,
    insertOrderDetail,
    searchOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}
