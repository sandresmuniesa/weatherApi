var medicionesApp = angular.module('medicionesApp', ['chart.js']);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/medition/last')
      .success(function(data) {
          $scope.last = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
    });
    var hora = new Date().getTime();
    $http.get('/medition/max/'+hora)
      .success(function(data) {
          $scope.max = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
    });

    $http.get('/medition/min/'+hora)
      .success(function(data) {
          $scope.min = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
    });

    /*$http.get('/medition')
        .success(function(data) {
            $scope.mediciones = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });*/

    $scope.createMedicion = function() {
        $http.post('/medition', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                console.log(data);
                $http.get('/medition')
                    .success(function(data) {
                        $scope.mediciones = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteMedicion = function(id) {
        $http.delete('/medition/' + id)
            .success(function(data) {
                console.log(data);
                $http.get('/medition')
                    .success(function(data) {
                        $scope.mediciones = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
