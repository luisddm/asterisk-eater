(function() {

  'use strict';

  angular
    .module('asteriskApp', []);

  angular
    .module('asteriskApp')
    .filter('cellFilter', [
      function() {
        return function(input) {
          if (input === '#') {
            return 'border';
          } else if (input === '0') {
            return 'eater';
          } else if (input === '*') {
            return 'asterisk';
          }
        };
      },
    ]);

  angular
    .module('asteriskApp')
    .controller('AsteriskController', [
      '$scope',
      '$document',
      function($scope, $document) {

        var vm = this;

        vm.keyup = function(keyEvent) {
          console.log('keyup', keyEvent);
        };

        vm.board = [];

        var size = 15;

        for (var i = 0; i < size; i++) {
          vm.board[i] = [];
          for (var j = 0; j < size; j++) {

            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
              vm.board[i][j] = '#';
            } else {
              vm.board[i][j] = ' ';
            }

          }
        }

        for (var k = 0; k < 10; k++) {
          var rndX = Math.floor(Math.random() * (size - 2)) + 1;
          var rndY = Math.floor(Math.random() * (size - 2)) + 1;
          vm.board[rndX][rndY] = '*';
        }

        vm.pos = {
          x: 1,
          y: 1,
          setX: function(x) {
            this.x = x;
          },
          setY: function(y) {
            this.y = y;
          }
        };

        vm.board[vm.pos.x][vm.pos.y] = '0';

        $document.on('keydown', function(event) {

          $scope.$apply(function() {

            var x = vm.pos.x;
            var y = vm.pos.y;

            if (event.keyCode === 37) {
              // Left
              if (vm.board[x][y - 1] !== '#') {
                vm.board[x][y - 1] = '0';
                vm.board[x][y] = ' ';
                vm.pos.y--;
              }
            } else if (event.keyCode === 38) {
              // Up
              if (vm.board[x - 1][y] !== '#') {
                vm.board[x - 1][y] = '0';
                vm.board[x][y] = ' ';
                vm.pos.x--;
              }
            } else if (event.keyCode === 39) {
              // Right
              if (vm.board[x][y + 1] !== '#') {
                vm.board[x][y + 1] = '0';
                vm.board[x][y] = ' ';
                vm.pos.y++;
              }
            } else if (event.keyCode === 40) {
              // Down
              if (vm.board[x + 1][y] !== '#') {
                vm.board[x + 1][y] = '0';
                vm.board[x][y] = ' ';
                vm.pos.x++;
              }
            }
          });
        });

      }
    ]);

})();
