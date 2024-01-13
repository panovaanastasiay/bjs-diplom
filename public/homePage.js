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
    return ProfileWidget.showProfile(response.data);
  }
});

let rateBoard = new RatesBoard;

function getStocks() {
  ApiConnector.getStocks(response => {
    if(response.success) {
      rateBoard.clearTable;
      rateBoard.fillTable(response.data);
    }
  });
};

setInterval(getStocks, 60000);


let moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Денежная сумма добавлена');
    }
    if(!response.success) {
      moneyManager.setMessage(false, response.error);
    }
  })
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация выполнена');
      }
    if(!response.success) {
      moneyManager.setMessage(false, response.error);
      }
  })
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод выполнен');
      }
    if(!response.success) {
      moneyManager.setMessage(false, response.error);
      }
  })
};
  
let favoriteWidget = new FavoritesWidget;


  ApiConnector.getFavorites(response => {
    if(response.success) {
      favoriteWidget.clearTable();
      favoriteWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });

  favoriteWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
      if(response.success) {
        favoriteWidget.clearTable();
        favoriteWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoriteWidget.setMessage(true, 'Пользователь добавлен');
      }
      if(!response.success) {
        favoriteWidget.setMessage(false, response.error);
      }
    })
  };


  favoriteWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
      if(response.success) {
        favoriteWidget.clearTable();
        favoriteWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoriteWidget.setMessage(true, 'Пользователь удален');
      }
      if(!response.success) {
        favoriteWidget.setMessage(false, response.error);
      }
    })
  };

