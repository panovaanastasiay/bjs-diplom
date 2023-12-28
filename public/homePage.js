'use strict';

let logoutButton = new LogoutButton;

logoutButton.action = () => {
  ApiConnector.logout(response => {
    if(response.success) {
      location.reload();
    };
  });
};
 
ApiConnector.current(response => {
  if(response.success) {
    return ProfileWidget.showProfile(response);
  }
})
  

