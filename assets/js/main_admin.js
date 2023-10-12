function Show() {
    var element = document.getElementById("change__information");
    var style = window.getComputedStyle(element);
    var icon = document.getElementById("information__list--items__icon");
    var ManagerDisplay = document.getElementById("dataContainer");
    //
    var colorText = document.getElementById("information__list");
    var ChangeInformation = document.getElementById("Change_information");
    var colorTextChangeInfro__Icon = document.getElementById("changeInfor__Icon");
    var colorTextChangeInfro = document.getElementById("information__list--items__text");
    var information = document.querySelector('.information')
    var ChangePassword = document.getElementById("Change_password");
    var colorTextChangePassword__Icon = document.getElementById("changePassword__icon");
    var colorTextChangePassword = document.getElementById("changePassword__list--items__text");
    // class and classRoom
    //     display
    var managementClass = document.getElementById("management_class");
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    //     text
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    //Manager Account 
    var colorTextManagerAccount__Icon = document.getElementById("ManagerAccount");
    var colorTextManagerAccount = document.getElementById("managerAcount__Text");
    //Scheduling
    var AreaSchedule = document.getElementById("Schedule");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    //      undisplay
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    //      text
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");

    // Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    if(style.display === "none" || icon.style.transform === "" || information.style.display ==="none") {
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        ManagerDisplay.style.display = "none";
        AreaSchedule.style.display = "none";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        managementClass.style.display = "none";
        information.style.display = 'block';
        element.style.display = "block";
        managementScheduleRegister.style.display = 'none';
        tableScheduleRegister.style.display = 'none';
        tableScheduleUnRegister.style.display = 'none';
        ManagerSubject.style.display = "none";
        icon.style.transform = "rotate(90deg)";
        colorText.style.color = "#33b5e5";
        icon.style.color = "#33b5e5";   
        element.style.color = "#fff";
        colorTextChangeInfro__Icon.style.color = "#fff";   
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff";   
        colorTextChangePassword.style.color = "#fff";
        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";

        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
    }
    else {
        AreaSchedule.style.display = "none";
        element.style.display = "none";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        managementScheduleRegister.style.display = 'none';
        tableScheduleRegister.style.display = 'none';
        tableScheduleUnRegister.style.display = 'none';
        icon.style.transform = "";
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
}

function ShowchangInfor() {
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var icon = document.getElementById("information__list--items__icon");
    var ManagerDisplay = document.getElementById("dataContainer");
    //
    var colorText = document.getElementById("information__list")
    var colorTextChangeInfro__Icon = document.getElementById("changeInfor__Icon");
    var colorTextChangeInfro = document.getElementById("information__list--items__text");
    //
    var ChangePassword = document.getElementById("Change_password");
    var colorTextChangePassword__Icon = document.getElementById("changePassword__icon");
    var colorTextChangePassword = document.getElementById("changePassword__list--items__text");
    //Manager Account 
    var colorTextManagerAccount__Icon = document.getElementById("ManagerAccount");
    var colorTextManagerAccount = document.getElementById("managerAcount__Text");
    // class and class Room
    var managementClass = document.getElementById("management_class");
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    var tableClass = document.getElementById("class_table_container");
    // Scheduling
    var AreaSchedule = document.getElementById("Schedule");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    // Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    if(ChangeInformation.style.display === "none") {
        ChangeInformation.style.display = "block"
        ChangePassword.style.display = "none";
        AreaSchedule.style.display = "none";
        information.style.display = "none";
        ManagerDisplay.style.display = "none";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        tableClass.style.display = "none";
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#33b5e5" ;
        colorTextChangeInfro.style.color = "#33b5e5";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";

        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";

        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else {
        ChangeInformation.style.display = "none"
        AreaSchedule.style.display = "none"
        colorText.style.color = "#33b5e5";
        icon.style.color = "#33b5e5";  
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }

}


function ShowchangPassword() {
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var ManagerDisplay = document.getElementById("dataContainer");
    // Xóa màu
    var icon = document.getElementById("information__list--items__icon");
    var colorText = document.getElementById("information__list");
    var colorTextChangeInfro__Icon = document.getElementById("changeInfor__Icon");
    var colorTextChangeInfro = document.getElementById("information__list--items__text");
    //
    var colorTextChangePassword__Icon = document.getElementById("changePassword__icon");
    var colorTextChangePassword = document.getElementById("changePassword__list--items__text");
    //Manager Account 
    var colorTextManagerAccount__Icon = document.getElementById("ManagerAccount");
    var colorTextManagerAccount = document.getElementById("managerAcount__Text");
    // class and classRoom
    var managementClass = document.getElementById("management_class");
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    var tableClass = document.getElementById("class_table_container");
    //Scheduling
    var AreaSchedule = document.getElementById("Schedule");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    // Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    if(ChangePassword.style.display === "none") {
        ChangePassword.style.display = "block";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        ManagerDisplay.style.display = "none";
        AreaSchedule.style.display = "none";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        tableClass.style.display = "none";
        //
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextManagerAccount.style.color = "#fff" ;

        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff" ;

        colorTextManagerAccount__Icon.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#33b5e5" ;
        colorTextChangePassword.style.color = "#33b5e5";

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else {
        ChangePassword.style.display = "none";
        ChangeInformation.style.display = "none"
        colorText.style.color = "#33b5e5";
        icon.style.color = "#33b5e5";  
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff" ;

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }

}

