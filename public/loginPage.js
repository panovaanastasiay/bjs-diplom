"use strict";

let userForm = new UserForm;

userForm.loginFormCallback = data => {
  console.log(data);
  ApiConnector.login(data, response => {
    console.log(response);
    if(response.success) {
      location.reload();
    };
    if(!response.success) {
        userForm.setLoginErrorMessage(response.error);
    }
  })
};

userForm.registerFormCallback = data => {
  console.log(data);
  ApiConnector.register(data, response => {
      console.log(response);
      if(response.success) {
        location.reload();
      };
      if(!response.success) {
          userForm.setRegisterErrorMessage(response.error);
      }
    })
};