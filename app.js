angular.module('asteriskApp', []);

angular.module('asteriskApp').filter('cellFilter', ['$filter', function ($filter) {
  return function (input) {
    if (input === '#') {
      return 'border';
    } else if (input === '0') {
      return 'eater';
    } else if (input === '*') {
      return 'asterisk';
    }
  };
}]);

angular.module('asteriskApp').controller('AsteriskController', ['$scope', '$document', function ($scope, $document) {

  $scope.board = [];
  var size = 15;

  for (var i = 0; i < size; i++) {
    $scope.board[i] = [];
    for (var j = 0; j < size; j++) {

      if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
        $scope.board[i][j] = '#';
      } else {
        $scope.board[i][j] = ' ';
      }

    }
  }

  for (var k = 0; k < 10; k++) {
    var rndX = Math.floor(Math.random() * (size-2)) + 1;
    var rndY = Math.floor(Math.random() * (size-2)) + 1;
    $scope.board[rndX][rndY] = '*';
  }

  $scope.pos = {
    'x': 1,
    'y': 1
  };

  $scope.board[$scope.pos.x][$scope.pos.y] = '0';

  $document.bind('keypress', function (event) {

    $scope.$apply(function () {

      var x = $scope.pos.x;
      var y = $scope.pos.y;

      if (event.key === 'ArrowDown') {

        if ($scope.board[x + 1][y] != '#') {
          $scope.board[x + 1][y] = '0';
          $scope.board[x][y] = ' ';
          $scope.pos.x++;
        }

      } else if (event.key === 'ArrowUp') {

        if ($scope.board[x - 1][y] != '#') {
          $scope.board[x - 1][y] = '0';
          $scope.board[x][y] = ' ';
          $scope.pos.x--;
        }

      } else if (event.key === 'ArrowRight') {

        if ($scope.board[x][y + 1] != '#') {
          $scope.board[x][y + 1] = '0';
          $scope.board[x][y] = ' ';
          $scope.pos.y++;
        }

      } else if (event.key === 'ArrowLeft') {

        if ($scope.board[x][y - 1] != '#') {
          $scope.board[x][y - 1] = '0';
          $scope.board[x][y] = ' ';
          $scope.pos.y--;
        }
      }
    });
  });

}]);
