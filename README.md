# angular-pagination-plugin
Server side pagination plugin for angular js

Inside your controller inject $pagination and use it as below

```
$pagination.init({
    model : 'User',
    data : 'users',
    action: 'index',
    items: $scope.users,
    count: users.data.pagination.User.count,
    pageCount: users.data.pagination.User.pageCount,
    itemsPerPage : users.data.pagination.User.limit
});

$scope.pagination = $pagination;

$scope.pageChanged = function() {
    $scope.pagination.nextPage($scope.search);
};

$scope.searchData = function(){
    $scope.pagination.searchData($scope.search);
};
```
