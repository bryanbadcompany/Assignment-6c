function SectionSelect()
{
    if (document.getElementById("menu").value == "Add New Customer")
    {
        document.getElementById("section_2").style.visibility = "hidden";
        document.getElementById("section_1").style.visibility = "visible";
        document.getElementById("section_3").style.visibility = "hidden";
    }
    if (document.getElementById("menu").value == "Change Ship-To Address")
    {
        document.getElementById("section_1").style.visibility = "hidden";
        document.getElementById("section_2").style.visibility = "visible";
        document.getElementById("section_3").style.visibility = "hidden";
    }
    if (document.getElementById("menu").value == "Delete Existing Customer")
    {
        document.getElementById("section_1").style.visibility = "hidden";
        document.getElementById("section_2").style.visibility = "hidden";
        document.getElementById("section_3").style.visibility = "visible";
    }
}





function AddCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var customer_id = document.getElementById("customer_id_entry").value;
    var customer_name = document.getElementById("customer_name_entry").value;
    var customer_city = document.getElementById("customer_city_entry").value;
    
    var new_customer = '{"CustomerID": "'+customer_id+'", "CompanyName": "'+customer_name+'", "City": "'+customer_city+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //AJAX request
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(new_customer);
    
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("section_1_result").innerHTML = "successful input";
    }
    else
    {
        document.getElementById("section_1_result").innerHTML = "output unsuccessful" + "<br>" + output.Exception;
    }
}



// Section 2: Changing the Shipping Address


function ChangeAddress()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var order_number = document.getElementById("order_number_entry").value;
    var ship_name = document.getElementById("ship_name_entry").value;
    var order_address = document.getElementById("order_address").value;
    var order_city = document.getElementById("order_city").value;
    var order_postal_code = document.getElementById("order_postal_code").value;
    
    var new_order = '{"OrderID": "'+order_number+'", "ShipName": "'+ship_name+'", "ShipAddress": "'+order_address+'", "ShipCity": "'+order_city+'", "ShipPostcode": "'+order_postal_code+'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OrderOperationResult(result);
        }
    }
    
    //AJAX request
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(new_order);
}

function OrderOperationResult(output)
{
    if (output == 1)
    {
        document.getElementById("section_2_result").innerHTML = "successful input";
    }
    if (output == 0)
    {
        document.getElementById("section_2_result").innerHTML = "output failed: unspecified error"
    }
    if (output == -2)
    {
        document.getElementById("section_2_result").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object"
    }
    if (output == -3)
    {
        document.getElementById("section_2_result").innerHTML = "Operation failed because a record with the supplied Order ID could not be found"
    }
}




function DeleteCustomer()
{
       
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    
    customerID = document.getElementById("customer_id_delete").value;
    
    url+= customerID;
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            DeleteCustomerID(output);
        }
    }
    objRequest.open("GET", url, true);
    objRequest.send();
    
}
function DeleteCustomerID(output)
{
    output = output.DeleteCustomerResult.WasSuccessful;
    
    if (output == 1)
    {
        document.getElementById("section_3_result").innerHTML = "Customer Deleted";
    }
    else
    {
        document.getElementById("section_3_result").innerHTML = "output unsuccessful" + "<br>" + output.Exception;
    }
}