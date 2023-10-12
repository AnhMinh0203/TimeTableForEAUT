function login() {
  const loginUrl = "https://localhost:7013/api/Users/SignIn";
  const username = document.getElementById("name-login").value;
  const password = document.getElementById("password").value;
  fetch(loginUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      email: username,
      passWordHas: password,
      }),
  })
  .then((response) => {
      if (!response.ok) {
        alert("Đăng nhập không thành công.\nVui lòng kiểm tra lại tài khoản và mật khẩu");
      throw new Error("Đăng nhập không thành công.");
      }
      return response.json();
  })
  .then((data) => {
    if(data.token === "Tên đăng nhập hoặc mật khẩu không đúng" || data.token === "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để mở") {
        alert(data.token);
    }
    else {
        // Xử lý dữ liệu trả về từ API
        // console.log(data);
        // const setjson=JSON.stringify(data);
        
        localStorage.setItem("login",data.token);
        // Thực hiện các hành động khác sau khi đăng nhập thành công
        const namelogin = data.name;
        localStorage.setItem("fullname",namelogin);
        localStorage.setItem("email",data.email);
        localStorage.setItem("avata",data.avata);
        if(data.status === "Thành công") {
            window.location.href = "main_admin.html";
        }
        else {
            alert(data.token);
        }
    }

      // localStorage.removeItem("signin");
  })
  .catch((error) => {
      // Xử lý lỗi
      console.error(error);
  });
}

// sign up
function signin() {
  const signinUrl = "https://localhost:7013/api/Users/SignUp";
  const email = document.getElementById("account").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmPassWord").value;
  const firstname = document.getElementById("first__name").value;
  const lastname = document.getElementById("last__name").value;
  const dateofbirth = document.getElementById("birth").value;
  var genderRadioButtons = document.getElementsByName("gender");
  var genderValue;
  for (var i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
          var selectedGender = genderRadioButtons[i].value;
          genderValue = (selectedGender === "Nam") ? "1" : "0";
        }
  }
  let typeAccount = document.getElementById("type__account").value;
  if(typeAccount === 1){
    typeAccount = "CH";
  }
  else {
    typeAccount = "TG";
  }
  const numberphone = document.getElementById("phonenumber").value;
  var avata = document.getElementById("avata").value;
  if (genderValue === "0" && (!avata || avata === "")) {
    avata = "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000";
  } else if (genderValue === "1" && (!avata || avata === "")) {
    avata = "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png";
  }
  fetch(signinUrl, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName:firstname,
        lastName:lastname,
        email: email,
        phoneNumber: numberphone,
        password: password,
        confirmPassword: confirmpassword,
        typeAccount: typeAccount,
        gender: genderValue,
        dateOfBirth: dateofbirth,
        avata: avata
      }),
  })
  .then((response) => {
      if (!response.ok) {
      alert("Đăng ký không thành công.\nVui long kiểm tra lại")
      throw new Error("Đăng ký không thành công.");
      }
      return response.json();
  })
  .then((data) => {
      // Xử lý dữ liệu trả về từ API
      alert(data.status);
      window,location.href = "index.html";
      // alert(data.result);

  })
  .catch((error) => {
      // Xử lý lỗi
      console.error(error);
  });
}

function DeleteLocalStorage() {
  localStorage.removeItem("fullname");
  localStorage.removeItem("avata");
  localStorage.removeItem("login");
  localStorage.removeItem("dateofbirth");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  localStorage.removeItem("gender");
}

function getInformation() {
  const getInforUrl = "https://localhost:7013/api/Users/Info";

  fetch(`${getInforUrl}?email=${localStorage.getItem("email")}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
      }
      return response.json();
  })
  .then((data) => {
    localStorage.setItem("username", data.email);
    localStorage.setItem("fullname", data.userName);
    const dateObject = new Date(data.dateOfBirth);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear();
    
    const formattedDate = `${day}-${month}-${year}`;
    localStorage.setItem("dateofbirth", formattedDate);
    localStorage.setItem("gender", data.gender === 1 ? "Nữ" : "Nam");

    // Lấy tên đăng nhập từ localStorage
    const username = localStorage.getItem("email");
    const dateofbirth = localStorage.getItem("dateofbirth");
    const gender = localStorage.getItem("gender");
    // Hiển thị tên đăng nhập
    const nameLogin = document.getElementById("account__infor--username__input"); 
    const FullName = document.getElementById("account__infor--fullname__input"); 
    const DateOfBirth = document.getElementById("infor__list--birth__input"); 
    const Gender = document.getElementById("infor__list--gender__input"); 
    // Change infor
    const changeFirstName = document.getElementById("Change__firstName"); 
    const changeLastName = document.getElementById("Change_lastName"); 
    const changeDateOfBirth = document.getElementById("Change__dateOfBirth"); 
    const changeGender = document.getElementById("Change__gender"); 
    const changeAvata = document.getElementById("Change_avata"); 
    // get: Insert data to Input
    nameLogin.value = username; 
    FullName.value = fullname;
    DateOfBirth.value = dateofbirth;
    Gender.value = gender;

    //Change: Insert data to input 
    changeFirstName.value = data.firstName;
    changeLastName.value = data.lastName
    changeDateOfBirth.value = dateofbirth;
    changeGender.value = gender;
    changeAvata.value = localStorage.getItem("avata");
    })
  .catch((error) => {
      // Xử lý lỗi
      console.error(error);
  });
}

function ChangeInformation() {
    const changeInforUrl = "https://localhost:7013/api/EditAccount";
    const changeFirstName = document.getElementById("Change__firstName").value; 
    const changeLastName = document.getElementById("Change_lastName").value; 
    const changeDateOfBirth = document.getElementById("Change__dateOfBirth").value; 
    const changeGenderInput = document.getElementById("Change__gender"); 
    const changeAvata = document.getElementById("Change_avata").value; 
    let changeGender = changeGenderInput.value.toUpperCase(); // Chuyển đổi thành chữ in hoa
  
    if (changeGender === "NAM") {
        changeGender = 1;
    }
    else if (changeGender === "NỮ") {
        changeGender = 0;
    }
    else {
        changeGender = 0;
    }
  
    var parts = changeDateOfBirth.split('-'); // Tách ngày, tháng và năm thành mảng
  
    if (parts.length !== 3) {
        return "Ngày không hợp lệ";
    }
  
    var ngay = parts[0];
    var thang = parts[1];
    var nam = parts[2];
  
    var ngayMoi = nam + '-' + thang.padStart(2, '0') + '-' + ngay.padStart(2, '0');
      // Gửi request fetch
    fetch(`${changeInforUrl}?token=${localStorage.getItem("login")}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
    },
    body: JSON.stringify({
        firstName: changeFirstName,
        lastName: changeLastName,
        email: "string",
        numberPhone: 0,
        gender: changeGender,
        dateOfBirth: ngayMoi,
        avata: changeAvata, 
        usedStated: 0,
        description: "",
    }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
    alert(data.result);
    })
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
    
}
  


function ChangePassword() {
    const changeInforUrl = "https://localhost:7013/api/ChangerPassWord";
    const password__old = document.getElementById("password__old").value; 
    const password__new = document.getElementById("password__new").value; 
    const confirm__password = document.getElementById("confirm__password--new").value; 
    fetch(`${changeInforUrl}?token=${localStorage.getItem("login")}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passWordHas: password__old,
          newPassword: password__new,
          confirmNewPassword: confirm__password
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
    })
    .then((data) => {
        alert(data.status);
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}

function GetAccountManager() {
    const changeInforUrl = "https://localhost:7013/api/UserManager";
    const accountManager = document.getElementById("account__manager"); 
    fetch(changeInforUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   passWordHas: password__old,
        //   newPassword: password__new,
        //   confirmNewPassword: confirm__password
        // }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
    })
    .then((data) => {
        // alert(data.status);
        data.forEach(item => {
            alert(item);
            const divElement = document.createElement('div');
            divElement.textContent = item;
            accountManager.appendChild(divElement);
        });
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}

let dataLoaded = false;
let tableBody = null; 
let pageIndexManagerAccount = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberManagerAccount(pageNumber) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/UserManager?pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerAccount(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationManagerAccount(data, currentPage) {
    const dataContainer = document.getElementById('table__Account--full');//AccountManager__search--table
    const SearchAccountManager = document.getElementById('AccountManager__search--table');
    //Hiển thị
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var ManagerDisplay = document.getElementById("dataContainer");//search_table--managerAccount
    var SearchTableManagerAccount = document.getElementById("table__Account--item");//search_table--managerAccount
    var managementClassRoom = document.getElementById("management_classRoom");
    var managerAcountIcon = document.getElementById("managerAcount__Icon");
    var managementClass = document.getElementById("management_class");
    var tableClass = document.getElementById("class_table_container");
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    const DataNull = document.getElementById('accountManager__list--user');
    //
    var Scheduling = document.getElementById("Schedule");

    // Xóa màu
    var icon = document.getElementById("information__list--items__icon");
    var colorText = document.getElementById("information__list");
    var managerClassRoomText = document.getElementById("managerClassRoom__Text");
    var managerClassRoomIcon = document.getElementById("managerClassRoom__Icon");
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    //Change Infomation
    var colorTextChangeInfro__Icon = document.getElementById("changeInfor__Icon");
    var colorTextChangeInfro = document.getElementById("information__list--items__text");
    // Change Password
    var colorTextChangePassword__Icon = document.getElementById("changePassword__icon");
    var colorTextChangePassword = document.getElementById("changePassword__list--items__text");
    //Manager Account 
    var colorTextManagerAccount__Icon = document.getElementById("ManagerAccount");
    var colorTextManagerAccount = document.getElementById("managerAcount__Text");
    // Scheduling
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    //Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    if(SearchTableManagerAccount.style.display === "none") {
        // HIển thị
        ManagerDisplay.style.display = "block";
        SearchTableManagerAccount.style.display = "block";
        // Tắt hiển thị
        managementClassRoom.style.display = "none";
        ChangePassword.style.display = "none";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        SearchAccountManager.style.display = "none";
        Scheduling.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";

        // Đổi màu
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        managerClassRoomText.style.color = "#fff";
        managerClassRoomIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        //set color manager account
        colorTextManagerAccount__Icon.style.color = "#33b5e5" ;
        SearchTableManagerAccount.style.display = "none";
        colorTextManagerAccount.style.color = "#33b5e5";
        managerAcountIcon.style.color = "#31B1DB";

        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else {
        // Display = none
        ManagerDisplay.style.display = "block";
        managementClassRoom.style.display = "none";
        ChangePassword.style.display = "none";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        Scheduling.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        // Đổi màu
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        managerClassRoomText.style.color = "#fff";
        managerClassRoomIcon.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        //
        //set color manager account
        colorTextManagerAccount__Icon.style.color = "#33b5e5" ;
        colorTextManagerAccount.style.color = "#33b5e5";
        managerAcountIcon.style.color = "#31B1DB";
        //
        navbarSchedulingText.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    
    // 
    const ShowListAccount = document.getElementById('accountManager__list--user');
    // const tableClass = document.getElementById('select__subject--item');
    // const Schedule = document.getElementById('Schedule');//Schedule
    // if(tableClass.style.display === "none") {
    //     tableClass.style.display = "block";
    // }
    // else {
    //     tableClass.style.display = "block";
    // }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody) {
        const table = document.createElement('table');
        table.id = "table__managerAccount";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Giảng viên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody = table.querySelector('tbody');
    }
    else {
        tableBody.innerHTML = ''; 
    }

    tableBody.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateOfBirth);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
            <td>0${item.phone}</td>
            <td>${item.type === "TG"?"Thỉnh giảng" : "Cơ hữu"}</td>
            <td>${formattedDate}</td>
            <td>${item.gender === 1 ? "Nam" : "Nữ"}</td>
            <td>${item.usedState === 0 ? "Đang mở" : "Tạm khóa"}</td>
            <td>
                <div class="hover-container">
                    <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick = "ShowChangeInforUser('${item.id}')"></i>
                    <span class="tooltip">Sửa</span>
                </div>
                <div class="hover-container">
                    <i class="fa-solid fa-trash-can admin__delete--icon" data-id="${item.id}" onclick = "AdminDeleteUser('${item.id}')"></i>
                    <span class="tooltip">Xóa</span>
                </div>
                <div class="hover-container">
                    <i class="fa-solid fa-lock admin__lock--icon" data-id="${item.id}" onclick = "AdminLockAccount('${item.id}')"></i>
                    <span class="tooltip">Khóa</span>
                </div>
                <div class="hover-container">
                    <i class="fa-solid fa-unlock admin__unlock--icon" data-id="${item.id}" onclick = "AdminUnLockAccount('${item.id}')"></i>
                    <span class="tooltip">Mở Khóa</span>
                </div>
            </td>
        `;
        stt++;
        tableBody.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexManagerAccount = i;
            fetchApiWithPageNumberManagerAccount(pageIndexManagerAccount);
        });

        paginationContainer.appendChild(button);
    }

    tableBody.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllManagerAccountForSchedule(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded) {
        await fetchApiWithPageNumberManagerAccount(pageIndex);
        dataLoaded = true;
    }
    else {
        await fetchApiWithPageNumberManagerAccount(pageIndex);
    }
}

