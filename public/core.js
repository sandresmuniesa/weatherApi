var medicionesApp = angular.module('medicionesApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all mediciones and show them
    $http.get('/medition')
        .success(function(data) {
            $scope.mediciones = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createMedicion = function() {
        $http.post('/medition', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
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

    // delete a todo after checking it
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
