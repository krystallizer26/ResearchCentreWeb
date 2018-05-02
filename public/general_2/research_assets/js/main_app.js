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
       abstract: true,
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
    .state('profileDetail.researchGrants', {
      url: '/profileDetail/researchgrants',
      templateUrl: "./general_2/research_assets/partail/research_grants.html",
      controller: 'profileDetailresearchGrantsCtrl'
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

  app.run(function($state, $rootScope){
     $rootScope.$state = $state;
  })