// Search Account

let dataLoaded__search = false;
let tableBody__search = null; 
let pageIndexSearchAccount = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberSearchAccount(pageNumber, userId) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/UserManager/Id?id=${userId}&pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerAccount(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationSearchAccount(data, currentPage) {
    // lấy dữ liệu từ thẻ input
    const userId = document.getElementById("accountManager__search--name").value;
    //
    const dataContainer = document.getElementById('table__Account--item');
    
    const ShowListAccount = document.getElementById('accountManager__list--user');
    //Hiển thị
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var ManagerDisplay = document.getElementById("dataContainer");
    // schedule
    // undisplay
    // var managementScheduleRegister = document.getElementById("management_Schedule");
    // var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    // var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    const ListAccountManager = document.getElementById('table__Account--full');
    // format color

    const DataNull = document.getElementById('accountManager__list--user');
    // Xóa màu
    var icon = document.getElementById("information__list--items__icon");
    var colorText = document.getElementById("information__list");
    //Change Infomation
    var colorTextChangeInfro__Icon = document.getElementById("changeInfor__Icon");
    var colorTextChangeInfro = document.getElementById("information__list--items__text");
    // Change Password
    var colorTextChangePassword__Icon = document.getElementById("changePassword__icon");
    var colorTextChangePassword = document.getElementById("changePassword__list--items__text");
    //Manager Account 
    var colorTextManagerAccount__Icon = document.getElementById("ManagerAccount");
    var colorTextManagerAccount = document.getElementById("managerAcount__Text");
    //Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    if(ListAccountManager.style.display === "block") {
        // HIển thị
        ManagerDisplay.style.display = "block";
        // Tắt hiển thị
        ChangePassword.style.display = "none";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        ListAccountManager.style.display = "none";
        // managementScheduleRegister.style.display = "none";
        // tableScheduleRegister.style.display = "none";
        // tableScheduleUnRegister.style.display = "none";

        // Đổi màu
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        //set color manager account
        colorTextManagerAccount__Icon.style.color = "#33b5e5" ;
        colorTextManagerAccount.style.color = "#33b5e5";
        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else {
        // Display = none
        ManagerDisplay.style.display = "block";
        ChangePassword.style.display = "none";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        ListAccountManager.style.display = "none";
        // managementScheduleRegister.style.display = "none";
        // tableScheduleRegister.style.display = "none";
        // tableScheduleUnRegister.style.display = "none";

        // Đổi màu
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        //set color manager account
        colorTextManagerAccount__Icon.style.color = "#33b5e5" ;
        colorTextManagerAccount.style.color = "#33b5e5";
        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__search) {
        const table = document.createElement('table');
        table.id = "table__managerAccount";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__search = table.querySelector('tbody');
    }
    else {
        tableBody__search.innerHTML = ''; 
    }

    tableBody__search.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
    const dateObject = new Date(item.dateOfBirth);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${stt}</td>
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>0${item.phone}</td>
        <td>${formattedDate}</td>
        <td>${item.gender === 1 ? "Nam" : "Nữ"}</td>
        <td>${item.usedState === 0 ? "Đang mở" : "Tạm khóa"}</td>
        <td>
            <div class="hover-container">
                <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick = "ShowChangeInforUser('${item.id}')"></i>
                <span class="tooltip">Sửa</span>
            </div>
            <div class="hover-container">
                <i class="fa-solid fa-trash-can admin__delete--icon" data-id="${item.id}" onclick = "AdminDeleteUser('${item.id}')"></i>
                <span class="tooltip">Xóa</span>
            </div>
            <div class="hover-container">
                <i class="fa-solid fa-lock admin__lock--icon" data-id="${item.id}" onclick = "AdminLockAccount('${item.id}')"></i>
                <span class="tooltip">Khóa</span>
            </div>
            <div class="hover-container">
                <i class="fa-solid fa-unlock admin__unlock--icon" data-id="${item.id}" onclick = "AdminUnLockAccount('${item.id}')"></i>
                <span class="tooltip">Mở Khóa</span>
            </div>
        </td>
        `;
        stt++;
        tableBody__search.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexSearchAccount = i;
            fetchApiWithPageNumberSearchAccount(pageIndexSearchAccount, userId);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__search.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllSearchAccountForSchedule(pageIndex) {
    const userId = document.getElementById("accountManager__search--name").value;
    // Gọi API ban đầu với số trang pageIndex
    if(userId === "") {
        if (!dataLoaded) {
            await fetchApiWithPageNumberManagerAccount(pageIndex);
            dataLoaded = true;
        }
        else {
            await fetchApiWithPageNumberManagerAccount(pageIndex);
        }
    }
    else {
        if (!dataLoaded__search) {
            await fetchApiWithPageNumberSearchAccount(pageIndex, userId);
            dataLoaded__search = true;
        }
        else {
            await fetchApiWithPageNumberSearchAccount(pageIndex, userId);
        }
    }
    
}


// Admin sửa thông tin tài khoản
function ShowChangeInforUser(itemId) {
    const getInforUser = "https://localhost:7013/api/UserManager/Id";
    const changeFirstName = document.getElementById("Change__firstName--admin"); 
    const changeLastName = document.getElementById("Change_lastName--admin"); 
    const changeEmail = document.getElementById("Change_Email--admin"); 
    const changePhoneNumber = document.getElementById("Change_numberphone--admin"); 
    const changeDateOfBirth = document.getElementById("Change__dateOfBirth--admin"); 
    const changeGender = document.getElementById("Change__gender--admin"); 
    const changeAvata = document.getElementById("Change_avata--admin"); 
    const ShowAdminChangeUser = document.getElementById("Admin__change--user"); 
    if(ShowAdminChangeUser.style.display === "none") {
        ShowAdminChangeUser.style.display = "block";
    }
    else {
        ShowAdminChangeUser.style.display = "block";
    }
    // Send request to get infor user
    fetch(`${getInforUser}?id=${itemId}&pageIndex=${1}&pageSize=${1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
        },
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
        })
        .then((data) => {
            data.result.forEach(item => { 
                const dateObject = new Date(item.dateOfBirth);
                localStorage.setItem("IdUser", itemId);
                const day = dateObject.getDate();
                const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
                const year = dateObject.getFullYear();
                if(item.gender === 1) {
                    item.gender = "Nam";
                }
                else item.gender = "Nữ";
                const formattedDate = `${day}-${month}-${year}`;
                changeFirstName.value = item.firstName;
                changeLastName.value = item.lastName;
                changeEmail.value = item.email;
                changePhoneNumber.value = "0" +item.phone;
                changeDateOfBirth.value = formattedDate;
                changeGender.value = item.gender;
                changeAvata.value = item.avata;
            })
            
        })
        .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}

function AdminChangeInforUser() {
    const changeInforUrl = "https://localhost:7013/api/EditAccount/Manager";
    const changeFirstName = document.getElementById("Change__firstName--admin").value; 
    const changeLastName = document.getElementById("Change_lastName--admin").value; 
    const changeEmail = document.getElementById("Change_Email--admin").value; 
    const changePhoneNumber = document.getElementById("Change_numberphone--admin").value; 
    const changeDateOfBirth = document.getElementById("Change__dateOfBirth--admin").value; 
    const changeGenderInput = document.getElementById("Change__gender--admin"); 
    const changeAvata = document.getElementById("Change_avata--admin").value; 
    const ShowAdminChangeUser = document.getElementById("Admin__change--user"); 
    const id = localStorage.getItem("IdUser");
    let changeGender = changeGenderInput.value.toUpperCase();
    if (changeGender === "NAM") {
        changeGender = 1;
    }
    else if (changeGender === "NỮ") {
        changeGender = 0;
    }
    else {
        changeGender = 3;
    }
    var parts = changeDateOfBirth.split('-'); // Tách ngày, tháng và năm thành mảng
  
        if (parts.length !== 3) {
            return "Ngày không hợp lệ";
        }
    
        var ngay = parts[0];
        var thang = parts[1];
        var nam = parts[2];
    
        var ngayMoi = nam + '-' + thang.padStart(2, '0') + '-' + ngay.padStart(2, '0');
      // Gửi request change infor user
    fetch(`${changeInforUrl}?id=${id}&token=${localStorage.getItem("login")}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
    },
    body: JSON.stringify({
        firstName: changeFirstName,
        lastName: changeLastName,
        email: changeEmail,
        numberPhone: changePhoneNumber,
        gender: changeGender,
        dateOfBirth: ngayMoi,
        avata: changeAvata, 
        usedStated: 0,
        description: "",
    }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
        localStorage.removeItem("IdUser");
        console.log(data);
        if(data.statusCode === 200) {
            alert("Sửa thành công");
            if(ShowAdminChangeUser.style.display === "block") ShowAdminChangeUser.style.display = "none";
            else ShowAdminChangeUser.style.display = "none";
            GetAllSearchAccountForSchedule(1);
        }
        else {
            alert("Sửa không thành công")
        }
    
    })
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
}

function AdminDeleteUser(id) {
    const changeInforUrl = "https://localhost:7013/api/UserManager";
    fetch(`${changeInforUrl}?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
        },
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
        })
        .then((data) => {
            localStorage.removeItem("IdUser");
            if(data.statusCode === 200) {
                alert(data.result);
                GetAllSearchAccountForSchedule(1);
            }
            else {
                alert("Sửa không thành công")
            }
        
        })
        .catch((error) => {
        // Xử lý lỗi
        console.error(error);
        });
}

