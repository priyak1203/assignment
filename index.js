console.log("Script Loaded!!!");

var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';



// Selecting tbody Element 
var tableBody = document.getElementsByTagName('tbody');
// console.log("Tbody is ", tableBody)
// tableBody[0].innerHTML = " ";       // ignore the hardcoded html



var infoContent = document.getElementById('info-content');
console.log("Info content is ", infoContent);

var infoWrapper = document.getElementById('info-wrapper');
console.log("Info Wrapper is ", infoWrapper);

var firstName = document.createElement('h1');
firstName.style.color ="Green";
infoWrapper.appendChild(firstName); 

var tableRows = document.getElementsByClassName('data-row');
// console.log("Table Rows", tableRows)

var infoDivs = $('#info-content > div');
// console.log('Info Divs are ', infoDivs); 

// Function to create details section 
// Sturcture of the details section 
{/* <div id="info-content">
                <div><b>User selected:</b> Marcellin Shrestha</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia nihil. Est, illum minima libero rerum, nihil distinctio placeat sint nam quae repellendus obcaecati delectus totam non odio. Sint, reprehenderit?
                    </textarea>
                </div>
                <div><b>Address:</b> 6480 Nec Ct</div>
                <div><b>City:</b> Dinwiddie</div>
                <div><b>State:</b> NV</div>
                <div><b>Zip:</b> 91295</div>
</div> */}

function createDetailsSection(userObj) {
    let {address} = userObj;
    // console.log("User Address is ", address);
    infoContent.style.display ="block";
    // var user = document.createTextNode = userObj.firstName;
    // infoDivs[0].innerHTML = "<b>User selected:</b> " + userObj.firstName + " " + userObj.lastName;
    // infoDivs[2].innerHTML = "<b>Address:</b> " + address.streetAddress;
    // infoDivs[3].innerHTML = "<b>City:</b> " + address.city;
    // infoDivs[4].innerHTML = "<b>State:</b> " + address.state;
    // infoDivs[5].innerHTML = "<b>Zip:</b> " + address.zip;
    infoDivs[0].innerHTML = `<b>User selected:</b> ${userObj.firstName}  ${userObj.lastName}`;
    infoDivs[2].innerHTML = `<b>Address:</b> ${address.streetAddress}`;
    infoDivs[3].innerHTML = `<b>City:</b> ${address.city}`;
    infoDivs[4].innerHTML = `<b>State:</b>  ${address.state}`             
    infoDivs[5].innerHTML = `<b>Zip:</b> ${address.zip}`;     
    
    
}

// =============== Function to create table row using data from the api  ================ 
// Structure of the row 
{/* <tr class="data-row">
<td class="column1">28</td>
<td class="column2">Larisa</td>
<td class="column3">Llaneza</td>
<td class="column4">SCallison@non.org</td>
<td class="column5">(763)248-9034</td>
</tr> */}

function createTableRow(dataArray, Obj) {
    var tableRow = document.createElement('tr');
    tableRow.classList.add('data-row'); 
    
    for(var i=1; i<6; i++) {
        var col = document.createElement('td');
        col.classList.add("column" +(i));
        col.innerHTML = dataArray[i-1];
        tableRow.appendChild(col);
    }

    tableRow.onclick = function() {
        // firstName.innerHTML = dataArray[1];
        $('.data-row').removeClass('active');
        tableRow.classList.add('active'); 
        createDetailsSection(Obj) ;
    }

    // console.log(tableRow);
    tableBody[0].appendChild(tableRow);
}


var http = new XMLHttpRequest();
http.open("GET", url, true );
http.onreadystatechange = function() {
    if(this.readyState === 4) {
        tableBody[0].innerHTML = " ";
        var dataList = JSON.parse(this.responseText);
        let [...globalList] = dataList;
        console.log('Global List inside http', globalList)
        console.log(dataList); 
        // console.log(dataList[0].address);
        for(var i=0; i<dataList.length; i++) {
            let {id, firstName, lastName, email, phone} = dataList[i]; // Selecting the required data 
            // console.log(id, firstName, lastName, email,phone);
            let dataArray = [];
            dataArray.push(id,firstName,lastName,email,phone);
            // console.log(dataArray);
            createTableRow(dataArray, dataList[i]); 
            searchFunction(globalList);
           
        } 
    }
}
http.send();

// ==============================================================
// $('.data-row').click(function(){
//     $('.data-row').removeClass('active');
//     $(this).addClass('active');
//      $(this).$('.column2').innerHTML = "First" ;
// });

// ===============================================================




// Implementing search features 

// Selecting the form element to prevent the default behaviour
var formElement = document.getElementsByTagName('form');
console.log("Form Element", formElement);

formElement[0].onsubmit = function(eObj) {
    eObj.preventDefault();
}

function shortlist(gObj, value) {
    // console.log("Shortlist global", gObj); 
    // console.log('Shortlist value', value); 
    // console.log(value.toString())
    var searchResult = []; 
    for(var i=0; i<gObj.length; i++) {
        let {firstName} = gObj[i];
        // console.log(firstName);
        let result = firstName.toLowerCase().search(value.toLowerCase());
        // console.log(result);
        // if (firstName.search(/value/i))
        if (result !== -1) {
            searchResult.push(gObj[i]);
        }
    }

    if (searchResult.length > 0) {
        tableBody[0].innerHTML = " ";
        for(var i=0; i<searchResult.length; i++) {
            let {id, firstName, lastName, email, phone} = searchResult[i]; 
            let dataArray = [];
            dataArray.push(id,firstName,lastName,email,phone);
            createTableRow(dataArray, searchResult[i]); 
        }
    }
    // console.log("Search Array", searchResult);
}

function searchFunction(gObj) {
    // Selecting the form input element 
    var searchBox =  document.getElementById('search-box');
    // console.log("Search Box ", searchBox);

    searchBox.oninput = function() {
            if(searchBox.value.length > 0) {
                var value = searchBox.value;
                // console.log(value);
                shortlist(gObj, value);
            } else {
                tableBody[0].innerHTML = " ";
                for(var i=0; i<gObj.length; i++) {
                    let {id, firstName, lastName, email, phone} = gObj[i]; 
                    let dataArray = [];
                    dataArray.push(id,firstName,lastName,email,phone);
                    createTableRow(dataArray, gObj[i]); 
                }
            }

        
        // var value = searchBox.value;
        // console.log(value); 
        // shortlist(gObj, value); 
    }

}



