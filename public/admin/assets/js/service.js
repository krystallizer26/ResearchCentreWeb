angular.module('api_service', [])

    // super simple service
    // each function returns a promise object 
    .factory('api_manage', ['$rootScope', '$http', function ($rootScope, $http){
    return {
        get_catagory : function () {
            return $http.get('/api/getResourceType/');
        },
        create_catagory : function (data) {
            return $http.post('/api/newResourceType',data);
            },
            update_catagory : function (data) {
                return $http.post('/api/editResourceType',data);
                },
                delete_catagory : function (data) {
                    return $http.post('/api/deleteResourceType',data);
                    },


                    get_department : function () {
                        return $http.get('/api/getDepartmentsAll/');
                    },

                                get_tag : function () {
                                    return $http.get('/api/getTag/');
                                },
                                create_tag : function (data) {
                                    return $http.post('/api/newTag/',data);
                                    },
                                    update_tag : function (data) {
                                        return $http.post('/api/editTag/',data);
                                        },
                                        delete_tag : function (data) {
                                            return $http.post('/api/deleteTag/',data);
                                            },

                                          
                                            get_img_news : function (data) {
                                                return $http.get('/api/getPictureFromNewsId/'+data);
                                            },
                                                        get_news : function (data) {
                                                            return $http.post('/api/getNews/',data);
                                                        },
                                                        get_news_fromID : function (data) {
                                                            return $http.post('/api/getNewsfromID/',data);
                                                        }, 
                                                        update_news : function (data) {
                                                            return $http.post('/api/editNews/',data);
                                                        },
                                                        delete_news : function (data) {
                                                            return $http.post('/api/deleteNews/',data);
                                                        },
                                                        create_news : function (data) {
                                                            return $http.post('/api/newNews/',data);
                                                        },
                                                        
                                                                                                       
                                                        
                                                        
        getpadgeadminedit : function (id) {
                return $http.get('https://ghb-npl2560.herokuapp.com/Q_manage_admin/' + id);
            },
        query_user_all : function () {
            return $http.get('https://ghb-npl2560.herokuapp.com/query_user_all/');
            },
        delete_userbyname : function (id) {
                return $http.delete('https://ghb-npl2560.herokuapp.com/api/user/' + id);
            },
        getforread : function (id) {
            return $http.get('https://ghb-npl2560.herokuapp.com/api/view/' + id);
        },
        createbyuser : function (data) {
            return $http.post('https://ghb-npl2560.herokuapp.com/api/Q_manage', data);
        },
        create : function (data) {
            return $http.post('https://ghb-npl2560.herokuapp.com/api/Q_manage_admin', data);
        },
        delete : function (id) {
            return $http.delete('https://ghb-npl2560.herokuapp.com/api/Q_manage/' + id);
        },
        update : function (data) {
            //console.log(data.Qid);
           // console.log(data);
            return $http.put('https://ghb-npl2560.herokuapp.com/api/Q_manage/' + data.Qid, data );
            },
      singup_user : function (data) {
                //console.log(data.Qid);
                // console.log(data);
                return $http.post('/signup_user', data);
            }
    }
    


    }])
.service("uploadService", function($http, $q) {
    
    return ({
        upload: upload
    });
    
    function upload(file) {
        var upl = $http({
            method: 'POST',
            // url: 'http://jsonplaceholder.typicode.com/posts', // /api/upload
            url: 'https://ghb-npl2560.herokuapp.com/api/Q_manage',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                upload: file
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                
                var headers = headersGetter();
                delete headers['Content-Type'];
                
                return formData;
            }
        });
        return upl.then(handleSuccess, handleError);

    } // End upload function
    
    // ---
    // PRIVATE METHODS.
    // ---
    
    function handleError(response, data) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }
        
        return ($q.reject(response.data.message));
    }
    
    function handleSuccess(response) {
        return (response);
    }

})
.directive("fileinput", [function() {
    return {
        scope: {
            fileinput: "=",
            filepreview: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.fileinput = changeEvent.target.files[0];
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.filepreview = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(scope.fileinput);
            });
        }
    }
}]);