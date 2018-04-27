'use strict';
var app = angular.module('app', ['ui.router']);


angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: "./general_2/research_assets/partail/home.html",
      controller: 'homeCtrl'
    })

    .state('paperDetail', {
      url: '/paperDetail',
      templateUrl: "./general_2/research_assets/partail/paperDetail.html",
      controller: 'paperDetailCtrl'
    })

    .state('bookDetail', {
      url: '/bookDetail',
      templateUrl: "./general_2/research_assets/partail/bookDetail.html",
      controller: 'bookDetailCtrl'
    })

    .state('copyrightDetail', {
      url: '/copyrightDetail',
      templateUrl: "./general_2/research_assets/partail/copyrightDetail.html",
      controller: 'copyrightDetailCtrl'
    })

    .state('profileDetail', {
      url: '/profileDetail',
      templateUrl: "./general_2/research_assets/partail/profile.html",
      controller: 'profileDetailCtrl'
    })
    .state('profileDetail.general', {
      url: '/profileDetail/general',
      templateUrl: "./general_2/research_assets/partail/profile_general.html",
      controller: 'profileDetailGeneralCtrl'
    })
    .state('profileDetail.research', {
      url: '/profileDetail/research',
      templateUrl: "./general_2/research_assets/partail/profile_research.html",
      controller: 'profileDetailResearchCtrl'
    })
    .state('profileDetail.copyright', {
      url: '/profileDetail/copyright',
      templateUrl: "./general_2/research_assets/partail/profile_copyright.html",
      controller: 'profileDetailCopyrightCtrl'
    })
    .state('profileDetail.award', {
      url: '/profileDetail/award',
      templateUrl: "./general_2/research_assets/partail/profile_award.html",
      controller: 'profileDetailAwardCtrl'
    })
    .state('profileDetail.thesistitle', {
      url: '/profileDetail/thesistitle',
      templateUrl: "./general_2/research_assets/partail/profile_thesistitle.html",
      controller: 'profileDetailThesistitleCtrl'
    })

});


angular.module('app')
  // super simple service
  // each function returns a promise object
  .factory('global_service', ['$rootScope', '$http', function($rootScope, $http) {
    var buf_id;
    return {
      get_news_id: function() {
        return buf_id;
      },
      set_news_id: function(id) {
        buf_id = id;
        alert(buf_id)
      }
    }
  }]);



app.controller('homeCtrl', function($scope, $http,$state) {
 console.log("homeCtrl start");
 //$state.go('profileDetail');
 //console.log("paperDetail paperDetail");
});
app.controller('paperDetailCtrl', function($scope, $http) {
  console.log("paperDetailCtrl start");
});
app.controller('bookDetailCtrl', function($scope, $http) {
  console.log("bookDetailCtrl start");
});
app.controller('copyrightDetailCtrl', function($scope, $http) {
  console.log("copyrightDetailCtrl start");
});


app.controller('profileDetailCtrl', function($scope, $http) {
  console.log("profileDetailCtrl start");
});
app.controller('profileDetailGeneralCtrl', function($scope, $http) {
  console.log("profileDetailGeneralCtrl start");
});
app.controller('profileDetailResearchCtrl', function($scope, $http) {
  console.log("profileDetailResearchCtrl start");
});
app.controller('profileDetailCopyrightCtrl', function($scope, $http) {
  console.log("profileDetailCopyrightCtrl start");
});
app.controller('profileDetailAwardCtrl', function($scope, $http) {
  console.log("profileDetailAwardCtrl start");
});
app.controller('profileDetailThesistitleCtrl', function($scope, $http) {
  console.log("profileDetailThesistitleCtrl start");
});
