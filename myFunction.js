
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
    // create element tag select {type food}
    createSelect(); 

    // for focus tag select in option
    var findTypeId = $("#selectTypeFood").val(); 

    // display all data on table
    eachDataTblRestaurantToTable(dbMaster.dataTblRestaurant, findTypeId);

    $("#selectTypeFood").change(function() {
        // reset all data on table
        resetTableJquery();

        // get value from element select
        var findTypeId = $(this).find(":selected").val();

        // display all data on table
        eachDataTblRestaurantToTable(dbMaster.dataTblRestaurant, findTypeId);
    });
}

/**
 * function for each data to table {tableJquery}
 * dev Somchai O00085
 * @param {*} dataTblRestaurant 
 * @param {*} findTypeId 
 */
function eachDataTblRestaurantToTable(dataTblRestaurant, findTypeId) {
    $.each(dataTblRestaurant, function(index, val) {
        var name = val.name;
        var restaurantType = val.restaurantType;
        var restaurantTypeName = val.restaurantTypeName;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + restaurantTypeName + "</td><td><button class='btnAct' id='btnVm-"+ index +"' onclick='viewMenuToRows("+ index +")'>View Menu</button></td><td><button class='btnAct' id='btnEdit-"+ index +"' onclick='editToRows("+ index +")'>Edit</button></td><td><button class='btnAct' id='btnDel-"+ index +"' onclick='deleteToRows("+ index +")'>Delete</button></td></tr>";
        if (findTypeId == restaurantType) {
            $("#tableJquery tr:last").after(syntaxRows);
            // set css for element in table
            setCss();
        } 
        if (findTypeId === "all") {
            $("#tableJquery tr:last").after(syntaxRows);
            // set css for element in table
            setCss();
        }
    });

    // display not found data on table
    notFoundDataInTable();
}

/**
 * function create option for tag select
 * dev Somchai O0085
 */
