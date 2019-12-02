
var dbMaster = {};

/**
 * function for prepare data fomat to object
 * dev Somchai O00085
 */
function prepareData() {

    // // import variable from {Practice3Data.js}
    dbMaster = {
        "dataTblRestaurant": dataTblRestaurant,
        "dataTblMenu": dataTblMenu,
        "dataLUTResType": dataLUTResType,
        "dataLUTMenuType": dataLUTMenuType
    }

    return dbMaster;
}

/**
 * function for get choice put to element select
 * dev Somchai O00085
 * @param {*} arrDataLUTResType 
 */
function getSelectTypeFoodName(arrDataLUTResType) {

    // get element select type food
    var selectTypeFood = $("#selectTypeFood");
    var options = selectTypeFood.prop('options');
    options[options.length] = new Option("All", "all");

    // get element select type food
    var selectTypeFoodForm = $("#selectInputTypeFood");
    var optionsForm = selectTypeFoodForm.prop('options');

    $.each(arrDataLUTResType, function(index, value) {
        options[options.length] = new Option(value.name, value.id);
        optionsForm[optionsForm.length] = new Option(value.name, value.id);
    });
}

/**
 * function for select type food
 * dev Somchai O00085
 * @param {*} arrDataTblRestaurant 
 */
function fetchAllDataToTable(arrDataTblRestaurant) {
    
    // show all data in table
    $.each(arrDataTblRestaurant, function(index, val) {
        var name = val.name;
        var type = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + type + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-'"+ index +" onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
        $("#tableJquery tr:last").after(syntaxRows);
    });

    $("button.btnAct").parent().css({"text-align": "center"});

    // event select type food
    $("#selectTypeFood").change(function() {
        // remove all row data in table
        $("#tableJquery").find("tr:gt(0)").remove();

        // get value from element select
        var findIndex = $(this).find(":selected").val();

        $.each(arrDataTblRestaurant, function(index, val) {

            // when select value all type
            if (findIndex === "all") {
                var name = val.name;
                var type = val.restaurantTypeName;
                var syntaxRows = "<tr><td>" + name + "</td><td>" + type + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-'"+ index +">Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
                $("#tableJquery tr:last").after(syntaxRows);
            }
            // when select value type only
            if (findIndex == val.restaurantType) {
                var name = val.name;
                var type = val.restaurantTypeName;
                var syntaxRows = "<tr><td>" + name + "</td><td>" + type + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-'"+ index +">Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
                $("#tableJquery tr:last").after(syntaxRows);
            }

            $("button.btnAct").parent().css({"text-align": "center"});

        });
    });
}

/**
 * function for clear form input
 * dev Somchai O00085
 */
function eventAddNewRestaurant() {
    $("#txtInputFoodName").val("");
    $("#selectInputTypeFood").prop("selectedIndex", 0);
    $("#txtInputDetail").val("");
}

/**
 * function for prepare before action next step
 * @param {*} arrDataTblRestaurant 
 */
function prepareAction(arrDataTblRestaurant) {
    // get data form input
    var txtInputFoodName = $("#txtInputFoodName").val();
    var selectInputTypeFood = $("#selectInputTypeFood").val();
    var selectInputTypeFoodText = $("#selectInputTypeFood").find(":selected").text();
    var txtInputDetail = $("#txtInputDetail").val();

    // get attribute data from button save
    var dataAction = $("#btnSave").attr("data");

    // check attribute from button save
    if (dataAction === "save") {
        var index = arrDataTblRestaurant.length;
        var id = index + 1;

        arrDataTblRestaurant[index] = {
            id : id,
            name : txtInputFoodName,
            restaurantType : selectInputTypeFood,
            restaurantTypeName : selectInputTypeFoodText,
            detail : txtInputDetail
        }
        
        saveToTable(arrDataTblRestaurant, index);
    }

    if (dataAction === "edit") {
        // console.log("edit foo")
        var index = $("#txtInputIdHidden").val();
        arrDataTblRestaurant[index] = {
            name : txtInputFoodName,
            restaurantType : selectInputTypeFood,
            restaurantTypeName : selectInputTypeFoodText,
            detail : txtInputDetail
        }
        editToTable(arrDataTblRestaurant, index);
    }
}

/**
 * function for save data to json
 * dev Somchai O00085
 * @param {*} arrDataTblRestaurant 
 */
function saveToTable(arrDataTblRestaurant, index) {

    // show all data in table
    var name = arrDataTblRestaurant[index].name;
    var type = arrDataTblRestaurant[index].restaurantTypeName;
    var syntaxRows = "<tr><td>" + name + "</td><td>" + type + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
    $("#tableJquery tr:last").after(syntaxRows);
    $("button.btnAct").parent().css({"text-align": "center"});
}

function editToTable(arrDataTblRestaurant, index) {
    // show all data in table
    var name = arrDataTblRestaurant[index].name;
    var type = arrDataTblRestaurant[index].restaurantTypeName;
    var syntaxRows = "<tr><td>" + name + "</td><td>" + type + "</td><td><button class='btnAct' id='btnVm-"+ index +"'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-'"+ index +">Delete</button></td></tr>";
    $("tableJquery tr:eq(index)").after(syntaxRows);
    $("button.btnAct").parent().css({"text-align": "center"});
}

function editToRows(index) {
    // get data in dataTblRestaurant
    var dataTblRestaurant = $(this)[0].dataTblRestaurant;
    // put attribute data to button save
    $("#btnSave").attr("data", "edit");

    // put value to input form
    $("#txtInputIdHidden").val(index);
    $("#txtInputFoodName").val(dataTblRestaurant[index].name);
    $("#selectInputTypeFood").val(dataTblRestaurant[index].restaurantType);
    $("#txtInputDetail").val(dataTblRestaurant[index].detail);
}