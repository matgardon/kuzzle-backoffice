angular.module('kuzzle.storage')

  .controller('StorageBrowseCtrl', ['$scope', '$http', '$stateParams', '$state', '$filter', function ($scope, $http, $stateParams, $state, $filter) {

    $scope.collections = [];
    $scope.stateParams = $stateParams;

    $scope.init = function () {

      $http.get('/storage/listCollection')
        .then(function (response) {
          if (response.error) {
            console.error(response.message);
            return true;
          }

          if (response.data) {
            $scope.collections = response.data;
            setDefaultCollection();
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.$on('$stateChangeSuccess', function () {
      setDefaultCollection();
    });

    var setDefaultCollection = function () {
      if ($scope.collections.length === 0) {
        return false;
      }

      if (!$stateParams.collection || $scope.collections.indexOf($stateParams.collection) === -1) {
        console.log($stateParams.collection);
        $state.go('storage.browse.documents', {collection: $filter('orderBy')($scope.collections)[0]}, {reload: false, notify: true});
      }
    }

  }]);