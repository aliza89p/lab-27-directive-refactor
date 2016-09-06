'use strict';

module.exports = (app) => {
  app.controller('ListController', ['$log', '$http', ListController]);
};

function ListController($log, $http) {

  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.lists = [];
  this.getAllLists = function() {
    $http.get(baseUrl, config)
      .then(res => {
        $log.log('Success: ', res.data);
        this.lists = res.data;
      }, err => {
        $log.error('Error: ', err);
      });
  };

  this.destroyList = function(list) {
    $log.debug('listCtrl.destroyList');
    $http.delete(baseUrl + '/' + list._id, config)
      .then(res => {
        $log.log('Success: ', res.data);
        this.lists.splice(this.lists.indexOf(list), 1);
      }, err => {
        $log.error('Error: ', err);
      });
  };

  this.updateList = function(list) {
    $http.put(baseUrl + '/' + list._id, list, config)
      .then(res => {
        $log.log('Success: ', res.data);
        list.editing = false;
      }, err => {
        $log.error('Error: ', err);
      });
  };

  this.createList = function(list){
    $http.post(baseUrl, list, config)
      .then(res => {
        $log.log('Success: ', res.data);
        this.lists.push(res.data);
        $log.log('this.lists: ', this.lists);
      })
      .catch(err => {
        $log.log('Error: ', err);
      });
  };

  this.createItem = function(item){
    $http.post(baseUrl, item, config)
      .then(res => {
        $log.log('Success: ', res.data);
        this.lists.push(res.data);
        $log.log('this.lists.notes: ', this.lists.notes);
      })
      .catch(err => {
        $log.log('Error: ', err);
      });
  };

}
