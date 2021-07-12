const connection = require('../controllers/db')

const insertUser = (data) => {
    return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}
const getAllUser = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT * FROM users", (error, result) => {
        if (!error){
            resolve(result)
        }else{
            reject(error)
        }
        })
    })
}
const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET ? WHERE id = ?', [data, id] , (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}

const deleteUser = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (!error) {
            resolve(result)
        } else {
            reject(error)
        }
        })
    })
}
const getUserById =(id)=>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users where id = ?",id, (error, result) => {
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
        connection.query(`SELECT * FROM users ORDER BY ${column} ASC`, (error, result2) =>{
            if(!error){
                resolve(result2)
            }else{
                reject(error)
            }
        })
    })
}
const searchUser = (column, name)=>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM users WHERE ${column} LIKE '%${name}%'`, (error, result)=>{
            if (!error) {
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}
module.exports = {
    getAllUser,
    getUserById,
    sortingTable,
    insertUser,
    searchUser,
    updateUser,
    deleteUser
}