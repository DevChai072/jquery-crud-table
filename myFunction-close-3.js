
var dbMaster = {};

/**
 * function for prepare data fomat to object
 * dev Somchai O00085
 */
function prepareData() {
    if (dataTblRestaurant.length == 0) {
        notFoundDataInTable();
    }
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
    var findTypeId = $("#selectTypeFood").val(); // for focus tag select in option

    $.each(dbMaster.dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"' onclick='viewMenuToRows("+ index +")'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
        if (findTypeId == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
        } 
        if (findTypeId === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
        }
    });

    $("#selectTypeFood").change(function() {
        resetTable();
        // get value from element select
        var findTypeId = $(this).find(":selected").val();
        $.each(dbMaster.dataTblRestaurant, function(index, val) {
            var name = val.name;
            var restaurantType = val.restaurantType;
            var restaurantTypeName = val.restaurantTypeName;
            var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
            if (findTypeId == restaurantType) {
                $("#tableJquery tr:last").after(syntaxRows);
            } 
            if (findTypeId === "all") {
                $("#tableJquery tr:last").after(syntaxRows);
            }
        });
        notFoundDataInTable();
        setCss(); // set css for element in table
    });

    setCss(); // set css for element in table
}

/**
 * function create option for tag select
 * dev Somchai O0085
 */
function createSelect() {
    var selectModel = $("#selectTypeFood");
    var optionModel = selectModel.prop('options');
    optionModel[optionModel.length] = new Option("All", "all");

    var selectInputModel = $("#selectInputTypeFood");
    var selectInputModel = selectInputModel.prop('options');

    var selectModelViewMenu = $("#selectMenuType");
    var optionModelViewMenu = selectModelViewMenu.prop('options');
    optionModelViewMenu[optionModelViewMenu.length] = new Option("All", "all");

    var selectInputModelMenu = $("#selectInputMenuFood");
    var selectInputModelMenu = selectInputModelMenu.prop('options');
    
    $.each(dbMaster.dataLUTResType, function(index, value) {
        optionModel[optionModel.length] = new Option(value.name, value.id);
        selectInputModel[selectInputModel.length] = new Option(value.name, value.id);
    });

    $.each(dbMaster.dataLUTMenuType, function(index, value) {
        optionModelViewMenu[optionModelViewMenu.length] = new Option(value.name, value.id);
        selectInputModelMenu[selectInputModelMenu.length] = new Option(value.name, value.id);
    });
}

/**
 * function for event click to {save} and {edit}
 */
function saveData() {
    var attrButton;
    $("#btnSave").click(function() {
        attrButton = $(this).attr("data");
        if (attrButton === "save") {
            prepareDataInForm();
            var findIndex = addNewRestaurant();
            console.log(findIndex)
            $("#selectTypeFood option[value='"+ findIndex +"']").attr("selected", "selected");
        } else if (attrButton === "edit") {
            prepareDataInForm();
            var findIndex = editRestaurant();
            $("#selectTypeFood option[value='"+ findIndex +"']").attr("selected", "selected");
        }
    });

    $("#btnSaveMenu").click(function() {
        attrButton = $(this).attr("data");
        if (attrButton === "saveMenu") {
            console.log("saveMenu")
            prepareDataInFormMenu();
            var findIndex = addNewMenu();
        }
    });
}

/**
 * function for add new restaurant
 * dev Somchai O00085
 */
function addNewRestaurant() {
    var lastIndex = dbMaster.dataTblRestaurant.length; // check last indexOf in arr [dataTblRestaurant]
    var id = lastIndex + 1;
    dbMaster.dataTblRestaurant[lastIndex] = {
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
    var dataTblRestaurantForEdit = findIndexOfdbMaster(findIndex, dbMaster.dataTblRestaurant) 

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
    dbMaster.dataTblRestaurant[formData.findIdEdit] = {
        name : formData.txtInputFoodName,
        restaurantType : formData.selectInputTypeFood,
        restaurantTypeName : formData.selectInputTypeFoodText,
        detail : formData.txtInputDetail
    }
    var findIndex = fetchDataOnTable(); //fetch data in table
    return findIndex;
}

/**
 * function for delete data row in table
 * @param {*} findIndex
 */
function deleteToRows(findIndex) {
    delete dbMaster.dataTblRestaurant[findIndex];
    // fetch index in object array
    dbMaster.dataTblRestaurant = fetchIndexObject(dbMaster.dataTblRestaurant);
    var findTypeId = $("#selectTypeFood").val(); // for focus tag select in option
    resetTable();

    $.each(dbMaster.dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
        // $("#tableJquery tr:last").after(syntaxRows);
        if (findTypeId == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
        } 
        if (findTypeId === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
        }
    });
    notFoundDataInTable();
}

function fetchIndexObject(arr) {
    var newArr = [];
    var count = 0;
    for (var i in arr) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

/**
 * function for find data in array {dbMaster}
 * dev Somchai O00085
 * @param {*} findIndex 
 * @param {*} objectName 
 */
function findIndexOfdbMaster(findIndex, objectName) {
    // find data in array {dbMaster}
    return objectName[findIndex];
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
 * dev Somchai O00085
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

function prepareDataInFormMenu() {
    var findIdMenuEdit = $("#txtInputIdMenuHidden").val();
    var txtInputMenuName = $("#txtInputMenuName").val();
    var selectInputTypeMenu = $("#selectInputMenuFood").val();
    var selectInputTypeMenuText = $("#selectInputMenuFood").find("option:selected").text();
    var txtInputPrice = $("#txtInputPrice").val();
    return formData = {
        "findIdMenuEdit" : findIdMenuEdit,
        "txtInputMenuName" : txtInputMenuName,
        "selectInputTypeMenu" : selectInputTypeMenu,
        "selectInputTypeMenuText" : selectInputTypeMenuText,
        "txtInputPrice" : txtInputPrice
    }
}

function fetchDataOnTable() {
    resetTable(); // reset row data in table
    var findTypeId = $("#selectInputTypeFood").val(); // for focus tag select in option

    $.each(dbMaster.dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-'"+ index +" onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
        if (findTypeId == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
        } 
        if (findTypeId === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
        }
    });
    
    setCss(); // set css for element in table
    return findTypeId;
}

/**
 * function for set css
 * dev Somchai O00085
 */
function setCss() {
    $("button.btnAct").parent().css({"text-align": "center"});
    $("button.btnActVm").parent().css({"text-align": "center"});
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTable() {
    $("#tableJquery").find("tr:gt(0)").remove();
    $("#tableViewMenu").find("tr:gt(0)").remove();
}

/**
 * function for display word Not Found in table
 * dev Somchai O00085
 */
function notFoundDataInTable() {
    var rowCount = $("#tableJquery td").closest("tr").length;
    if (rowCount == 0) {
        var syntaxRows = "<tr><td colspan='5'>Not Found !</td></tr>";
        $("#tableJquery tr:last").after(syntaxRows);
        $("#tableJquery tr td:last").css({"text-align": "center"});
    }
}

/**
 * ===================================================================================
 * Form Hidden of view menu
 * ===================================================================================
 */