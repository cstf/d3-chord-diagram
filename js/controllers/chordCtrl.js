 'use strict';


    app.controller('chordCtrl', chordCtrl);

    function chordCtrl($scope,$timeout) {
    	$scope.data = [
    		{'has':'black','prefer':'red','count':20},
			{'has':'red','prefer':'black','count':55},
			{'has':'blond','prefer':'red','count':0},
			{'has':'red','prefer':'blond','count':50},
			{'has':'brown','prefer':'red','count':100},
			{'has':'red','prefer':'brown','count':13},
			{'has':'black','prefer':'brown','count':80},
			{'has':'brown','prefer':'black','count':100},
			{'has':'blond','prefer':'black','count':70},
			{'has':'black','prefer':'blond','count':110},
			{'has':'black','prefer':'black','count':90},
			{'has':'brown','prefer':'brown','count':100},
			{'has':'brown','prefer':'blond','count':200},
			{'has':'blond','prefer':'brown','count':50},
			{'has':'blond','prefer':'blond','count':30},
			{'has':'red','prefer':'red','count':2}];


    }