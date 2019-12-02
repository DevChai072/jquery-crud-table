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

function viewMenuToRows(findIndex) {
    resetTableViewMenu();
    var arrDataTblRestaurant = findIndexOfdbMaster(findIndex, dbMaster.dataTblRestaurant);
    $(".hrDotted").css({"border-top": "5px dotted black"});

    $(".formViewMenu").show();
    $(".formViewMenu").css({"padding-top": "5px"});

    $("#titleNameRestaurant").text(arrDataTblRestaurant.name);

    $("table#tableViewMenu").css({
        "display": "table",
        "border-collapse": "collapse",
        "border-spacing": "0",
        "width": "100%"
    });

    $("table#tableViewMenu th").css({
        "background-color": "#11167a",
        "color": "#ffffff",
        "padding": "15px"
    });

    tableViewMenu(dbMaster);
}

function tableViewMenu(dbMaster) {
    var findTypeMenuId = $("#selectMenuType").val(); // for focus tag select in option
    $.each(dbMaster.dataTblMenu, function(index, val) {
        var name = val.name;
        var categoryId = val.categoryId;
        var categoryName = val.categoryName;
        var menuPrice = val.price;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + categoryName + "</td><td>" + menuPrice + "</td><td><button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ index +")'>Edit</button></td><td><button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ index +")'>Delete</button></td></tr>";
        if (findTypeMenuId == categoryId) {
            $("#tableViewMenu tr:last").after(syntaxRows);
        } 
        if (findTypeMenuId === "all") {
            $("#tableViewMenu tr:last").after(syntaxRows);
        }
    });

    $("#selectMenuType").change(function() {
        resetTableViewMenu();
        var findTypeMenuId = $(this).find(":selected").val();
        $.each(dbMaster.dataTblMenu, function(index, val) {
            var name = val.name;
            var categoryId = val.categoryId;
            var categoryName = val.categoryName;
            var menuPrice = val.price;
            var syntaxRows = "<tr><td>" + name + "</td><td>" + categoryName + "</td><td>" + menuPrice + "</td><td><button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ index +")'>Edit</button></td><td><button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ index +")'>Delete</button></td></tr>";
            if (findTypeMenuId == categoryId) {
                $("#tableViewMenu tr:last").after(syntaxRows);
            }
            if (findTypeMenuId === "all") {
                $("#tableViewMenu tr:last").after(syntaxRows);
            }
        });
    });
}

function addNewMenu(findIndex) {
    var lastIndex = dbMaster.dataTblMenu.length; // check last indexOf in arr [dataTblMenu]
    var id = lastIndex + 1;
    dbMaster.dataTblMenu[lastIndex] = {
        id : id,
        name : formDataMenu.txtInputMenuName,
        categoryId : formDataMenu.selectInputTypeMenu,
        categoryName : formDataMenu.selectInputTypeMenuText,
        price : formDataMenu.txtInputPrice
    }
    findIndex = fetchDataOnTableMenu(findIndex); //fetch data in table
    return findIndex;
}

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

function editMenu(findIndex) {
    // search data in array {dataTblMenu}
    dbMaster.dataTblMenu[formDataMenu.findIdMenuEdit] = {
        name : formDataMenu.txtInputMenuName,
        categoryId : formDataMenu.selectInputTypeMenu,
        categoryName : formDataMenu.selectInputTypeMenuText,
        price : formDataMenu.txtInputPrice
    }
    findIndex = fetchDataOnTableMenu(findIndex); //fetch data in table
    return findIndex;
}

function deleteVmToRows(findIndex) {
    var confirmAlert = confirm("ต้องการลบข้อมูลหรือไม่");
    if (confirmAlert == true) {
        delete dbMaster.dataTblMenu[findIndex];
        // fetch index in object array
        dbMaster.dataTblMenu = fetchIndexObject(dbMaster.dataTblMenu);
        var findTypeMenuId = $("#selectMenuType").val(); // for focus tag select in option
        resetTableViewMenu(); // reset row data in table

        $.each(dbMaster.dataTblMenu, function(index, val) {
            var name = val.name;
            var categoryId = val.categoryId;
            var categoryName = val.categoryName;
            var menuPrice = val.price;
            var syntaxRows = "<tr><td>" + name + "</td><td>" + categoryName + "</td><td>" + menuPrice + "</td><td><button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ index +")'>Edit</button></td><td><button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ index +")'>Delete</button></td></tr>";
            if (findTypeMenuId == categoryId) {
                $("#tableViewMenu tr:last").after(syntaxRows);
            } 
            if (findTypeMenuId === "all") {
                $("#tableViewMenu tr:last").after(syntaxRows);
            }
        });
        alert("ลบข้อมูลเรียบร้อย");
        notFoundDataInTableMenu();
    }
}

function fetchDataOnTableMenu(findIndex) {
    resetTableViewMenu(); // reset row data in table

    $.each(dbMaster.dataTblMenu, function(index, val) {
        var name = val.name;
        var categoryId = val.categoryId;
        var categoryName = val.categoryName;
        var menuPrice = val.price;
        var syntaxRows = "<tr><td>" + name + "</td><td>" + categoryName + "</td><td>" + menuPrice + "</td><td><button class='btnActVm' id='btnEditVm-"+ index +"' onclick='editVmToRows("+ index +")'>Edit</button></td><td><button class='btnActVm' id='btnDelVm-"+ index +"' onclick='deleteVmToRows("+ index +")'>Delete</button></td></tr>";
        if (findIndex == categoryId) {
            $("#tableViewMenu tr:last").after(syntaxRows);
        } 
        if (findIndex === "all") {
            $("#tableViewMenu tr:last").after(syntaxRows);
        }
    });
    return findIndex;
}

/**
 * function for reser rows intable
 * dev Somchai O00085
 */
function resetTableViewMenu() {
    $("#tableViewMenu").find("tr:gt(0)").remove();
}