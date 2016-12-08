(function() {
'use strict';

  angular
    .module('app.product')
    .controller('ProductController', ProductController)
    .controller('CategoriesController', CategoriesController)
    .controller('ItemsController', ItemsController);

  ProductController.$inject = ['$scope', 'Product'];
  function ProductController($scope, Product) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() { }
  }

  CategoriesController.$inject = ['$scope', 'Category', '$ionicModal'];
  function CategoriesController($scope, Category, $ionicModal) {
    var vm = this;
    vm.categories;

    getCategories();

    $ionicModal.fromTemplateUrl('product/templates/new-category-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.newCategoryModal = modal;
    });

    $scope.saveCategory = function(category) {
      var cat = {
        "_id":"categories_" + category,
        "type":"categories",
        "title":category,
        "items":0
      };

      Category.add(cat);
      getCategories();
      $scope.newCategoryModal.hide();
    }

    function getCategories() {
      Category.get().then(function(data) {
        vm.categories = data;
      });
    }
  }

  ItemsController.$inject = ['$scope', 'Items', '$ionicModal', 'Category'];
  function ItemsController($scope, Items, $ionicModal, Category) {
    var vm = this;
    $scope.item = {};

    getItems();

    // prep modal windows
    $ionicModal.fromTemplateUrl('product/templates/new-item-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.newItemModal = modal;
    });

    $ionicModal.fromTemplateUrl('select-category.html', {
      scope:$scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      // get categories
      Category.get().then(function(data) {
        vm.categories = data;
      });

      $scope.selectCategoryModal = modal;
    });

    // save new item
    $scope.saveItem = function() {
      var item = $scope.item;

      var newItem = {
        "_id":"items_"+item.category._id+"_"+item.description,
        "category_id":item.category._id,
        "description":item.description,
        "image":item.image,
        "sale_price":item.sale_price
      };

      // save
      Items.add(newItem);
      // close modal
      $scope.newItemModal.hide();
      // refresh item list
      getItems();
    }

    function getItems() {
      Items.get().then(function(data) {
        vm.items = data;
        console.log(data);
      });
    }
    
  }
})();