function createSelect() {
    // tag {selectTypeFood}
    var selectModel = $("#selectTypeFood");
    var optionModel = selectModel.prop('options');
    optionModel[optionModel.length] = new Option("All", "all");

    // tag {selectInputTypeFood}
    var selectInputModel = $("#selectInputTypeFood");
    var selectInputModel = selectInputModel.prop('options');

    // tag {selectMenuType}
    var selectModelViewMenu = $("#selectMenuType");
    var optionModelViewMenu = selectModelViewMenu.prop('options');
    optionModelViewMenu[optionModelViewMenu.length] = new Option("All", "all");

    // tag {selectInputMenuFood}
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
 * dev Somchai O00085
 */
function saveData() {
    var attrButton;
    $("#btnSave").click(function() {
        // get data from attr button save
        attrButton = $(this).attr("data");

        // for focus tag select in option
        var findTypeId = $("#selectInputTypeFood").val(); 

        // check data attribute is save or edit
        if (attrButton === "save") {
            var confirmAlert = confirm("ต้องการบันทึกข้อมูลหรือไม่");
            if (confirmAlert == true) {
                // get data from prepare {formData}
                prepareDataInForm();

                // add value to dbMaster{dataTblRestaurant}
                addNewRestaurant();

                // reset row data in table
                resetTableJquery(); 

                // display data on table
                eachDataTblRestaurantToTable(dbMaster.dataTblRestaurant, findTypeId);

                // selected option in tag select {#selectTypeFood}
                $("#selectTypeFood option[value='"+ findTypeId +"']").attr("selected", "selected");
                
                alert("บันทึกข้อมูลเรียบร้อย");
            }
        } 
        else if (attrButton === "edit") {
            // get data from prepare {formData}
            prepareDataInForm();

            // edit value to dbMaster{dataTblRestaurant}
            editRestaurant();

            // reset row data in table
            resetTableJquery(); 

            // display data on table
            eachDataTblRestaurantToTable(dbMaster.dataTblRestaurant, findTypeId);

            // selected option in tag select {#selectTypeFood}
            $("#selectTypeFood option[value='"+ findTypeId +"']").attr("selected", "selected");

            // clear value in form text input
            deepClear();
        }
    });

    $("#btnSaveMenu").click(function() {
        // get data from attr button save
        attrButton = $(this).attr("data");

        // for focus tag select in option
        var findTypeMenuId = $("#selectInputMenuFood").val(); 
        
        // check data attribute is save or edit
        if (attrButton === "saveMenu") {
            var confirmAlert = confirm("ต้องการบันทึกข้อมูลหรือไม่");
            if (confirmAlert == true) {
                // get data from prepare {formDataMenu}
                prepareDataInFormMenu();

                // add value to dbMaster{dataTblMenu}
                addNewMenu();

                // reset row data in table
                resetTableViewMenu(); 

                // display data on table
                eachDataTblMenuToTable(dbMaster.dataTblMenu, findTypeMenuId);

                // selected option in tag select {#selectMenuType}
                $("#selectMenuType option[value='"+ findTypeMenuId +"']").attr("selected", "selected");

                alert("บันทึกข้อมูลเรียบร้อย");
            }
        }
        else if (attrButton === "editMenu") {

            // get data from prepare {formDataMenu}
            prepareDataInFormMenu();

            // edit value to dbMaster{dataTblMenu}
            editMenu();

            // reset row data in table
            resetTableViewMenu();

            // display data on table
            eachDataTblMenuToTable(dbMaster.dataTblMenu, findTypeMenuId);

            // selected option in tag select {#selectMenuType}
            $("#selectMenuType option[value='"+ findTypeMenuId +"']").attr("selected", "selected");

            // clear value in form text input
            deepClear();
        }
    });
}

/**
 * function for add new restaurant
 * dev Somchai O00085
 * @param {*} findIndex
 */
function addNewRestaurant(findIndex) {
    var lastIndex = dbMaster.dataTblRestaurant.length; // check last indexOf in arr [dataTblRestaurant]
    var id = lastIndex + 1;
    dbMaster.dataTblRestaurant[lastIndex] = {
        id : id,
        name : formData.txtInputFoodName,
        restaurantType : formData.selectInputTypeFood,
        restaurantTypeName : formData.selectInputTypeFoodText,
        detail : formData.txtInputDetail
    }
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
}

/**
 * function for delete data row in table
 * @param {*} findIndex
 */
function deleteToRows(findIndex) { // foobar
    var confirmAlert = confirm("ต้องการลบข้อมูลหรือไม่");
    if (confirmAlert == true) {
        // remove data from dbMaster {dataTblRestaurant}
        delete dbMaster.dataTblRestaurant[findIndex];

        // fetch index in object array
        dbMaster.dataTblRestaurant = fetchIndexObject(dbMaster.dataTblRestaurant);

        // for focus tag select in option
        var findTypeId = $("#selectTypeFood").val(); 

        // reset all data on table
        resetTableJquery();

        // display data on table
        eachDataTblRestaurantToTable(dbMaster.dataTblRestaurant, findTypeId);

        // clear value in form text input
        deepClear();

        alert("ลบข้อมูลเรียบร้อย");
    }
}

/**
 * function for fetch index in Object all new
 * dev Somchai O00085
 * @param {*} arr 
 */
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
 * function for preparing data in pre-action format {prepareDataInForm}
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

/**
 * function for preparing data in pre-action format {prepareDataInFormMenu}
 * dev Somchai O00085
 */
function prepareDataInFormMenu() {
    var findIdMenuEdit = $("#txtInputMenuIdHidden").val();
    var txtInputMenuName = $("#txtInputMenuName").val();
    var selectInputTypeMenu = $("#selectInputMenuFood").val();
    var selectInputTypeMenuText = $("#selectInputMenuFood").find("option:selected").text();
    var txtInputPrice = $("#txtInputPrice").val();
    return formDataMenu = {
        "findIdMenuEdit" : findIdMenuEdit,
        "txtInputMenuName" : txtInputMenuName,
        "selectInputTypeMenu" : selectInputTypeMenu,
        "selectInputTypeMenuText" : selectInputTypeMenuText,
        "txtInputPrice" : txtInputPrice
    }
}

/**
 * function for set css
 * dev Somchai O00085
 */
function setCss() {
    $("button.btnAct").parent().css({"text-align": "center"});
    $("table#tableJquery tr:nth-child(2n+0)").css({"background-color": "#ddd"});
    $("table#tableViewMenu tr:nth-child(2n+0)").css({"background-color": "#ddd"});
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTableJquery() {
    $("#tableJquery").find("tr:gt(0)").remove();
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTableViewMenu() {
    $("#tableViewMenu").find("tr:gt(0)").remove();
}

/**
 * function for reset form before add neww restaurant
 * dev Somchai O00085
 */
function btnAddNewForm() {
    $("#btnAddNewRestaurant").click(function() {
        $("#txtInputFoodName").val("");
        $("#txtInputFoodName").focus();
        $("#selectInputTypeFood").prop("selectedIndex", 0);
        $("#txtInputDetail").val("");
    });

    $("#btnAddNewMenu").click(function() {
        $("#txtInputMenuName").val("");
        $("#txtInputMenuName").focus();
        $("#selectInputMenuFood").prop("selectedIndex", 0);
        $("#txtInputPrice").val("");
    });
}

/**
 * function for clear value in form text input
 * dev Somchai O00085
 */
function deepClear() {
    $("#txtInputFoodName").val("");
    $("#selectInputTypeFood").prop("selectedIndex", 0);
    $("#txtInputDetail").val("");

    $("#txtInputMenuName").val("");
    $("#selectInputMenuFood").prop("selectedIndex", 0);
    $("#txtInputPrice").val("");
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

function viewMenuToRows(findIndex) {
    resetTableViewMenu();

    // find data in daMaster {dataTblRestaurant}
    var arrDataTblRestaurant = findIndexOfdbMaster(findIndex, dbMaster.dataTblRestaurant);

    // set style tag <hr>
    $(".hrDotted").css({"border-top": "5px dotted black"});

    // display form view menu
    $(".formViewMenu").show();
    $(".formViewMenu").css({"padding-top": "5px"});

    // put text to tag title name menu <h3>
    $("h3#titleNameRestaurant").text(arrDataTblRestaurant.name);

    // set style table view menu
    $("table#tableViewMenu").css({
        "display": "table",
        "border-collapse": "collapse",
        "border-spacing": "0",
        "width": "100%"
    });
    $("table#tableViewMenu tr th td").css({"border": "1px solid rgb(190, 190, 190)"});
    $("table#tableViewMenu th").css({
        "background-color": "#11167a",
        "color": "#ffffff",
        "padding": "15px"
    });

    // put dbMaster to function
    tableViewMenu(dbMaster);
}

/**
 * function for display all data in table view menu
 * dev Somchai O00085
 * @param {*} dbMaster 
 */
function tableViewMenu(dbMaster) {
    // for focus tag select in option
    var findTypeMenuId = $("#selectMenuType").val();

    // display all data on table
    eachDataTblMenuToTable(dbMaster.dataTblMenu, findTypeMenuId);

    $("#selectMenuType").change(function() {
        // reset all data on table
        resetTableViewMenu();

        // get value from element select
        var findTypeMenuId = $(this).find(":selected").val();

        // display all data on table
        eachDataTblMenuToTable(dbMaster.dataTblMenu, findTypeMenuId);
    });
}

/**
 * function for each data to table {tableViewMenu}
 * dev Somchai O00085
 * @param {*} dataTblMenu 
 * @param {*} findTypeMenuId 
 */
function eachDataTblMenuToTable(dataTblMenu, findTypeMenuId) {
    $.each(dataTblMenu, function(index, val) {
        var name = val.name;
        var categoryId = val.categoryId;
        var categoryName = val.categoryName;
        var menuPrice = val.price;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + categoryName + "</td><td>" + menuPrice + "</td><td><button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ index +")'>Edit</button></td><td><button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ index +")'>Delete</button></td></tr>";
        if (findTypeMenuId == categoryId) {
            $("#tableViewMenu tr:last").after(syntaxRows);
            // set css for element in table
            setCss();
        } 
        if (findTypeMenuId === "all") {
            $("#tableViewMenu tr:last").after(syntaxRows);
            // set css for element in table
            setCss();
        }
    });
    notFoundDataInTableMenu();
}

/**
 * function for edit data row in table
 * dev Somchai O00085
 * @param {*} findIndex 
 */
function editVmToRows(findIndex) {
    $("#btnSaveMenu").attr("data", "editMenu"); // set attribute data = {edit} in button save

    // search data in array {dataTblMenu}
    var dataTblMenuForEdit = findIndexOfdbMaster(findIndex, dbMaster.dataTblMenu);

    // put data to form input
    $("#txtInputMenuIdHidden").val(findIndex);
    $("#txtInputMenuName").val(dataTblMenuForEdit.name);
    $("#selectInputMenuFood").val(dataTblMenuForEdit.categoryId);
    $("#txtInputPrice").val(dataTblMenuForEdit.price);
}

/**
 * function for add new menu
 * dev Somchai O00085
 */
function addNewMenu() {
    var lastIndex = dbMaster.dataTblMenu.length; // check last indexOf in arr [dataTblMenu]
    var id = lastIndex + 1;
    dbMaster.dataTblMenu[lastIndex] = {
        id : id,
        name : formDataMenu.txtInputMenuName,
        categoryId : formDataMenu.selectInputTypeMenu,
        categoryName : formDataMenu.selectInputTypeMenuText,
        price : formDataMenu.txtInputPrice
    }
}

/**
 * function for put data to array {dataTblMenu}
 * dev Somchai O00085
 */
function editMenu() {
    // search data in array {dataTblMenu}
    dbMaster.dataTblMenu[formDataMenu.findIdMenuEdit] = {
        name : formDataMenu.txtInputMenuName,
        categoryId : formDataMenu.selectInputTypeMenu,
        categoryName : formDataMenu.selectInputTypeMenuText,
        price : formDataMenu.txtInputPrice
    }
}

/**
 * function for delete data row in table
 * @param {*} findIndex
 */
function deleteVmToRows(findIndex) {
    var confirmAlert = confirm("ต้องการลบข้อมูลหรือไม่");
    if (confirmAlert == true) {
        // remove data from dbMaster {dataTblRestaurant}
        delete dbMaster.dataTblMenu[findIndex];

        // fetch index in object array
        dbMaster.dataTblMenu = fetchIndexObject(dbMaster.dataTblMenu);

        // for focus tag select in option
        var findTypeMenuId = $("#selectMenuType").val(); 

        // reset row data in table
        resetTableViewMenu(); 

        // display all data on table
        eachDataTblMenuToTable(dbMaster.dataTblMenu, findTypeMenuId);

        alert("ลบข้อมูลเรียบร้อย");
        deepClear();
        notFoundDataInTableMenu();
    }
}

/**
 * function for display word Not Found in table
 * dev Somchai O00085
 */
function notFoundDataInTableMenu() {
    var rowCount = $("#tableViewMenu td").closest("tr").length;
    if (rowCount == 0) {
        var syntaxRows = "<tr><td colspan='5'>Not Found !</td></tr>";
        $("#tableViewMenu tr:last").after(syntaxRows);
        $("#tableViewMenu tr td:last").css({"text-align": "center"});
    }
}