let productName = document.getElementById("productName")
let productCategory = document.getElementById("productCategory")
let productPrice = document.getElementById("productPrice")
let productDescription = document.getElementById("productDescription")
let addBtn = document.getElementById("add")
let danger = document.querySelector(".dangerName")
let update = document.getElementById("update")

let arr = []

// check if the localStorage is not empty or have a data
if (localStorage.getItem("products") != null) {
    arr = JSON.parse(localStorage.getItem("products"))
    loopForData()
}

// function that add the products in an object which added to an arry 
function addProduct() {
    let obj = {
        Name: productName.value,
        Category: productCategory.value,
        Price: productPrice.value,
        Description: productDescription.value
    }
    arr.push(obj)
    localStorage.setItem("products", JSON.stringify(arr))
    loopForData()
    clearInputs()
}

// function that make loop for the arry that contains the products and added to the document
function loopForData() {
    let cartona = ""
    for (let i = - 0; i < arr.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${arr[i].Name}</td>
            <td>${arr[i].Category}</td>
            <td>${arr[i].Price}</td>
            <td>${arr[i].Description}</td>
            <td><button onclick="Delet(${i})"  class="text-white btn btn-danger btn-sm">Delet</button></td>
            <td><button onclick="updateing(${i})"  class="text-white btn btn-warning btn-sm">update</button></td>

        </tr>
`
    }
    document.getElementById("data").innerHTML = cartona

}


// clear all the inputes after adding the value to the document and to the localstorage
function clearInputs() {
    productName.value = ""
    productCategory.value = ""
    productPrice.value = ""
    productDescription.value = ""
}

// function that delet an item 
function Delet(index) {
    arr.splice(index, 1)
    loopForData()
    localStorage.setItem("products", JSON.stringify(arr))
}


//function to search for an item
function search() {
    let searchinput = document.getElementById("search").value;
    let box = ``
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].Name.includes(searchinput)) {
            box += `
            <tr>
            <td>${i + 1}</td>
            <td>${arr[i].Name.replace(searchinput, `<span id="name" class="text">${searchinput}<span/>`)}</td>
            <td>${arr[i].Category}</td>
            <td>${arr[i].Price}</td>
            <td>${arr[i].Description}</td>
            <td><button onclick="Delet(${i})"  class="text-white btn btn-danger btn-sm">Delet</button></td>
            <td><button class="text-white btn btn-success btn-sm">Update</button></td>
        </tr>
            `
        }

    }
    document.getElementById("data").innerHTML = box
}

// function that updates the vlaue of input

function updateing(index) {

    productName.value = arr[index].Name
    productCategory.value = arr[index].Category
    productPrice.value = arr[index].Price
    productDescription.value = arr[index].Description

    update.style.display = "block"
    addBtn.style.display = "none"

    localStorage.setItem("index", index)
}

function newpro() {

    var index = localStorage.getItem("index")

    arr[index].Name = productName.value
    arr[index].Category = productCategory.value
    arr[index].Price = productPrice.value
    arr[index].Description = productDescription.value

    localStorage.setItem("products", JSON.stringify(arr))

    loopForData()

    clearInputs()

    update.style.display = "none"
    addBtn.style.display = "block"
}