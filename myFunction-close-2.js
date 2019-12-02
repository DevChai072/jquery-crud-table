
var dbMaster = {};

/**
 * function for prepare data fomat to object
 * dev Somchai O00085
 */
function prepareData() {
    // import variable from {Practice3Data.js}
    dbMaster = {
        "dataTblRestaurant": dataTblRestaurant,
        "dataTblMenu": dataTblMenu,
        "dataLUTResType": dataLUTResType,
        "dataLUTMenuType": dataLUTMenuType
    }
    return dbMaster;
}

/**
 * function for display all data in table jquery
 * dev Somchai O00085
 * @param {*} dbMaster 
 */
function tableJquery(dbMaster) {
    createSelect(); // create element tag select {type food}
    var findIndex = $("#selectTypeFood").val(); // for focus tag select in option

    $.each(dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
        if (findIndex == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
        } 
        if (findIndex === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
        }
    });

    setCss(); // set css for element in table

    $("#selectTypeFood").change(function() {
        resetTable();
        // get value from element select
        var findIndex = $(this).find(":selected").val();
        
        $.each(dataTblRestaurant, function(index, val) {
            var name = val.name;
            var restaurantType = val.restaurantType;
            var restaurantTypeName = val.restaurantTypeName;
            var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
            if (findIndex == restaurantType) {
                $("#tableJquery tr:last").after(syntaxRows);
            } 
            if (findIndex === "all") {
                $("#tableJquery tr:last").after(syntaxRows);
            }
        });
        setCss(); // set css for element in table
    });
}

/**
 * function create option for tag select
 * dev Somchai O0085
 */
function createSelect() {
    var selectModel = $("#selectTypeFood");
    var selectInputModel = $("#selectInputTypeFood");
    var optionModel = selectModel.prop('options');
    var selectInputModel = selectInputModel.prop('options');
    optionModel[optionModel.length] = new Option("All", "all");
  
    $.each(this.dataLUTResType, function(index, value) {
        optionModel[optionModel.length] = new Option(value.name, value.id);
        selectInputModel[selectInputModel.length] = new Option(value.name, value.id);
    });
}

/**
 * function for event click to {save} and {edit}
 */
function saveData() {
    $("#btnSave").click(function() {
        if ($(this).attr("data") === "save") {
            prepareDataInForm();
            var findIndex = addNewRestaurant();
            $("#selectTypeFood option[value='"+ findIndex +"']").attr("selected", "selected");
        } else if ($(this).attr("data") === "edit") {
            prepareDataInForm();
            var findIndex = editRestaurant();
            $("#selectTypeFood option[value='"+ findIndex +"']").attr("selected", "selected");
        }
    });
}

/**
 * function for add new restaurant
 * dev Somchai O00085
 */
function addNewRestaurant() {
    var lastIndex = dataTblRestaurant.length; // check last indexOf in arr [dataTblRestaurant]
    var id = lastIndex + 1;
    dataTblRestaurant[lastIndex] = {
        id : id,
        name : formData.txtInputFoodName,
        restaurantType : formData.selectInputTypeFood,
        restaurantTypeName : formData.selectInputTypeFoodText,
        detail : formData.txtInputDetail
    }
    var findIndex = fetchDataOnTable(); //fetch data in table
    return findIndex;
}

/**
 * function for edit data row in table
 * dev Somchai O00085
 * @param {*} findIndex 
 */
function editToRows(findIndex) {
    $("#btnSave").attr("data", "edit"); // set attribute data = {edit} in button save

    // search data in array {dataTblRestaurant}
    var dataTblRestaurantForEdit = findIndexOfDataTblRestaurant(findIndex); 

    // put data to form input
    $("#txtInputIdHidden").val(findIndex);
    $("#txtInputFoodName").val(dataTblRestaurantForEdit.name);
    $("#selectInputTypeFood").val(dataTblRestaurantForEdit.restaurantType);
    $("#txtInputDetail").val(dataTblRestaurantForEdit.detail);
}

/**
 * function for put data to array {dataTblRestaurant}
 * dev Somchai O00085
 */
function editRestaurant() {
    // search data in array {dataTblRestaurant}
    dataTblRestaurant[formData.findIdEdit] = {
        name : formData.txtInputFoodName,
        restaurantType : formData.selectInputTypeFood,
        restaurantTypeName : formData.selectInputTypeFoodText,
        detail : formData.txtInputDetail
    }
    var findIndex = fetchDataOnTable(); //fetch data in table
    return findIndex;
}

function deleteToRows(findIndexF) {
    delete dataTblRestaurant[findIndexF];
    dataTblRestaurant = startFromZero(dataTblRestaurant);

    resetTable();
    $.each(dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
        $("#tableJquery tr:last").after(syntaxRows);
    });
}

function startFromZero(arr) {
    var newArr = [];
    var count = 0;
    for (var i in arr) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

/**
 * function for find data in array {dataTblRestaurant}
 * dev Somchai O00085
 * @param {*} findIndex 
 */
function findIndexOfDataTblRestaurant(findIndex) {
    // find data in array {dataTblRestaurant}
    return dataTblRestaurant[findIndex];
}

/**
 * function for reset form before add neww restaurant
 */
function btnAddNewRestaurant() {
    $("#btnAddNewRestaurant").click(function() {
        $("#txtInputFoodName").val("");
        $("#selectInputTypeFood").prop("selectedIndex", 0);
        $("#txtInputDetail").val("");
    });
}

/**
 * function for preparing data in pre-action format
 */
function prepareDataInForm() {
    var findIdEdit = $("#txtInputIdHidden").val();
    var txtInputFoodName = $("#txtInputFoodName").val();
    var selectInputTypeFood = $("#selectInputTypeFood").val();
    var selectInputTypeFoodText = $("#selectInputTypeFood").find("option:selected").text();
    var txtInputDetail = $("#txtInputDetail").val();
    return formData = {
        "findIdEdit" : findIdEdit,
        "txtInputFoodName" : txtInputFoodName,
        "selectInputTypeFood" : selectInputTypeFood,
        "selectInputTypeFoodText" : selectInputTypeFoodText,
        "txtInputDetail" : txtInputDetail
    }
}

function fetchDataOnTable() {
    resetTable(); // reset row data in table
    var findIndex = $("#selectInputTypeFood").val(); // for focus tag select in option
    $.each(dbMaster.dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-'"+ index +" onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
        if (findIndex == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
        } 
        if (findIndex === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
        }
    });
    setCss(); // set css for element in table
    return findIndex;
}

/**
 * function for set css
 * dev Somchai O00085
 */
function setCss() {
    $("button.btnAct").parent().css({"text-align": "center"});
}

function resetTable() {
    $("#tableJquery").find("tr:gt(0)").remove();
}