function ShowPassword() {
    var showPassword = document.getElementById("show__password");
    var password = document.getElementById("password");
    if(showPassword.checked) {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
}

function ShowChangePassword() {
    var showPassword = document.getElementById("changePassword__show--password");
    var passwordOld = document.getElementById("password__old");
    var password = document.getElementById("password__new");
    var Confirmpassword = document.getElementById("confirm__password--new");
    if(showPassword.checked) {
        passwordOld.type = "text";
        password.type = "text";
        Confirmpassword.type = "text";
    }
    else {
        passwordOld.type = "password";
        password.type = "password";
        Confirmpassword.type = "password";
    }
}

function CloseAdminChangeUser() {
    var close = document.getElementById("Admin__change--user");
    if(close.style.display === "none") {
        close.style.display = "none";
        localStorage.removeItem("IdUser");
    }
    else {
        localStorage.removeItem("IdUser");
        close.style.display = "none";
    }
}
// ClassRoom
// function showInforClassRoom() {
//     // display
//     var managementClassRoom = document.getElementById("management_classRoom");
//     var style = window.getComputedStyle(managementClassRoom);
//     var updateClassRoom = document.getElementById("update_classRoom");
//     var addClassRoom = document.getElementById("add_classRoom");
//     var dataContainer = document.getElementById("dataContainer");
//     var managementClass = document.getElementById("management_class");
//     // text and icon
//     var managerAcountText = document.getElementById("managerAcount__Text");
//     var managerAcountIcon = document.getElementById("managerAcount__Icon");
//     var managerClassRoomText = document.getElementById("managerClassRoom__Text");
//     var managerClassRoomIcon = document.getElementById("managerClassRoom__Icon");
//     //Scheduling
//     var AreaSchedule = document.getElementById("Schedule");
//     var navbarSchedulingIcon = document.getElementById("scheduling");
//     var navbarSchedulingText = document.getElementById("chedulingText");
//     if (style.display === "none") {
//         // display
//         managementClassRoom.style.display = "block";
//         dataContainer.style.display = "none";
//         updateClassRoom.style.display = "none";
//         addClassRoom.style.display = "none";
//         managementClass.style.display = "none";
//         AreaSchedule.style.display = "none";
//         // color
//         managerAcountText.style.color = "#fff";
//         managerAcountIcon.style.color = "#fff";
//         managerClassRoomText.style.color = "#31B1DB";
//         managerClassRoomIcon.style.color = "#31B1DB";
//         navbarSchedulingIcon.style.color = "#fff";
//         navbarSchedulingText.style.color = "#fff";
      
//     } else {
//         managementClassRoom.style.display = "none";
//         dataContainer.style.display = "none";
//         updateClassRoom.style.display = "none";
//         addClassRoom.style.display = "none";
//         managementClass.style.display = "none";
//         navbarSchedulingIcon.style.color = "#fff";
//         navbarSchedulingText.style.color = "#fff";
//     }
// }

// function editInforClassRoom(){
//     var updateClassRoom = document.getElementById("update_classRoom");
//     var managementClassRoom = document.getElementById("management_classRoom");
//     var style = window.getComputedStyle(updateClassRoom);

//     if(style.display === "none"){
//         updateClassRoom.style.display = "block";
//         managementClassRoom.style.display = "none";
//     }

// }
// function addClassRoom(){
//     var addclassRoom = document.getElementById("add_classRoom");
//     var style = window.getComputedStyle(updateClassRoom);
//     var updateClassRoom = document.getElementById("update_classRoom");
//     var managementClassRoom = document.getElementById("management_classRoom");

//     if(style.display === "none"){
//         addclassRoom.style.display = "block";
//         managementClassRoom.style.display = "none";
//         updateClassRoom.style.display = "none";
//     }
// }
function deleteInforClassRoom(){
    alert("Xóa thành công");
}
function checkOnClickEditClassRoom(){
    alert("Sửa thành công");
}
function checkOnClickAddClassRoom(){
    alert("Thêm thành công");
}  

// Class
function showInforClass(){
    var addClass = document.getElementById("add_class");
    var style = window.getComputedStyle(addClass);
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClass = document.getElementById("update_class");
    var managementClass = document.getElementById("management_class");

    if(style.display === "none"){
        addClass.style.display = "block";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
    }
    else{
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
    }
}

function editInforClass(){
    var updateClass = document.getElementById("update_class");
    var style = window.getComputedStyle(updateClass);
    var managementClassRoom = document.getElementById("management_classRoom");
    var managementClass = document.getElementById("management_class");

    if(style.display === "none"){
        updateClass.style.display = "block";
        managementClassRoom.style.display = "none";
        managementClass.style.display = "none";
    }

}


function ShowScheduling() {
    //Phần sắp xếp lịch
    var AreaSchedule = document.getElementById("Schedule");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    //
    var information = document.getElementById("information");
    var informationText = document.getElementById("information__list");
    var informationIcon = document.getElementById("information__list--items__icon");
    //
    var changeInformation = document.getElementById("Change_information");
    var changeInformationIcon = document.getElementById("changeInfor__Icon");
    var changeInformationText = document.getElementById("information__list--items__text");
    //
    var ChangePass = document.getElementById("Change_password");
    var changePassIcon = document.getElementById("changePassword__icon");
    var changePassText = document.getElementById("changePassword__list--items__text");
    //
    var managerAccount = document.getElementById("dataContainer");
    var managerAccIcon = document.getElementById("managerAcount__Icon");
    var managerAccText = document.getElementById("managerAcount__Text");
    // display
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    var style = window.getComputedStyle(AreaSchedule);
    var updateClassRoom = document.getElementById("update_classRoom");
    var addClassRoom = document.getElementById("add_classRoom");
    var dataContainer = document.getElementById("dataContainer");
    var managementClass = document.getElementById("management_class");
    var managementSchedule = document.getElementById("management_Schedule");
    var tableSchedule = document.getElementById("Schedule_table_container");
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    // text and icon
    var managerAcountText = document.getElementById("managerAcount__Text");
    var managerAcountIcon = document.getElementById("managerAcount__Icon");
    var managerClassRoomText = document.getElementById("managerClassRoom__Text");
    var managerClassRoomIcon = document.getElementById("managerClassRoom__Icon");

    // Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    
    if (style.display === "none") {
        // display
        AreaSchedule.style.display = "block";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        dataContainer.style.display = "none";
        updateClassRoom.style.display = "none";
        addClassRoom.style.display = "none";
        managementClass.style.display = "none";
        information.style.display = "none";
        changeInformation.style.display = "none";
        ChangePass.style.display = "none";
        managerAccount.style.display = "none";
        managementSchedule.style.display = "none";
        tableSchedule.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        // color
        managerAcountText.style.color = "#fff";
        managerAcountIcon.style.color = "#fff";
        managerClassRoomText.style.color = "#fff";
        managerClassRoomIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#31B1DB";
        navbarSchedulingIcon.style.color = "#31B1DB";

        informationText.style.color = "#fff";
        informationIcon.style.color = "#fff";

        changeInformationText.style.color = "#fff";
        changeInformationIcon.style.color = "#fff";
        //
        changePassIcon.style.color = "#fff";
        changePassText.style.color = "#fff";
        //
        managerAccIcon.style.color = "#fff";
        managerAccText.style.color = "#fff";

        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
    } else {
        changeInformation.style.display = "none";
        information.style.display = "none";
        ChangePass.style.display = "none";
        managerAccount.style.display = "none";
        AreaSchedule.style.display = "none";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        dataContainer.style.display = "none";
        updateClassRoom.style.display = "none";
        addClassRoom.style.display = "none";
        managementClass.style.display = "none";
        managementSchedule.style.display = "none";
        tableSchedule.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";

        navbarSchedulingText.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";

        informationText.style.color = "#fff";
        informationIcon.style.color = "#fff";

        changeInformationText.style.color = "#fff";
        changeInformationIcon.style.color = "#fff";

        changePassIcon.style.color = "#fff";
        changePassText.style.color = "#fff";
        //
        managerAccIcon.style.color = "#fff";
        managerAccText.style.color = "#fff";
        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
    }
}

// Subject

function CloseAdminChangeSubject() {
    var close = document.getElementById("Admin__change--subjects");
    if(close.style.display === "none") {
        close.style.display = "none";
        localStorage.removeItem("IdSubject");
    }
    else {
        localStorage.removeItem("IdSubject");
        close.style.display = "none";
    }
}

function OpenAdminAddSubject() {
    const ShowAdminChangeUser = document.getElementById("Admin__add--subjects");
    ShowAdminChangeUser.style.display = "block";
}

function CloseAdminAddSubject() {
    const ShowAdminChangeUser = document.getElementById("Admin__add--subjects");
    ShowAdminChangeUser.style.display = "none";
}