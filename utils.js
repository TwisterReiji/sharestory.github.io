import { redirect } from "./index.js"

export function getDataFromDoc(doc) {
    const data = doc.data()
    data.id = doc.id
    return data
  }
  // lay du lieu tu get many document
  export function getDataFromDocs(data) {
    // const docs = data.docs
    // const listRes = []
    // for (const item of docs) {
    //   listRes.push(getDataFromDoc(item))
    // }
    // return listRes
    return data.docs.map(getDataFromDoc)
  }
  // Chuyển Json Object thành Json String rồi khởi tạo local storage 
  export function saveTolocalStorage(key,value) {
    localStorage.setItem(key, JSON.stringify(value))  
  }
  // Chuyển json thành Object rồi lấy dữ liệu từ local storage
  export function getItemlocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))  
  }

  export function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key)
    
  }
  // 14/12/2020 21:20
  export function covertDate(dateStr) {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const hour = valuedateNumber (date.getHours())
    const minutes=valuedateNumber(date.getMinutes())
    return `${day}/${month}/${year} ${hour}:${minutes}`  
  }
  export function valuedateNumber(number) {
    return (number < 10) ? ('0' + number) :(number)
    
  }