function AdminLockAccount(id) {
    const changeInforUrl = "https://localhost:7013/api/UserManager";
    var isConfirmed = confirm("Bạn có chắc chắn muốn khóa tài khoản này này?");
    if(isConfirmed) {
        fetch(`${changeInforUrl}?id=${id}&usedStated=${1}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
            },
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }
            return response.json();
            })
            .then((data) => {
                localStorage.removeItem("IdUser");
                if(data.statusCode === 200) {
                    alert("Khóa tài khoản thành công");
                    GetAllSearchAccountForSchedule(1);
                }
                else {
                    alert("Sửa không thành công")
                }
            
            })
            .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    else {
        alert("Hành động đã bị hủy");
    }
}

function AdminUnLockAccount(id) {
    const changeInforUrl = "https://localhost:7013/api/UserManager";
    var isConfirmed = confirm("Bạn có chắc chắn muốn mở khóa tài khoản này?");
    if(isConfirmed) {
        fetch(`${changeInforUrl}?id=${id}&usedStated=${0}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
            },
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }
            return response.json();
            })
            .then((data) => {
                localStorage.removeItem("IdUser");
                console.log(data);
                if(data.statusCode === 200) {
                    alert("Mở khóa tài khoản thành công");
                    GetAllSearchAccountForSchedule(1);
                }
                else {
                    alert("Sửa không thành công")
                }
            
            })
            .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    else {
        alert("Hành động đã bị hủy");
    }
}

