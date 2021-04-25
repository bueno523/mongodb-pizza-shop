function loadItems(){
    // fetching items
    fetch('/items')
    .then(res => res.json())
    .then(data => {
        loadTable(data);
    })
    // fetching orders
    fetch('/orders')
    .then(res => res.json())
    .then(data => {
        loadOrders(data);
    })
}

function loadTable(data){
    let table;
    let tableSize = document.getElementById('tableSize');
    let tableBase = document.getElementById('tableBase');
    let tableToppings = document.getElementById('tableToppings');

    data.forEach(item => {
        if (item.type == 'size') table = tableSize;
        if (item.type == 'base') table = tableBase;
        if (item.type == 'topping') table = tableToppings;
        if(item != null) populateRow(table, item);
    });

    addEmptyRow(tableSize);
    addEmptyRow(tableBase);
    addEmptyRow(tableToppings);
    
}

function loadOrders(pizzas){
    pizzas.forEach(pizza => {
        let table = document.getElementById('tableOrders');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        let addBtn = document.createElement('button');
        addBtn.classList.add('btn', 'btn-success', 'table-btn');
        addBtn.innerText = "SEND"
        addBtn.addEventListener('click', (event)=>{
            sendPizza(event);
        })
        row.insertCell(0).innerHTML = pizza._id;
        row.insertCell(1).innerHTML = pizza.size;
        row.insertCell(2).innerHTML = pizza.base;
        row.insertCell(3).innerHTML = pizza.toppings;
        row.insertCell(4).innerHTML = pizza.price;
        row.insertCell(5).innerHTML = pizza.address;
        row.insertCell(6).appendChild(addBtn);
    });

    
}

function populateRow(table, item, empty){
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    let nameElem = document.createElement('input');
    let priceElem = document.createElement('input');
    let updateElem = document.createElement('button');
    let deleteElem = document.createElement('button');

    nameElem.type = "text";
    nameElem.value = item.name;
    priceElem.type = "number";
    priceElem.value = item.price;
    updateElem.innerText = empty ? 'ADD' : 'UPDATE';
    deleteElem.innerText = 'DELETE'

    updateElem.classList.add('btn', 'btn-success', 'table-btn');
    deleteElem.classList.add('btn', 'btn-danger', 'table-btn');

    updateElem.addEventListener('click', (event)=> {
        if ( empty ) {
            addRow(event);
        } else {
            updateRow(event);
        }

    })
    deleteElem.addEventListener('click', (event)=> {
            deleteRow(event);
    })

    row.insertCell(0).innerHTML = item._id;
    row.insertCell(1).appendChild(nameElem);
    row.insertCell(2).appendChild(priceElem);
    row.insertCell(3).appendChild(updateElem);
    if (!empty) row.insertCell(4).appendChild(deleteElem);

}

function updateRow(event){
    // section name
    let id = getRowId(event)
    let type = getTableSection(event).toLowerCase();
    let price = getRowPrice(event);
    let name = getRowName(event);
    // send post request to /orders

    fetch('/items', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            price, name, type, id
        })
    }).then(res => res.json()).then(data => {
        alert(data.message);
        if (data.status == 200) {
            location.reload();
        }
    })
}

function deleteRow(event){
    let id = getRowId(event);
    let section = getTableSection(event);
    fetch('/items', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => res.json()).then(data => {
        alert(data.message);
        if (data.status == 200) {
            location.reload();
        }
    })
}

function addRow(event){
    // validating inputs

    let row = getRowElem(event);
    let name = row.children[1].firstChild.value;
    let price = Number(row.children[2].firstChild.value);
    let type =  getTableSection(event).toLowerCase();

    if ( name.trim() == '' ) return;

    let jsonElem = {
        name,
        price,
        type
    }

    // send post request to /items

    fetch('/items', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(jsonElem)
    }).then(res => res.json()).then(data => {
        console.log(data.message);
        if (data.status == 200) {
            location.reload();
        }
    })

}

function sendPizza(event){
    let id = getRowId(event);

    fetch('/orders', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => res.json()).then(data => {
        alert(data.message);
        if (data.status == 200) {
            location.reload();
        }
    })
}


function getRowElem(event) {
    return event.target.parentNode.parentNode;
}

function getRowId(event) {
    return event.target.parentNode.parentNode.firstChild.innerText;
}
function getTableSection(event) {
    return event.target.parentNode.parentNode.parentNode.children[0].children[1].innerText;
}

function getRowPrice(event) {
    return event.target.parentNode.parentNode.children[2].firstChild.value;
}

function getRowName(event) {
    return event.target.parentNode.parentNode.children[1].firstChild.value;
}

function addEmptyRow(table) {
    let emptyElem = {
        _id: '',
        name: '',
        price: 0,
    }
    populateRow(table, emptyElem, '1')
}

loadItems();