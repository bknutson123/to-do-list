angular.module('task', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.tasks = [];

            $scope.getAll = function() {
                console.log("in get all function")
                return $http.get('/tasks').success(function(data) {
                    angular.copy(data, $scope.tasks);
                });
            };
            $scope.getAll();
            $scope.addTask = function() {
                console.log("in add task function")
                var newtask = { name: $scope.name, task: $scope.task };
                $http.post('/tasks', newtask).success(function(data) {
                    console.log(data)
                    $scope.tasks.push(data);
                });
                $scope.getAll()
            };
            $scope.delete = function() {
                console.log("in delete function")
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].checked) {
                        $http.delete('/tasks/' + $scope.tasks[i]._id)
                            .success(function(data) {
                                console.log("delete worked");
                            });
                    }
                }
                $scope.getAll();
            };
            $scope.checked = function(task) {
                console.log("being checked")
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i] == task) {
                        if ($scope.tasks.checked) {
                            $scope.tasks[i].checked = false;
                        }
                        else {
                            $scope.tasks[i].checked = true;
                        }
                    }

                }
            }
        }
    ]);