function AdminLockAccountType(typeAccount, usedState) {
    const changeInforUrl = "https://localhost:7013/api/UserManager/LoclAccount";
    var isConfirmed = confirm("Bạn có chắc chắn muốn khóa tài khoản này này?");
    if(isConfirmed) {
        fetch(`${changeInforUrl}?TypeAccount=${typeAccount}&UsedStated=${usedState}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
            },
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }
            return response.json();
            })
            .then((data) => {
                localStorage.removeItem("IdUser");
                if(data.statusCode === 200) {
                    alert("Khóa tài khoản thành công");
                    GetAllSearchAccountForSchedule(1);
                }
                else {
                    alert("Sửa không thành công")
                }
            
            })
            .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    else {
        alert("Hành động đã bị hủy");
    }
}

// class

function showInforClass(){
    var managementClass = document.getElementById("management_class");
    var style = window.getComputedStyle(managementClass);
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");

    if(style.display === "none"){
        managementClass.style.display = "block";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";

    }
    else{
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
    }
}
let dataLoaded__searchClass = false;
let tableBody__searchClass = null; 
let pageIndexSearchClass = 1;

async function GetAllManagerClass(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchClass) {
        await fetchApiWithPageNumberManagerClass(pageIndex);
    }
    else {
        await fetchApiWithPageNumberManagerClass(pageIndex);
    }
}

async function fetchApiWithPageNumberManagerClass(pageNumber) {
    try {
        const getClassUrl = `https://localhost:7013/api/Class?pageIndex=${pageNumber}&pageSize=${5}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();
       
        displayDataAndPaginationManagerClass(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

function displayDataAndPaginationManagerClass(data, currentPage) {

    const dataContainer = document.getElementById('class_table_container');
    const showListClass = document.getElementById('ClassManager');
    // hiển thị
    var managementClass = document.getElementById("management_class");
    var tableClass = document.getElementById("class_table_container");
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var ManagerDisplay = document.getElementById("dataContainer");
    var information = document.querySelector('.information')
    var element = document.getElementById("change__information");
    var AreaSchedule = document.getElementById("Schedule");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    // Đổi màu
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    // mặc định
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    var textColorManagerAccount = document.getElementById("managerAcount__Text");
    var iconColorManagerAccount = document.getElementById("managerAcount__Icon");
    var informationListText = document.getElementById("information__list");
    var informationListIcon = document.getElementById("information__list--items__icon");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    
    //
    var tableClass = document.getElementById("class_table_container");
    //Subject
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");

    var DataNull = document.getElementById("ClassManager");
    if(tableClass.style.display === "none"){
        //Hiển thị 
        managementClass.style.display = "block";
        tableClass.style.display = "block";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        // Đổi màu chữ
        textColorManagerClass.style.color = "#31B1DB";
        iconDownClass.style.color = "#31B1DB";
        // mặc định
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        //
        ManagerSubject.style.display = "none";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else{
        managementClass.style.display = "block";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        ManagerSubject.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";

        textColorManagerClass.style.color = "#31B1DB";
        iconDownClass.style.color = "#31B1DB";
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        //
       
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    // Đổ dữ liệu
    try {
        if (!Array.isArray(data.result) || data.result.length === 0) {
            DataNull.style.display = "block";
            showListClass.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } 
        else 
        {    
            if (!tableBody__searchClass) {
                DataNull.style.display = "none";
                const table = document.createElement('table');
                table.id = "search_table--managerClass"
                table.innerHTML = `
                    <thead id="ClassManager__search--table">
                        <tr>
                            <th>STT</th>
                            <th>Tên lớp</th>
                            <th>Năm học</th>
                            <th>Khóa học</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                dataContainer.appendChild(table);
                tableBody__searchClass = table.querySelector('tbody');
            }
        }  
        tableBody__searchClass.innerHTML = '';
        var stt = 1;
        data.result.forEach(item => {
            const dateCre = new Date(item.createDate);
            const dayCre = dateCre.getDate();
            const monthCre = dateCre.getMonth()+1;
            const yearCre = dateCre.getFullYear();
            const formatDateCre = `${dayCre}-${monthCre}-${yearCre}`;

            const dateCourse = new Date(item.year_Of_Admission);
            const dayCourse = dateCourse.getDate();
            const monthCourse = dateCourse.getMonth()+1;
            const yearCourse = dateCourse.getFullYear();
            const formatDateCourse = `${dayCourse}-${monthCourse}-${yearCourse}`;

            const row = document.createElement('tr');
            // row.style.height = '60px';
            row.innerHTML = `
                <td style ="width:5% ">${stt}</td>
                <td style ="width:10%">${item.name}</td>
                <td style ="width:10%">${formatDateCourse}</td>
                <td style ="width:10%">${item.course === 'string'?'':item.course}</td>
                <td style ="width:30%">${item.description === 'string'?'':item.description}</td>
                <td style ="width:20%">${formatDateCre}</td>
                <td style ="width:10%">
                    <div class="hover-container">
                        <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick ="showUpdateClassForm('${item.id}')" ></i>
                        <span class="tooltip">Sửa</span>
                    </div>
                    <div class="hover-container">
                        <i class="fa-solid fa-trash-can admin__delete--icon " data-id="${item.id}" onclick = "deleteInforClass('${item.id}')"></i>
                        <span class="tooltip">Xóa</span>
                    </div>
                    <div class="hover-container">
                </td>
                <!-- Thêm các cột khác tương tự -->
            `;
            stt++;
            tableBody__searchClass.appendChild(row);
        });     
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexManagerClass = i;
            fetchApiWithPageNumberManagerClass(pageIndexManagerClass);
        });
        paginationContainer.appendChild(button);
    }
    tableBody__searchClass.appendChild(paginationContainer);
}

function showUpdateClassForm(idItem){
    var updateClass = document.getElementById("update_class");
    var updateClassForm = document.getElementById("class_infor--update");
    var style = window.getComputedStyle(updateClass);
    var managementClass = document.getElementById("management_class");
    var buttonUpdate = document.getElementById("class_button_update");
    // update
    var newName = document.getElementById("name_class--update")
    var newCourse = document.getElementById("course_class--update");
    var newYearAdmission = document.getElementById("year_class--update");
    var newDesc = document.getElementById("desc_class--update");
    // display
    if(style.display === "none"){
        updateClass.style.display = "block";
        updateClassForm.style.display = "block"
        managementClass.style.display = "none";
    }
    // undisplay
    else{
        updateClassForm.style.display = "none";
        addClass.style.display = "none";
        managementClass.style.display = "none";
        updateClass.style.display = "none";
       
    }
    
    // fill data
    const getClassByIdUrl = `https://localhost:7013/api/Class/Id`;
    fetch(`${getClassByIdUrl}?id=${idItem}&pageIndex=${1}&pageSize=${1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
        },
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
        
        if(data.statusCode === 200) {
            // date to display
            const className = data.result[0].name;
            const classCourse = data.result[0].course;
            const classYearDisplay = new Date(data.result[0].year_Of_Admission);
            const dayUpdateDisPlay = classYearDisplay.getDate();
            const monthUpdateDisPlay = classYearDisplay.getMonth()+1;
            const yearUpdateDisPlay = classYearDisplay.getFullYear();
            const formatDateUpdateDisPlay = `${dayUpdateDisPlay} - ${monthUpdateDisPlay} - ${yearUpdateDisPlay}`;
            const classDesc = data.result[0].description;
            
            newName.value = className;
            newCourse.value = classCourse;
            newYearAdmission.value = formatDateUpdateDisPlay;
            newDesc.value = classDesc;
            
        }
        else {
            alert("Sửa không thành công");
        }
                    
        const token = localStorage.getItem("login");
        buttonUpdate.addEventListener("click", () => {
            updateDataClass(idItem, token);
            
        });
    
    })
    
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
}
// update data Class
function updateDataClass(id,token){
    // date to sent API
    //update data
    const newName = document.getElementById("name_class--update").value;
    const newCourse = document.getElementById("course_class--update").value || 'string';
    const newYearAdmission = document.getElementById("year_class--update").value;
    const newDesc = document.getElementById("desc_class--update").value || 'string';
    
    if(newName == "" ){
        alert("Vui lòng không để trống tên lớp học");
    }
    else if(newYearAdmission == ""){
        alert("Vui lòng không để trống năm học");
    }
  
    const parts = newYearAdmission.split('-').map(part => part.trim());
    let [day, month, year] = parts;
    // Bổ sung số 0 cho ngày và tháng 
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${new Date().toISOString().substring(11, 23)}Z`;

    const apiUrl = `https://localhost:7013/api/Class/Id?id=${id}&token=${token}`;
    fetch(apiUrl, {
    method: 'PUT', // Sử dụng phương thức PUT để cập nhật dữ liệu
    headers: {
        'Content-Type': 'application/json',
        // Các headers khác nếu cần thiết
    },
    
    body: JSON.stringify({ // Dữ liệu cập nhật
        nameClass: newName,
        year_Of_Admission: formattedDate,
        course: newCourse,
        descriptionClass: newDesc,
        
    }), 
    })
    .then((result) => {
        if (!result.ok) {
        throw new Error('Lỗi khi gọi API');
        }
        return result.json();
    })
    .then((resultData) => {
        if(resultData.statusCode === 200){
            alert("Sửa thành công");

        }
        else {
            alert("Sửa không thành công")
        }
    })
    .catch((error) => {
        alert(error); // Gọi hàm callback với lỗi (nếu có)
    });

}
function deleteInforClass(id){
    const confirmDelete = confirm("Xác nhận xóa ?");
    if(confirmDelete){
        const apiUrl = `https://localhost:7013/api/Class?id=${id}`;
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        .then((response) => {
            if (!response.ok) {
                alert('Xóa lớp học không thành công do đang được sử dụng');
                throw new Error('Lỗi khi gọi API');
                
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.statusCode === 200) {
                // Xóa lớp học thành công, bạn có thể thực hiện các hành động khác nếu cần
                alert('Lớp học đã được xóa thành công.');
            } else {
                // Xóa lớp học không thành công, xử lý lỗi nếu cần
                alert('Xóa lớp học không thành công do');
            }
        })
        
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
}
function showAddClassForm(){
    // display
    var addClass = document.getElementById("add_class");
    var addClassForm = document.getElementById("class_infor");
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClass = document.getElementById("update_class");
    var managementClass = document.getElementById("management_class");

    // button add


    if(addClass.style.display === "none"){
        addClass.style.display = "block";
        addClassForm.style.display = "block";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
    }
    else{
        addClassForm.style.display = "none";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
    }
   
}
function addDataForClass(){
    // new data
    const newName = document.getElementById("name_class--add").value;
    const newCourse = document.getElementById("course_class--add").value;
    const newYearAdmission = document.getElementById("year_class--add").value;
    const newDesc = document.getElementById("desc_class--add").value;
    
    if(newName === "" || newCourse === "" || newYearAdmission === ""){
        alert("Vui lòng điền đủ thông tin lớp học");
    }
    const parts = newYearAdmission.split('-').map(part => part.trim());
    let [day, month, year] = parts;
    // Bổ sung số 0 cho ngày và tháng 
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${new Date().toISOString().substring(11, 23)}Z`;

    const token = localStorage.getItem("login");
    const addClassUrl = `https://localhost:7013/api/Class?token=${token}`;
    
    fetch(addClassUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Các headers khác nếu cần thiết
        },
        body: JSON.stringify({
            nameClass: newName,
            year_Of_Admission: formattedDate,
            course: newCourse,
            descriptionClass: newDesc,
        }), // Dữ liệu lớp học mới
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Lỗi khi gọi API');
        }
        return response.json();
    })
    .then((responseData) => {
        if (responseData.statusCode === 200) {
            // Thêm lớp học thành công, bạn có thể thực hiện các hành động khác nếu cần
            alert('Lớp học đã được thêm thành công.');
        } else {
            // Thêm lớp học không thành công, xử lý lỗi nếu cần
            alert('Thêm lớp học không thành công.');
        }
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}  

// search class
let dataLoaded_searchClass = false;
let tableBody_searchClass = null; 
let pageIndexManagersearchClass = 1;
async function GetAllSearchDataClass(pageIndex) {
    const nameClassSearch = document.getElementById("seach_name_class").value;
    // Gọi API ban đầu với số trang pageIndex
    if(nameClassSearch === "") {
        if (!dataLoaded_searchClass) {
            await fetchApiWithPageNumberManagerClass(pageIndex);
            dataLoaded_searchClass = true;
        }
        else {
            await fetchApiWithPageNumberManagerClass(pageIndex);
        }
    }
    else {
        if (!dataLoaded__search) {
            await fetchApiWithPageNumberSearchClass(pageIndex, nameClassSearch);
            dataLoaded__search = true;
        }
        else {
            await fetchApiWithPageNumberSearchClass(pageIndex, nameClassSearch);
        }
    }
    
}
async function fetchApiWithPageNumberSearchClass(pageNumber, nameClassSearch) {
    try {
        
        const getClassSearchUrl = `https://localhost:7013/api/Class/Id?id=${nameClassSearch}&pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getClassSearchUrl);
        const data = await response.json();
        displayDataAndPaginationManagerClass(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// classRoom
function showInforClassRoom(){
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClassRoomForm = document.getElementById("classRoom_infor");
    var updateClassRoom = document.getElementById("update_classRoom");
    var style = window.getComputedStyle(managementClassRoom);
    var managementClass = document.getElementById("management_class");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var addClassRoom = document.getElementById("add_classRoom");
    var addClassRoomForm = document.getElementById("classRoom_infor--add");

    if(style.display === "none"){
        managementClassRoom.style.display = "block";
        updateClassRoomForm.style.display = "none";
        managementClass.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        updateClassRoom.style.display = "none";
        addClassRoom.style.display = "none"
        addClassRoomForm.style.display = "none";
    }
    else{
        updateClassRoomForm.style.display = "none";
        managementClassRoom.style.display = "none";
        managementClass.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        updateClassRoom.style.display = "none";
        addClassRoom.style.display = "none"
        addClassRoomForm.style.display = "none";
    }
}
let dataLoaded__searchClassRoom = false;
let tableBody__searchClassRoom = null; 
let pageIndexSearchClassRoom = 1;

async function GetAllManagerClassRoom(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchClassRoom) {
        await fetchApiWithPageNumberManagerClassRoom(pageIndex);
    }
    else {
        await fetchApiWithPageNumberManagerClassRoom(pageIndex);
    }
}

async function fetchApiWithPageNumberManagerClassRoom(pageNumber) {
    try {
        const getClassUrl = `https://localhost:7013/api/ClassRoom?pageIndex=${pageNumber}&pageSize=${5}`;
        const response = await fetch(getClassUrl);
        const data = await response.json();
       
        displayDataAndPaginationManagerClassRoom(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

function displayDataAndPaginationManagerClassRoom(data, currentPage) {

    const dataContainer = document.getElementById('classRoom_table_container');
    const showListClassRoom = document.getElementById('ClassRoomManager');
    //Hiển thị  
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    var managementClass = document.getElementById("management_class");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var ManagerDisplay = document.getElementById("dataContainer");
    var information = document.querySelector('.information')
    var element = document.getElementById("change__information");
    var AreaSchedule = document.getElementById("Schedule");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    var ManagerSubject = document.getElementById("dataContainer__subject");
    
    // đổi màu
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    // mặc định
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    var textColorManagerAccount = document.getElementById("managerAcount__Text");
    var iconColorManagerAccount = document.getElementById("managerAcount__Icon")
    var informationListText = document.getElementById("information__list");
    var informationListIcon = document.getElementById("information__list--items__icon");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    // thay đổi

    //
    var DataNull = document.getElementById("ClassRoomManager");
    if(tableClassRoom.style.display === "none"){
        managementClassRoom.style.display = "block";
        tableClassRoom.style.display = "block";
        managementClass.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        ManagerSubject.style.display = "none";
        // đổi màu
        textColorManagerClassRoom.style.color = "#31B1DB";
        iconColorManagerClassRoom.style.color = "#31B1DB";
        //mặc định
        textColorManagerClass.style.color ="#fff";
        iconDownClass.style.color ="#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color =  "#fff";
        informationListText.style.color =  "#fff";
        informationListIcon.style.color =  "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else{
        managementClassRoom.style.display = "block";
        tableClassRoom.style.display = "block";
        managementClass.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        ManagerSubject.style.display = "none";

        textColorManagerClassRoom.style.color = "#31B1DB";
        iconColorManagerClassRoom.style.color = "#31B1DB";
        textColorManagerClass.style.color ="#fff";
        iconDownClass.style.color ="#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color =  "#fff";
        informationListText.style.color =  "#fff";
        informationListIcon.style.color =  "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    // Đổ dữ liệu
    try {
        if (!Array.isArray(data.result) || data.result.length === 0) {
            DataNull.style.display = "block";
            showListClassRoom.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } 
        else 
        {    
            if (!tableBody__searchClassRoom) {
                DataNull.style.display = "none";
                const table = document.createElement('table');
                table.id = "search_table--managerClass"
                table.innerHTML = `
                    <thead id="ClassManager__search--table">
                        <tr>
                            <th>STT</th>
                            <th>Tên phòng học</th>
                            <th>Ngày tạo</th>
                            <th>Mô tả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                dataContainer.appendChild(table);
                tableBody__searchClassRoom = table.querySelector('tbody');
            }
        }  
        tableBody__searchClassRoom.innerHTML = '';
        var stt = 1;
        data.result.forEach(item => {
            const row = document.createElement('tr');
            const dateCre = new Date(item.createDate);
            const dayCre = dateCre.getDate();
            const monthCre = dateCre.getMonth()+1;
            const yearCre = dateCre.getFullYear();
            const formatDateCre = `${dayCre}-${monthCre}-${yearCre}`;
            // row.style.height = '60px';
            row.innerHTML = `
                <td style ="width:5% ">${stt}</td>
                <td style ="width:10%">${item.name}</td>
                <td style ="width:10%">${formatDateCre}</td>
                <td style ="width:30%">${item.description === 'string'?'':item.description}</td>
                <td style ="width:10%">
                    <div class="hover-container">
                        <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick ="showUpdateClassRoomForm('${item.id}')" ></i>
                        <span class="tooltip">Sửa</span>
                    </div>
                    <div class="hover-container">
                        <i class="fa-solid fa-trash-can admin__delete--icon " data-id="${item.id}" onclick = "deleteInforClassRoom('${item.id}')"></i>
                        <span class="tooltip">Xóa</span>
                    </div>
                    
                </td>
                <!-- Thêm các cột khác tương tự -->
            `;
            stt++;
            tableBody__searchClassRoom.appendChild(row);
        });     
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "60%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexManagerClass = i;
            fetchApiWithPageNumberManagerClassRoom(pageIndexManagerClass);
        });
        paginationContainer.appendChild(button);
    }
    tableBody__searchClassRoom.appendChild(paginationContainer);
}

function showUpdateClassRoomForm(idItem){
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClassRoom = document.getElementById("update_classRoom");
    var updateClassRoomForm = document.getElementById("classRoom_infor");
    var style = window.getComputedStyle(updateClassRoom);
    var managementClass = document.getElementById("management_class");
    var buttonUpdate = document.getElementById("classRoom_button_update");
    // update
    var newName = document.getElementById("name_classRoom--update")
    var newDesc = document.getElementById("desc_classRoom--update");
    // display
    if(style.display === "none"){
        managementClassRoom.style.display = "none";
        updateClassRoom.style.display = "block";
        updateClassRoomForm.style.display = "block";
        managementClass.style.display = "none";
    }
    // undisplay
    else{
        addClass.style.display = "none";
        updateClassRoomForm.style.display = "none";
        managementClassRoom.style.display = "none";
        managementClass.style.display = "none";
        updateClassRoom.style.display = "none";
       
    }
    
    // fill data
    const getClassRoomByIdUrl = `https://localhost:7013/api/ClassRoom/Id`;
    fetch(`${getClassRoomByIdUrl}?id=${idItem}&pageIndex=${1}&pageSize=${1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
        },
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
        
        if(data.statusCode === 200) {
            // date to display
            const classRoomName = data.result[0].name;
            const classRoomDesc = data.result[0].description;
            
            newName.value = classRoomName;
            newDesc.value = classRoomDesc;
            
        }
        else {
            alert("Sửa không thành công")
        }
                    
        const token = localStorage.getItem("login");
        buttonUpdate.addEventListener("click", () => {
            updateDataClassRoom(idItem, token);
            
        });
    
    })
    
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
}

// update data Class
function updateDataClassRoom(id,token){
    //update data
    const newName = document.getElementById("name_classRoom--update").value || 'string';
    const newDesc = document.getElementById("desc_classRoom--update").value || 'string';
    
    if(newName == ""){
        alert("Vui lòng không để trống tên phòng học");
    }
    const apiUrl = `https://localhost:7013/api/ClassRoom?idroom=${id}&token=${token}`;
    fetch(apiUrl, {
    method: 'PUT', // Sử dụng phương thức PUT để cập nhật dữ liệu
    headers: {
        'Content-Type': 'application/json',
        // Các headers khác nếu cần thiết
    },
    body: JSON.stringify({ // Dữ liệu cập nhật
        name: newName,
        description: newDesc,
    }), 
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error('Lỗi khi gọi API');
        }
        return response.json();
    })
    .then((responseData) => {
        if(responseData.statusCode === 200){
            alert("Sửa thành công");
            showInforClassRoom();
        }
        else {
            alert("Sửa không thành công")
        }
    })
    .catch((error) => {
        alert(error); // Gọi hàm callback với lỗi (nếu có)
    });

}

function deleteInforClassRoom(id){
    const confirmDelete = confirm("Xác nhận xóa ?");
    if(confirmDelete){
        const apiUrl = `https://localhost:7013/api/ClassRoom?id=${id}`;
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        .then((response) => {
            if (!response.ok) {
                alert('Xóa lớp học không thành công do đang được sử dụng');
                throw new Error('Lỗi khi gọi API');
                
            }
            return response.json();
        })
        .then((responseData) => {
            if (responseData.statusCode === 200) {
                // Xóa lớp học thành công, bạn có thể thực hiện các hành động khác nếu cần
                alert('Lớp học đã được xóa thành công.');
            } else {
                // Xóa lớp học không thành công, xử lý lỗi nếu cần
                alert('Xóa lớp học không thành công do');
            }
        })
        
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
}
function checkClickAddClassRoom(){
    
}
function showAddClassRoomForm(){
    // display
    var addClassRoom = document.getElementById("add_classRoom");
    var addClassRoomForm = document.getElementById("classRoom_infor--add");
    var style = window.getComputedStyle(addClassRoom);
    var managementClassRoom = document.getElementById("management_classRoom");
    var updateClass = document.getElementById("update_class");
    var managementClass = document.getElementById("management_class");
    // button add
    var buttonAdd = document.getElementById("add__classRoom--confirm");
    if(style.display === "none"){
        addClassRoom.style.display = "block";
        addClassRoomForm.style.display = "block";
        managementClass.style.display = "none";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
    }
    else{
        managementClass.style.display = "none";
        addClassRoomForm.style.display = "block";
        managementClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClassRoom.style.display = "none";
    }
  

}
function addDataForClassRoom(){
    // new data
    const newName = document.getElementById("name_classRoom--add").value;
    const newDesc = document.getElementById("desc_classRoom--add").value;
    
    const token = localStorage.getItem("login");
    const addClassRoomUrl = `https://localhost:7013/api/ClassRoom?token=${token}`;
    
    fetch(addClassRoomUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Các headers khác nếu cần thiết
        },
        body: JSON.stringify({
            name: newName,
            description: newDesc,
        }), // Dữ liệu lớp học mới
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Lỗi khi gọi API');
        }
        return response.json();
    })
    .then((responseData) => {
        if (responseData.statusCode === 200) {
            alert('Lớp học đã được thêm thành công.');
        } else {
            alert('Thêm lớp học không thành công.');
        }
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
} 

// search classRoom
let dataLoaded_searchClassRoom = false;
let tableBody_searchClassRoom = null; 
let pageIndexManagersearchClassRoom = 1;
async function GetAllSearchDataClassRoom(pageIndex) {
    const nameClassRoomSearch = document.getElementById("seach_name_classRoom").value;
    // Gọi API ban đầu với số trang pageIndex
    if(nameClassRoomSearch === "") {
        if (!dataLoaded_searchClassRoom) {
            await fetchApiWithPageNumberManagerClassRoom(pageIndex);
            dataLoaded_searchClassRoom = true;
        }
        else {
            await fetchApiWithPageNumberManagerClassRoom(pageIndex);
        }
    }
    else {
        if (!dataLoaded__search) {
            await fetchApiWithPageNumberSearchClassRoom(pageIndex, nameClassRoomSearch);
            dataLoaded__search = true;
        }
        else {
            await fetchApiWithPageNumberSearchClassRoom(pageIndex, nameClassRoomSearch);
        }
    }
    
}
async function fetchApiWithPageNumberSearchClassRoom(pageNumber, nameClassRoomSearch) {
    try {
        const getClassRoomSearchUrl = `https://localhost:7013/api/ClassRoom/Id?id=${nameClassRoomSearch}&pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getClassRoomSearchUrl);
        const data = await response.json();
        displayDataAndPaginationManagerClassRoom(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

//Get all schedules class
let dataLoaded__AllSchedules = false;
let tableBody__AllSchedules = null; 
let pageIndexAllSchedules = 1;

let dataLoaded__searchRegisted = false;
let tableBody__searchRegisted = null; 
let pageIndexSearchAccountRegisted = 1;
async function GetAllScheduleClass(pageIndex) {

    const search = document.getElementById("seach_name_Schedule").value;
    // Gọi API ban đầu với số trang pageIndex
    if(search === "") {
        if (!dataLoaded__AllSchedules) {
            await fetchApiWithPageNumberManagerScheduleClass(pageIndex);
            dataLoaded__AllSchedules = true;
        }
        else {
            await fetchApiWithPageNumberManagerScheduleClass(pageIndex);
        }
    }
    else {
        if (!dataLoaded__searchRegisted) {
            await fetchApiWithPageNumberManagerScheduleById(pageIndex, search);
            dataLoaded__searchRegisted = true;
        }
        else {
            await fetchApiWithPageNumberManagerScheduleById(pageIndex, search);
        }
    }
}


async function fetchApiWithPageNumberManagerScheduleById(pageNumber, search) {
    
    try {
        const response = await fetch(`https://localhost:7013/api/Lecture_ScheduleManager/Name?name=${search}&pageIndex=${pageNumber}&pageSize=${5}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
        });
        const data = await response.json();
        displayDataAndPaginationManagerScheduleClass(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

async function fetchApiWithPageNumberManagerScheduleClass(pageNumber) {
    
    try {
        const response = await fetch(`https://localhost:7013/api/Lecture_ScheduleManager?pageIndex=${pageNumber}&pageSize=${5}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
        });
        const data = await response.json();
        displayDataAndPaginationManagerScheduleClass(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

function displayDataAndPaginationManagerScheduleClass(data, currentPage) {
    const dataContainer = document.getElementById('Schedule_table_container');
    const showListClass = document.getElementById('ScheduleManager');
    // hiển thị
    var managementSchedule = document.getElementById("management_Schedule");
    var tableSchedule = document.getElementById("Schedule_table_container");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var ManagerDisplay = document.getElementById("dataContainer");
    
    var information = document.querySelector('.information')
    var element = document.getElementById("change__information");
    var AreaSchedule = document.getElementById("Schedule");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var element = document.getElementById("change__information");
    var information = document.querySelector('.information')
    var managementClass = document.getElementById("management_class");
    var tableClass = document.getElementById("class_table_container");
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");
    // // Đổi màu
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    // mặc định
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    var textColorManagerAccount = document.getElementById("managerAcount__Text");
    var iconColorManagerAccount = document.getElementById("managerAcount__Icon");
    var informationListText = document.getElementById("information__list");
    var informationListIcon = document.getElementById("information__list--items__icon");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    // //
    var DataNull = document.getElementById("ClassManager");
    if(tableSchedule.style.display === "none"){
        //Hiển thị 
        managementSchedule.style.display = "block";
        tableSchedule.style.display = "block";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        ManagerSubject.style.display = "none";
        
        // Đổi màu chữ
        textColorSchedule.style.color = "#31B1DB";//
        iconDownSchedule.style.color = "#31B1DB";//
        // mặc định
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    else{
        managementSchedule.style.display = "block";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        ManagerSubject.style.display = "none";

        textColorSchedule.style.color = "#31B1DB";//
        iconDownSchedule.style.color = "#31B1DB";//
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        textColorManagerClass.style.color = "#fff";
        iconDownClass.style.color = "#fff";
        subjectIcon.style.color = "#fff";
        subjectText.style.color = "#fff";
    }
    // // Đổ dữ liệu
    try {
        if (!Array.isArray(data.result) || data.result.length === 0) {
            DataNull.style.display = "block";
            showListClass.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } 
        else 
        {    
            if (!tableBody__AllSchedules) {
                DataNull.style.display = "none";
                const table = document.createElement('table');
                table.id = "search_table--managerSchedule"
                table.innerHTML = `
                    <thead id="ScheduleManager__search--table">
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Giảng viên</th>
                            <th>Lớp học</th>
                            <th>Phòng học</th>
                            <th>Môn học</th>
                            <th>Lịch học</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                dataContainer.appendChild(table);
                tableBody__AllSchedules = table.querySelector('tbody');
            }
        }  
        // tableBody__AllSchedules.innerHTML = '';
        var stt = 1;
        data.result.forEach(item => {
            const row = document.createElement('tr');
            // row.style.height = '60px';
            row.innerHTML = `
                <td style ="width:5% ">${stt}</td>
                <td style="width:10%">${item.course_Code === null || item.course_Code === '' ? '' : item.course_Code}</td>
                <td style="width:15%">${item.fullName === null || item.fullName === '' ? '' : item.fullName}</td>
                <td style="width:15%">${item.lopHoc === null || item.lopHoc === '' ? '' : item.lopHoc}</td>
                <td style ="width:15%">${item.phongHoc}</td>
                <td style ="width:20%">${item.monHoc}</td>
                <td style ="width:20%">${item.lichHocTongList}</td>
                <!-- Thêm các cột khác tương tự -->
            `;
            stt++;
            tableBody__AllSchedules.appendChild(row);
        });     
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexAllSchedules = i;
            fetchApiWithPageNumberManagerScheduleClass(pageIndexAllSchedules);
        });
        paginationContainer.appendChild(button);
    }
    tableBody__AllSchedules.appendChild(paginationContainer);
}

// check register schedules
let dataLoaded__RegisteredSchedule = false;
let tableBody__RegisteredSchedules = null; 
// let pageIndexAllSchedules = 1;
async function IsRegisteredSchedule(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__RegisteredSchedule) {
        await fetchApiWithPageNumberRegisteredScheduleClass(pageIndex);
        dataLoaded__RegisteredSchedule = true;
    }
    else {
        await fetchApiWithPageNumberRegisteredScheduleClass(pageIndex);
    }
}


async function fetchApiWithPageNumberRegisteredScheduleClass(pageNumber) {
    try {
        const response = await fetch(`https://localhost:7013/api/LectureSchedule/Registered_Calendar?pageIndex=${pageNumber}&pageSize=${5}&check=${1}&Name=${'string'}`, {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                },
            });
        const data = await response.json();
        RegisteredSchedule( pageNumber,data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
    
}
async function RegisteredSchedule( currentPage,data){

    const dataContainer = document.getElementById('Registered_Schedule_table_container');
    const showListClass = document.getElementById('ScheduleManager');

    // hiển thị
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var ManagerDisplay = document.getElementById("dataContainer");
    var information = document.querySelector('.information')
    var element = document.getElementById("change__information");
    var AreaSchedule = document.getElementById("Schedule");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var managementSchedule = document.getElementById("management_Schedule");
    var tableSchedule = document.getElementById("Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    
    // mặc định
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    var textColorManagerAccount = document.getElementById("managerAcount__Text");
    var iconColorManagerAccount = document.getElementById("managerAcount__Icon");
    var informationListText = document.getElementById("information__list");
    var informationListIcon = document.getElementById("information__list--items__icon");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");

    // //
    var DataNull = document.getElementById("ClassManager");
    if(tableScheduleRegister.style.display === "none"){
        //Hiển thị 
        managementScheduleRegister.style.display = "block";
        tableScheduleRegister.style.display = "block";
       
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        tableSchedule.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        // mặc định
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
    }
    else{
        managementScheduleRegister.style.display = "block";
        tableScheduleRegister.style.display = "block";
       
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        tableSchedule.style.display = "none";

  
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
    }
    // // Đổ dữ liệu
    try {
        if (!Array.isArray(data.result) || data.result.length === 0) {
            DataNull.style.display = "block";
            showListClass.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } 
        else 
        {    
            if (!tableBody__RegisteredSchedules) {
                DataNull.style.display = "none";
                const table = document.createElement('table');
                table.id = "search_table--managerSchedule"
                table.innerHTML = `
                    <thead id="ScheduleManager__search--table">
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Giảng viên</th>
                            <th>Lớp học</th>
                            <th>Phòng học</th>
                            <th>Môn học</th>
                            <th>Lịch học</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                dataContainer.appendChild(table);
                tableBody__RegisteredSchedules = table.querySelector('tbody');
            }
        }  
        tableBody__RegisteredSchedules.innerHTML = '';
        var stt = 1;
        data.result.forEach(item => {
            const row = document.createElement('tr');

                // row.style.height = '60px';
            row.innerHTML = `
                <td style ="width:5% ">${stt}</td>
                <td style="width:30%">${item.course_Code === null || item.course_Code === '' ? '' : item.course_Code}</td>
                <td style="width:5%">${item.fullName === null || item.fullName === '' ? '' : item.fullName}</td>
                <td style="width:5%">${item.lopHoc === null || item.lopHoc === '' ? '' : item.lopHoc}</td>
                <td style ="width:15%">${item.phongHoc}</td>
                <td style ="width:20%">${item.monHoc}</td>
                <td style ="width:20%">${item.lichHocTongList}</td>
                <!-- Thêm các cột khác tương tự -->
            `;
            stt++;
            tableBody__RegisteredSchedules.appendChild(row);  
        });     
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";
    
    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexAllSchedules = i;
            fetchApiWithPageNumberRegisteredScheduleClass(pageIndexAllSchedules);
        });
        paginationContainer.appendChild(button);
    }
    tableBody__RegisteredSchedules.appendChild(paginationContainer);
       
}
// check register schedules
let dataLoaded__UnRegisteredSchedule = false;
let tableBody__UnRegisteredSchedules = null; 
// let pageIndexAllSchedules = 1;
async function IsUnRegisteredSchedule(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex

    if (!dataLoaded__UnRegisteredSchedule) {
        await fetchApiWithPageNumberUnRegisteredScheduleClass(pageIndex);
        dataLoaded__UnRegisteredSchedule = true;
    }
    else {
        await fetchApiWithPageNumberUnRegisteredScheduleClass(pageIndex);
    }
}

async function fetchApiWithPageNumberUnRegisteredScheduleClass(pageNumber) {

    try {
        const response = await fetch(`https://localhost:7013/api/LectureSchedule/Registered_Calendar?pageIndex=${pageNumber}&pageSize=${5}&check=${0}&Name=${'string'}`, {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                },
            });
        const data = await response.json();
        UnRegisteredSchedule( pageNumber,data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
    
}
async function UnRegisteredSchedule( currentPage,data){
    const dataContainer = document.getElementById('UnRegister_Schedule_table_container');
    const showListClass = document.getElementById('ScheduleManager');
    // hiển thị
    var managementScheduleUnRegister = document.getElementById("management_Schedule");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    var updateClass = document.getElementById("update_class");
    var addClass = document.getElementById("add_class");
    var ManagerDisplay = document.getElementById("dataContainer");
    var information = document.querySelector('.information')
    var element = document.getElementById("change__information");
    var AreaSchedule = document.getElementById("Schedule");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    var tableSchedule = document.getElementById("Schedule_table_container");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");

    // mặc định
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");
    var textColorManagerAccount = document.getElementById("managerAcount__Text");
    var iconColorManagerAccount = document.getElementById("managerAcount__Icon");
    var informationListText = document.getElementById("information__list");
    var informationListIcon = document.getElementById("information__list--items__icon");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");

    // //
    var DataNull = document.getElementById("ClassManager");
    if(tableScheduleUnRegister.style.display === "none"){
        //Hiển thị 
        managementScheduleUnRegister.style.display = "block";
        tableScheduleUnRegister.style.display = "block";
        tableScheduleRegister.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";
        tableSchedule.style.display = "none";
        // mặc định
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
    }
    else{
        // display
        managementScheduleUnRegister.style.display = "block";
        tableScheduleUnRegister.style.display = "block";
        // Undisplay
        tableScheduleRegister.style.display = "none";
        updateClass.style.display = "none";
        addClass.style.display = "none";
        ManagerDisplay.style.display = "none";
        information.style.display = 'none';
        element.style.display = "none";
        AreaSchedule.style.display = "none";
        ChangeInformation.style.display = "none";
        ChangePassword.style.display = "none";

        tableSchedule.style.display = "none";

        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
        textColorManagerAccount.style.color = "#fff";
        iconColorManagerAccount.style.color = "#fff";
        informationListText.style.color = "#fff";
        informationListIcon.style.color = "#fff";
        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
    }
    // // Đổ dữ liệu
    try {
        if (!Array.isArray(data.result) || data.result.length === 0) {
            DataNull.style.display = "block";
            showListClass.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
        } 
        else 
        {    
            if (!tableBody__UnRegisteredSchedules) {
                DataNull.style.display = "none";
                const table = document.createElement('table');
                table.id = "search_table--UnRegisterSchedule"
                table.innerHTML = `
                    <thead id="ScheduleManager__search--table">
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Giảng viên</th>
                            <th>Lớp học</th>
                            <th>Phòng học</th>
                            <th>Môn học</th>
                            <th>Lịch học</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
                dataContainer.appendChild(table);
                tableBody__UnRegisteredSchedules = table.querySelector('tbody');
            }
        }  
        tableBody__UnRegisteredSchedules.innerHTML = '';
        var stt = 1;
        data.result.forEach(item => {
            const row = document.createElement('tr');

                // row.style.height = '60px';
            row.innerHTML = `
                <td style ="width:5% ">${stt}</td>
                <td style="width:5%">${item.course_Code === null || item.course_Code === '' ? '' : item.course_Code}</td>
                <td style="width:25%">${item.fullName === null || item.fullName === '' ? 'Chưa có giảng viên đăng ký' : item.fullName}</td>
                <td style="width:10%">${item.lopHoc === null || item.lopHoc === '' ? '' : item.lopHoc}</td>
                <td style ="width:15%">${item.phongHoc}</td>
                <td style ="width:20%">${item.monHoc}</td>
                <td style ="width:20%">${item.lichHocTongList}</td>
                <!-- Thêm các cột khác tương tự -->
            `;
            stt++;
            tableBody__UnRegisteredSchedules.appendChild(row);  
        });     
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";
    
    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexAllSchedules = i;
            fetchApiWithPageNumberUnRegisteredScheduleClass(pageIndexAllSchedules);
        });
        paginationContainer.appendChild(button);
    }
    tableBody__UnRegisteredSchedules.appendChild(paginationContainer);
       
}
//---------
// Khai báo biến
let dataLoaded__searchClassForSchedule = false;
let tableBody__searchClassForSchedule = null;
let pageIndexClassForSchedule = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumber(pageNumber) {
    try {
        const getAccountUrl = `https://localhost:7013/api/Class?pageIndex=${pageNumber}&pageSize=${5}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPagination(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPagination(data, currentPage) {
    const dataContainer = document.getElementById('table__class--schedule');
    const ShowListAccount = document.getElementById('accountManager__list--user');
    const DataNull = document.getElementById('accountManager__list--user');
    const tableClass = document.getElementById('select__class--item');
    const Schedule = document.getElementById('Schedule');//Schedule
    if(tableClass.style.display === "none") {
        tableClass.style.display = "block";
        // Schedule.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    else {
        tableClass.style.display = "block";
        // Schedule.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchClassForSchedule) {
        const table = document.createElement('table');
        table.id = "search_table--managerClassForSchedule";
        table.classList.add("striped-table");
        table.innerHTML = `
            <thead id="ClassManager__search--table">
                <tr>
                    <th>STT</th>
                    <th>Tên lớp</th>
                    <th>Năm học</th>
                    <th>Khóa học</th>
                    <th>Trạng thái</th>
                    <th>Mô tả</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__searchClassForSchedule = table.querySelector('tbody');
    }
    else {
        tableBody__searchClassForSchedule.innerHTML = ''; 
    }

    tableBody__searchClassForSchedule.innerHTML = '';
    let totalRecords = 1;
    var stt = 1;
    data.result.forEach(item => {
        const row = document.createElement('tr');
        const date = new Date(item.year_Of_Admission);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const ngayThangNam =  `${day}/${month}/${year}`;
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.name}</td>
            <td>${ngayThangNam}</td>
            <td>${item.course === "string" ? " " : item.course}</td>
            <td>${item.usedState === 0 ? 'Đang mở' : 'Tạm khóa' }</td>
            <td>${item.description === "string" ? " " : item.description}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="GetIdClass('${item.id}', this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody__searchClassForSchedule.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "60%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexClassForSchedule = i;
            fetchApiWithPageNumber(pageIndexClassForSchedule);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchClassForSchedule.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllClassForSchedule(pageIndex) {
    const tableClass = document.getElementById('select__class--item');
    const Schedule = document.getElementById('Schedule');
    const DataNull = document.getElementById('accountManager__list--user');

    // ... (các phần khác của code đã có)

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchClassForSchedule) {
        await fetchApiWithPageNumber(pageIndex);
        dataLoaded__searchClassForSchedule = true;
    }
    else {
        await fetchApiWithPageNumber(pageIndex);
    }
}

// Gọi hàm chính để khởi tạo
// GetAllClassForSchedule(pageIndexClassForSchedule);

// Lưu lại các Id của Class để dùng trong thuật toán sắp xếp lịch
let selectedClass = [];
function GetIdClass(itemId, button) {
    if (!selectedClass.includes(itemId)) {
        selectedClass.push(itemId);
        button.innerText = "Bỏ chọn";
    } else {
        selectedClass = selectedClass.filter(id => id !== itemId);
        button.innerText = "Chọn";
    }
}

function AddListIdClassOk() {
    const Save = document.getElementById("select__class--item");
    if(selectedClass.length === 0) {
        alert("Chưa có lớp học nào được thêm");
    }
    else {
        alert("Thêm thành công");
    }
    Save.style.display = "none";
}

function CloseSelectClass() {
    const Save = document.getElementById("select__class--item");
    selectedClass = [];
    Save.style.display = "none";
}


// Thêm phòng để cho thuật toán sắp lịch

// Khai báo biến
let dataLoaded__searchClassRoomForSchedule = false;
let tableBody__searchClassRoomForSchedule = null;
let pageIndexClassRoomForSchedule = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberClassRoom(pageNumber) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/ClassRoom?pageIndex=${pageNumber}&pageSize=${5}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationClassRoom(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationClassRoom(data, currentPage) {
    const dataContainer = document.getElementById('table__classroom--schedule');
    const ShowListAccount = document.getElementById('accountManager__list--user');
    const DataNull = document.getElementById('accountManager__list--user');
    const tableClass = document.getElementById('select__classroom--item');
    const Schedule = document.getElementById('Schedule');//Schedule
    if(tableClass.style.display === "none") {
        tableClass.style.display = "block";
    }
    else {
        tableClass.style.display = "block";
    }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchClassRoomForSchedule) {
        const table = document.createElement('table');
        table.id = "search_table--managerClassRoomForSchedule";
        table.classList.add("striped-table");
        table.innerHTML = `
            <thead id="ClassRoomManager__search--table">
                <tr>
                    <th>STT</th>
                    <th>Tên phòng</th>
                    <th>Mô tả</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__searchClassRoomForSchedule = table.querySelector('tbody');
    }
    else {
        tableBody__searchClassRoomForSchedule.innerHTML = ''; 
    }

    tableBody__searchClassRoomForSchedule.innerHTML = '';
    let totalRecords = 1;
    var stt = 1;
    data.result.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.name}</td>
            <td>${item.description === "string" ? " " : item.description}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="GetIdClassRoom('${item.id}', this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody__searchClassRoomForSchedule.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "60%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexClassRoomForSchedule = i;
            fetchApiWithPageNumberClassRoom(pageIndexClassRoomForSchedule);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchClassRoomForSchedule.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllClassRoomForSchedule(pageIndex) {
    const tableClass = document.getElementById('select__classroom--item');
    const Schedule = document.getElementById('Schedule');
    const DataNull = document.getElementById('accountManager__list--user');

    // ... (các phần khác của code đã có)

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchClassRoomForSchedule) {
        await fetchApiWithPageNumberClassRoom(pageIndex);
        dataLoaded__searchClassRoomForSchedule = true;
    }
    else {
        await fetchApiWithPageNumberClassRoom(pageIndex);
    }
}


// Lưu lại các Id của Class để dùng trong thuật toán sắp xếp lịch
let selectedClassRoom = [];
function GetIdClassRoom(itemId, button) {
    if (!selectedClassRoom.includes(itemId)) {
        selectedClassRoom.push(itemId);
        button.innerText = "Bỏ chọn";
    } else {
        selectedClassRoom = selectedClassRoom.filter(id => id !== itemId);
        button.innerText = "Chọn";
    }
}

function AddListIdClassRoomOk() {
    const Save = document.getElementById("select__classroom--item");
    if(selectedClassRoom.length === 0) {
        alert("Chưa có lớp học nào được thêm");
    }
    else {
        alert("Thêm thành công");
    }
    Save.style.display = "none";
}

function CloseSelectClassRoom() {
    const Save = document.getElementById("select__classroom--item");
    selectedClassRoom = [];
    Save.style.display = "none";
}



// Thêm List id Môn học để sử dụng cho sắp xếp lịch

// Khai báo biến
let dataLoaded__searchSubjectForSchedule = false;
let tableBody__searchSubjectForSchedule = null;
let pageIndexSubjectForSchedule = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberSubject(pageNumber) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/Subject?pageIndex=${pageNumber}&pageSize=${5}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationSubject(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationSubject(data, currentPage) {
    const dataContainer = document.getElementById('table__subject--schedule');
    const ShowListAccount = document.getElementById('accountManager__list--user');
    const DataNull = document.getElementById('accountManager__list--user');
    const tableClass = document.getElementById('select__subject--item');
    const Schedule = document.getElementById('Schedule');//Schedule
    if(tableClass.style.display === "none") {
        tableClass.style.display = "block";
    }
    else {
        tableClass.style.display = "block";
    }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchSubjectForSchedule) {
        const table = document.createElement('table');
        table.id = "search_table--managerSubjectForSchedule";
        table.classList.add("striped-table");
        table.innerHTML = `
            <thead id="SubjectManager__search--table">
                <tr>
                    <th>STT</th>
                    <th>Mã môn</th>
                    <th>Tên môn</th>
                    <th>Số tín chỉ</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__searchSubjectForSchedule = table.querySelector('tbody');
    }
    else {
        tableBody__searchSubjectForSchedule.innerHTML = ''; 
    }

    tableBody__searchSubjectForSchedule.innerHTML = '';
    let totalRecords = 1;
    var stt = 1;
    data.result.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_code === "null" ? " " : item.course_code}</td>
            <td>${item.name}</td>
            <td>${item.credits}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="GetIdSubject('${item.id}', this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody__searchSubjectForSchedule.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "60%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexSubjectForSchedule = i;
            fetchApiWithPageNumberSubject(pageIndexSubjectForSchedule);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchSubjectForSchedule.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllSubjectForSchedule(pageIndex) {
    const tableClass = document.getElementById('select__subject--item');
    const Schedule = document.getElementById('Schedule');
    const DataNull = document.getElementById('accountManager__list--user');

    // ... (các phần khác của code đã có)

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchSubjectForSchedule) {
        await fetchApiWithPageNumberSubject(pageIndex);
        dataLoaded__searchSubjectForSchedule = true;
    }
    else {
        await fetchApiWithPageNumberSubject(pageIndex);
    }
}

// Gọi hàm chính để khởi tạo
// GetAllClassForSchedule(pageIndexClassForSchedule);

// Lưu lại các Id của Class để dùng trong thuật toán sắp xếp lịch
let selectedSubject = [];
function GetIdSubject(itemId, button) {
    if (!selectedSubject.includes(itemId)) {
        selectedSubject.push(itemId);
        button.innerText = "Bỏ chọn";
        console.log(itemId);
    } else {
        selectedSubject = selectedSubject.filter(id => id !== itemId);
        button.innerText = "Chọn";
    }
}

function AddListIdSubjectOk() {
    const Save = document.getElementById("select__subject--item");
    if(selectedSubject.length === 0) {
        alert("Chưa có lớp học nào được thêm");
    }
    else {
        alert("Thêm thành công");
    }
    Save.style.display = "none";
}

function CloseSelectSubject() {
    const Save = document.getElementById("select__subject--item");
    selectedSubject = [];
    Save.style.display = "none";
}

// Call api thuật toán sắp xếp lịch

function Lecture_Schedule() {
    const changeInforUrl = "https://localhost:7013/api/Lecture_ScheduleManager/Scheduling";
    const dateStart = document.getElementById("startDate").value; 
    const dateEnd = document.getElementById("endDate").value; 
    if(selectedClass.length === 0 ) {
        alert("Bạn chưa chọn lớp học!");
    }
    else if(selectedClassRoom.length === 0) {
        alert("Bạn chưa chọn phòng học");
    }
    else if(selectedSubject.length === 0 ) {
        alert("Bạn chưa chọn môn học");
    }
    else if(dateStart === "") {
        alert("Bạn chưa chọn ngày bắt đầu")
    }
    else if(dateEnd === "") {
        alert("Bạn chưa chọn ngày kết thúc")
    }
    else {
        fetch(changeInforUrl, { 
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dateStart: dateStart + 'T03:31:35.895Z',
                dateEnd: dateEnd + 'T03:31:35.895Z',
                idclasses: selectedClass,
                idclassRooms: selectedClassRoom,
                idsubjects: selectedSubject,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }
            return response.json();
        })
        .then((data) => {
            alert(data.result);
            if(data.statusCode === 200) {
                GetAllNotUserForSchedule(1);
            }
            selectedClass = [];
            selectedClassRoom = [];
            selectedSubject = [];
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    
}


// Call api list lịch chưa đăng ký
// Khai báo biến
let dataLoaded__searchNotUserForSchedule = false;
let tableBody__searchNotUserForSchedule = null;
let pageIndexNotUserForSchedule = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberNotUser(pageNumber) {
    try {
        const getAccountUrl = `https://localhost:7013/api/LectureSchedule/Registered_Calendar?pageIndex=${pageNumber}&pageSize=${5}&check=${0}&Name=${'string'}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationNotUser(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationNotUser(data, currentPage) {
    const dataContainer = document.getElementById('schedule__body--allNotUser');
    const ShowListAccount = document.getElementById('accountManager__list--user');
    const DataNull = document.getElementById('accountManager__list--user');
    const tableClass = document.getElementById('select__subject--item');
    const Schedule = document.getElementById('Schedule');//Schedule
    // if(tableClass.style.display === "none") {
    //     tableClass.style.display = "block";
    // }
    // else {
    //     tableClass.style.display = "block";
    // }
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchNotUserForSchedule) {
        const table = document.createElement('table');
        table.id = "search_table--managerNotUserForSchedule";
        table.classList.add("striped-table");
        table.innerHTML = `
            <thead id="NotUserManager__search--table">
                <tr>
                    <th>STT</th>
                    <th>Mã môn</th>
                    <th>Tên giảng viên</th>
                    <th>Lớp học</th>
                    <th>Phòng học</th>
                    <th>Môn học</th>
                    <th>Lịch học</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__searchNotUserForSchedule = table.querySelector('tbody');
    }
    else {
        tableBody__searchNotUserForSchedule.innerHTML = ''; 
    }

    tableBody__searchNotUserForSchedule.innerHTML = '';
    let totalRecords = 1;
    var stt = 1;
    data.result.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_Code === "null" ? " " : item.course_Code}</td>
            <td>${item.fullName}</td>
            <td>${item.lopHoc}</td>
            <td>${item.phongHoc}</td>
            <td>${item.monHoc}</td>
            <td>${item.lichHocTongList}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="GetIdSubject('${item.id}', this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody__searchNotUserForSchedule.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "36%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;
        // addEventListener: Gắn 1 hàm xử lý sự kiện cho 1 phần tử
        button.addEventListener("click", () => {
            pageIndexNotUserForSchedule = i;
            fetchApiWithPageNumberNotUser(pageIndexNotUserForSchedule);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchNotUserForSchedule.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllNotUserForSchedule(pageIndex) {

    // ... (các phần khác của code đã có)

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded__searchNotUserForSchedule) {
        await fetchApiWithPageNumberNotUser(pageIndex);
        dataLoaded__searchNotUserForSchedule = true;
    }
    else {
        await fetchApiWithPageNumberNotUser(pageIndex);
    }
}

// Gọi hàm chính để khởi tạo
// GetAllClassForSchedule(pageIndexClassForSchedule);

// // Lưu lại các Id của Class để dùng trong thuật toán sắp xếp lịch
let selectedNotUser = [];
function GetIdNotUser(itemId, button) {
    if (!selectedNotUser.includes(itemId)) {
        selectedNotUser.push(itemId);
        button.innerText = "Bỏ chọn";
    } else {
        selectedNotUser = selectedNotUser.filter(id => id !== itemId);
        button.innerText = "Chọn";
    }
}

// Manager Subject
let dataLoadedSubject = false;
let tableBodySubject = null; 
let pageIndexManagerSubject = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberManagerSubject(pageNumber) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/Subject?pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerSubject(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationManagerSubject(data, currentPage) {
    const dataContainer = document.getElementById('table__Subject--full');//AccountManager__search--table

    // Hiển thị dữ liệu trong bảng
    if (!tableBodySubject) {
        const table = document.createElement('table');
        table.id = "table__managerSubject";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Số tín chỉ</th>
                <th>Thao tác</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBodySubject = table.querySelector('tbody');
    }
    else {
        tableBodySubject.innerHTML = ''; 
    }

    tableBodySubject.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateOfBirth);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_code}</td>
            <td>${item.name}</td>
            <td>${item.credits}</td>
            <td>
                <div class="hover-container">
                    <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick = "ShowChangeSubject('${item.id}','${item.course_code}','${item.name}','${item.credits}','${item.description}')"></i>
                    <span class="tooltip">Sửa</span>
                </div>
                <div class="hover-container">
                    <i class="fa-solid fa-trash-can admin__delete--icon" data-id="${item.id}" onclick = "AdminDeleteSubject('${item.id}')"></i>
                    <span class="tooltip">Xóa</span>
                </div>
            </td>
        `;
        stt++;
        tableBodySubject.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexManagerSubject = i;
            fetchApiWithPageNumberManagerSubject(pageIndexManagerSubject);
        });

        paginationContainer.appendChild(button);
    }

    tableBodySubject.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllManagerSubjectForSchedule(pageIndex) {

    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoadedSubject) {
        await fetchApiWithPageNumberManagerSubject(pageIndex);
        dataLoadedSubject = true;
    }
    else {
        await fetchApiWithPageNumberManagerSubject(pageIndex);
    }
}

// Search Account

let dataLoaded__searchSubject = false;
let tableBody__searchSubject = null; 
let pageIndexSearchAccountSubject = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberSearchSubject(pageNumber, userId) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/Subject/Id?Id=${userId}&pageIndex=${pageNumber}&pageSize=${10}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerSubject(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationSearchSubject(data, currentPage) {
    // lấy dữ liệu từ thẻ input
    const userId = document.getElementById("SubjectManager__search--name").value;
    //
    const dataContainer = document.getElementById('table__Subject--item');
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchSubject) {
        const table = document.createElement('table');
        table.id = "table__managerAccount";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã môn học</th>
                <th>Tên môn học</th>
                <th>Số tín chỉ</th>
                <th>Thao tác</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBodySubject = table.querySelector('tbody');
    }
    else {
        tableBodySubject.innerHTML = ''; 
    }

    tableBodySubject.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateOfBirth);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_code}</td>
            <td>${item.name}</td>
            <td>${item.credits}</td>
            <td>
                <div class="hover-container">
                    <i class="fa-solid fa-screwdriver-wrench admin__fix--icon" data-id="${item.id}" onclick = "ShowChangeInforUser('${item.id}')"></i>
                    <span class="tooltip">Sửa</span>
                </div>
                <div class="hover-container">
                    <i class="fa-solid fa-trash-can admin__delete--icon" data-id="${item.id}" onclick = "AdminDeleteSubject('${item.id}')"></i>
                    <span class="tooltip">Xóa</span>
                </div>
            </td>
        `;
        stt++;
        tableBody__searchSubject.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "50%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexSearchAccountSubject = i;
            fetchApiWithPageNumberSearchSubject(pageIndexSearchAccountSubject, userId);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchSubject.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllSearchSubjectForSchedule(pageIndex) {
    const userId = document.getElementById("SubjectManager__search--name").value;
    // Hiển thị
    var ManagerSubject = document.getElementById("dataContainer__subject");
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var icon = document.getElementById("information__list--items__icon");
    var ManagerDisplay = document.getElementById("dataContainer");
    var managementClass = document.getElementById("management_class");
    var tableClass = document.getElementById("class_table_container");
    var managementScheduleRegister = document.getElementById("management_Schedule");
    var tableScheduleRegister = document.getElementById("Registered_Schedule_table_container");
    var tableScheduleUnRegister = document.getElementById("UnRegister_Schedule_table_container");
    var managementClassRoom = document.getElementById("management_classRoom");
    var tableClassRoom = document.getElementById("classRoom_table_container");

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
    // Scheduling
    var AreaSchedule = document.getElementById("Schedule");
    var navbarSchedulingIcon = document.getElementById("scheduling");
    var navbarSchedulingText = document.getElementById("chedulingText");
    var textColorSchedule = document.getElementById("showSchedule_text");
    var iconDownSchedule = document.getElementById("showSchedule_icon");
    // class
    var textColorManagerClass = document.getElementById("manageClass_text");
    var iconDownClass = document.getElementById("manageClass_icon--down");
    // classRoom
    var textColorManagerClassRoom = document.getElementById("managerClassRoom__Text");
    var iconColorManagerClassRoom = document.getElementById("managerClassRoom__Icon");

    // Đổi màu
    var subjectIcon = document.getElementById("Subject__icon");
    var subjectText = document.getElementById("Subject__text");
    var ManagerAccIcon = document.getElementById("managerAcount__Icon");

    if(ManagerSubject.style.display === "none") {
        ManagerSubject.style.display = "block";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        // Đổi màu
        subjectIcon.style.color = "#33b5e5";
        subjectText.style.color = "#33b5e5";
        ChangeInformation.style.display = "none"
        ChangePassword.style.display = "none";
        AreaSchedule.style.display = "none";
        information.style.display = "none";
        ManagerDisplay.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        textColorManagerClass.style.color = "#fff" ;
        iconDownClass.style.color = "#fff" ;

        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";

        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        ManagerAccIcon.style.color = "#fff";
        textColorSchedule.style.color = "#fff";
        iconDownSchedule.style.color = "#fff";
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";
    }
    else {
        ManagerSubject.style.display = "block";
        managementClassRoom.style.display = "none";
        tableClassRoom.style.display = "none";
        managementClass.style.display = "none";
        tableClass.style.display = "none";
        // Đổi màu
        subjectIcon.style.color = "#33b5e5";
        subjectText.style.color = "#33b5e5";
        ChangeInformation.style.display = "none"
        ChangePassword.style.display = "none";
        AreaSchedule.style.display = "none";
        information.style.display = "none";
        ManagerDisplay.style.display = "none";
        managementScheduleRegister.style.display = "none";
        tableScheduleRegister.style.display = "none";
        tableScheduleUnRegister.style.display = "none";
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfro__Icon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePassword__Icon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";

        colorTextManagerAccount__Icon.style.color = "#fff" ;
        colorTextManagerAccount.style.color = "#fff";

        navbarSchedulingIcon.style.color = "#fff";
        navbarSchedulingText.style.color = "#fff";
        ManagerAccIcon.style.color = "#fff";
        textColorManagerClass.style.color = "#fff" ;
        iconDownClass.style.color = "#fff" ;
        textColorManagerClassRoom.style.color = "#fff";
        iconColorManagerClassRoom.style.color = "#fff";

    }
    
    // Gọi API ban đầu với số trang pageIndex
    if(userId === "" || userId === null || userId === undefined) {
        if (!dataLoaded) {
            await fetchApiWithPageNumberManagerSubject(pageIndex);
            dataLoaded = true;
        }
        else {
            await fetchApiWithPageNumberManagerSubject(pageIndex);
        }
    }
    else {
        if (!dataLoaded__searchSubject) {
            await fetchApiWithPageNumberSearchSubject(pageIndex, userId);
            dataLoaded__searchSubject = true;
        }
        else {
            await fetchApiWithPageNumberSearchSubject(pageIndex, userId);
        }
    }
    
}


// Change Subjects

function ShowChangeSubject( id ,CourseCode, name, credits, description) {
    const Course_Code = document.getElementById("Change_CourseCode--admin"); 
    const Name = document.getElementById("Change_Name--admin"); 
    const Credits = document.getElementById("Change_Credits--admin"); 
    const Description = document.getElementById("Change_Description--admin"); 
    const ShowAdminChangeUser = document.getElementById("Admin__change--subjects"); 
    if(ShowAdminChangeUser.style.display === "none") {
        ShowAdminChangeUser.style.display = "block";
    }
    else {
        ShowAdminChangeUser.style.display = "block";
    }
    // Send request to get infor user
    try {
        Course_Code.value = CourseCode;
        Name.value = name;
        Credits.value = credits;
        Description.value = description;
        localStorage.setItem("IdSubject", id);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Change subject
function AdminChangeSubject() {
    const changeInforUrl = "https://localhost:7013/api/Subject";
    const Course_Code = document.getElementById("Change_CourseCode--admin").value; 
    const Name = document.getElementById("Change_Name--admin").value; 
    const Credits = parseInt(document.getElementById("Change_Credits--admin").value); 
    const Description = document.getElementById("Change_Description--admin").value; 
    const ShowAdminChangeUser = document.getElementById("Admin__change--subjects");
    const id = localStorage.getItem("IdSubject");
    var today = new Date();
    // Lấy ngày, tháng và năm
    var dd = String(today.getDate()).padStart(2, '0'); // Ngày, có thêm số 0 nếu cần
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng, lưu ý tháng bắt đầu từ 0
    var yyyy = today.getFullYear(); // Năm

    // Xây dựng chuỗi với định dạng "yyyy-mm-dd"
    var formattedDate = yyyy + '-' + mm + '-' + dd;

      // Gửi request change infor user
    fetch(`${changeInforUrl}?id=${id}&token=${localStorage.getItem("login")}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
    },
    body: JSON.stringify({
        course_code: Course_Code,
        name: Name,
        credits: Credits,
        dateStart: formattedDate + "T14:13:09.140Z",
        dateEnd: formattedDate + "T14:13:09.140Z",
        description: Description,
    }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
        localStorage.removeItem("IdSubject");
        console.log(data);
        if(data.statusCode === 200) {
            alert("Sửa thành công");
            if(ShowAdminChangeUser.style.display === "block") ShowAdminChangeUser.style.display = "none";
            else ShowAdminChangeUser.style.display = "none";
            GetAllSearchSubjectForSchedule(1);
        }
        else {
            alert("Sửa không thành công")
        }
    
    })
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
}
// Delete subjects
function AdminDeleteSubject(id) {
    const changeInforUrl = "https://localhost:7013/api/Subject";
    if(window.confirm("Bạn có chắc muốn xóa không")) {
        fetch(`${changeInforUrl}?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
            },
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }
            return response.json();
            })
            .then((data) => {
                if(data.statusCode === 200) {
                    alert(data.result);
                    GetAllSearchSubjectForSchedule(1);
                }
                else {
                    alert("Sửa không thành công")
                }
            
            })
            .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    else {
        alert("Xóa thất bại");
    }
}

// Add Subject

function AdminAddSubject() {
    const changeInforUrl = "https://localhost:7013/api/Subject";
    const Course_Code = document.getElementById("add_CourseCode--admin").value; 
    const Name = document.getElementById("add_Name--admin").value; 
    const Credits = parseInt(document.getElementById("add_Credits--admin").value); 
    const Description = document.getElementById("add_Description--admin").value; 
    const ShowAdminChangeUser = document.getElementById("Admin__add--subjects");
    var today = new Date();
    // Lấy ngày, tháng và năm
    var dd = String(today.getDate()).padStart(2, '0'); // Ngày, có thêm số 0 nếu cần
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng, lưu ý tháng bắt đầu từ 0
    var yyyy = today.getFullYear(); // Năm

    // Xây dựng chuỗi với định dạng "yyyy-mm-dd"
    var formattedDate = yyyy + '-' + mm + '-' + dd;
      // Gửi request change infor user
    fetch(`${changeInforUrl}?token=${localStorage.getItem("login")}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // Đặt Content-Type tùy theo yêu cầu của API
    },
    body: JSON.stringify({
        course_code: Course_Code,
        name: Name,
        credits: Credits,
        dateStart: formattedDate + "T14:13:09.140Z",
        dateEnd: formattedDate + "T14:13:09.140Z",
        description: Description,
    }),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
    }
    return response.json();
    })
    .then((data) => {
        if(data.statusCode === 200) {
            alert("Thêm thành công");
            if(ShowAdminChangeUser.style.display === "block") ShowAdminChangeUser.style.display = "none";
            else ShowAdminChangeUser.style.display = "none";
        }
        else {
            alert("Thêm không thành công")
        }
    
    })
    .catch((error) => {
    // Xử lý lỗi
    console.error(error);
    });
}