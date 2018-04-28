// angular.module('api_service', [])
//     // super simple service
//     // each function returns a promise object
//     .factory('api_manage', ['$rootScope', '$http', function ($rootScope, $http){
//     return {
//         getAllDepartment: function() {
//           return $http.post('/api/getAllDepartment');
//         },
//         getAllPosition: function() {
//           return $http.post('/api/getAllPosition');
//         },
//         getAllAcademicLevel: function() {
//           return $http.post('/api/getAllAcademicLevel');
//         },
//         newResearcher: function(data) {
//           return $http.post('/api/newResearcher/', data);
//         },
//
//         getpadgeadminedit : function (id) {
//                 return $http.get('https://ghb-npl2560.herokuapp.com/Q_manage_admin/' + id);
//             },
//         query_user_all : function () {
//             return $http.get('https://ghb-npl2560.herokuapp.com/query_user_all/');
//             },
//         delete_userbyname : function (id) {
//                 return $http.delete('https://ghb-npl2560.herokuapp.com/api/user/' + id);
//             },
//         getforread : function (id) {
//             return $http.get('https://ghb-npl2560.herokuapp.com/api/view/' + id);
//         },
//         createbyuser : function (data) {
//             return $http.post('https://ghb-npl2560.herokuapp.com/api/Q_manage', data);
//         },
//         create : function (data) {
//             return $http.post('https://ghb-npl2560.herokuapp.com/api/Q_manage_admin', data);
//         },
//         delete : function (id) {
//             return $http.delete('https://ghb-npl2560.herokuapp.com/api/Q_manage/' + id);
//         },
//         update : function (data) {
//             return $http.put('https://ghb-npl2560.herokuapp.com/api/Q_manage/' + data.Qid, data );
//             },
//         singup_user : function (data) {
//                 return $http.post('/signup_user', data);
//         }
//     }
// }])
