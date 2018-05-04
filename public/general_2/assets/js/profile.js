angular.module('app', ['ngRoute',"ngTable",'connect_socket'])

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('app').config(function($routeProvider) {
    $routeProvider
  
        .when("/top_up", {
            templateUrl : "/partial-superuser/top_up.html"
        })
        .when("/ip_monitor", {
            templateUrl : "/partial-superuser/ip_monitor.html"
        })
        .when("/bonus", {
            templateUrl : "/partial-superuser/bonus.html"
        })
        .when("/withdraw", {
            templateUrl : "/partial-superuser/withdraw.html"
        })
        .when("/history_action_to_sbobet", {
            templateUrl : "/partial-superuser/history_action_to_sbobet.html"
        })
        .when("/agent_management", {
            templateUrl : "/partial-superuser/agent_management.html"
        })
        
        .when("/add_account", {
            templateUrl : "/partial-superuser/add_account.html"
        })
        
        .when("/bind_agent", {
            templateUrl : "/partial-superuser/bind_agent.html"
        })
        
        .when("/agentFinanceReport", {
            templateUrl : "/partial-superuser/agentFinanceReport.html"
        })
        .when("/stat", {
            templateUrl : "/partial-superuser/stat.html"
        })
        

        .otherwise({
            templateUrl : "/partial-superuser/top_up.html"
        });
});
angular.module('app').filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

angular.module('app').controller('agentFinanceReport', function ($scope,NgTableParams, $filter, $q,$http){



    $scope.init = function() {
        // alert('agentFinanceReport initializing ...');
        
        $scope.buf_memberName = '';
        $scope.groupNameSelected = '';  
        $scope.groupNameList  = '';
       
        $scope.getGroupName();
    }

    $scope.this_group_name = function(data){
        alert(data);

        // clear data
        if ($scope.table_finance) {
            $scope.table_finance.settings().dataset = [];
            $scope.table_finance.reload();
        }
        // "ไทยพาณิชย์"
        // ------ Deposit
        $scope.scb_deposit_accOwner = null;
        $scope.scb_deposit_accNumber = null;
        $scope.scb_deposit_balance_before = null;
        $scope.scb_deposit_total_deposit = null;
        $scope.scb_deposit_total_withdraw = null;
        $scope.scb_deposit_balance_after = null;
        // ------ Withdraw
        $scope.scb_withdraw_accOwner = null;
        $scope.scb_withdraw_accNumber = null;
        $scope.scb_withdraw_balance_before =null;
        $scope.scb_withdraw_total_deposit = null;
        $scope.scb_withdraw_total_withdraw = null;
        $scope.scb_withdraw_balance_after = null;
        // "กสิกรไทย"
        // ------ Deposit
        $scope.kkb_deposit_accOwner = null;
        $scope.kkb_deposit_accNumber = null;
        $scope.kkb_deposit_balance_before = null;
        $scope.kkb_deposit_total_deposit = null;
        $scope.kkb_deposit_total_withdraw = null;
        $scope.kkb_deposit_balance_after = null;
        // ------ Withdraw
        $scope.kkb_withdraw_accOwner = null;
        $scope.kkb_withdraw_accNumber = null;
        $scope.kkb_withdraw_balance_before = null;
        $scope.kkb_withdraw_total_deposit = null;
        $scope.kkb_withdraw_total_withdraw = null;
        $scope.kkb_withdraw_balance_after = null;
        // "กรุงเทพ"
        // ------ Deposit
        $scope.blb_deposit_accOwner = null;
        $scope.blb_deposit_accNumber = null;
        $scope.blb_deposit_balance_before = null;
        $scope.blb_deposit_total_deposit = null;
        $scope.blb_deposit_total_withdraw = null;
        $scope.blb_deposit_balance_after = null;
        // ------ Withdraw
        $scope.blb_withdraw_accOwner = null;
        $scope.blb_withdraw_accNumber = null;
        $scope.blb_withdraw_balance_before = null;
        $scope.blb_withdraw_total_deposit = null;
        $scope.blb_withdraw_total_withdraw = null;
        $scope.blb_withdraw_balance_after = null;
        // "กรุงไทย"
        // ------ Deposit
        $scope.ktb_deposit_accOwner = null;
        $scope.ktb_deposit_accNumber = null;
        $scope.ktb_deposit_balance_before = null;
        $scope.ktb_deposit_total_deposit = null;
        $scope.ktb_deposit_total_withdraw = null;
        $scope.ktb_deposit_balance_after = null;
        // ------ Withdraw
        $scope.ktb_withdraw_accOwner = null;
        $scope.ktb_withdraw_accNumber = null;
        $scope.ktb_withdraw_balance_before = null;
        $scope.ktb_withdraw_total_deposit = null;
        $scope.ktb_withdraw_total_withdraw = null;
        $scope.ktb_withdraw_balance_after = null;

        if(data != '') {
            $scope.groupNameSelected = data;
            $scope.getAgentReports($scope.groupNameSelected); 
            $scope.getBankAccountsReport($scope.groupNameSelected);
        }
        
    }
$scope.getGroupName = function(){

    let formData = {};
    $http.post('proxy/getAllBankAccountGroupName', formData)
    .success(function(data, status, headers, config) {

        console.log(JSON.stringify(data));
        if(data.code != '999999') {
            
            alert("Can't get Group Name")
        }
        else {

            $scope.groupNameList = data.data
  
        }
    })
    .error(function(response, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
    });


}
    


    // ###############################
    //    PAGE 1
    // ###############################
    $scope.getAgentReports = function(groupName) {

        let formData = {
            groupName: groupName
        };
        let config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        // 1) send request to get all agent finance reports ...
        $http.post('/getAgentFinanceReportsByGroupName', formData, config)
        .success(function(data, status, headers, config) {
            
            if(data.code != '999999') {
                swal("เกิดข้อผิดพลาดในการอ่านรายงานการเงินของ Agent : " + JSON.stringify(data), {
                    icon: "error",
                });
            }
            else {
                
                // 2) prepare reports array before send to view ... 
                var results = data.data;
                var reports = [];
                var unfinish_count = 0;
                for (var i=0; i<results.length; i++) {
                    var rep = {
                        reportId: results[i].id,
                        agent_name: results[i].agent_name,
                        datetime_start: results[i].datetime_start,
                        credit_before: parseInt(results[i].credit_before),
                        balance_before: parseInt(results[i].balance_before),
                        deposit_before: parseInt(results[i].deposit_before),
                        withdraw_before: parseInt(results[i].withdraw_before),
                        interest_before: parseInt(results[i].interest_before),
                        fee_before: parseInt(results[i].fee_before),
                        isFinish: results[i].isFinish
                    }

                    if (rep.isFinish == 'Y') {
                        rep['datetime_finish'] = results[i].datetime_finish;
                        rep['credit_after'] = parseInt(results[i].credit_after);
                        rep['balance_after'] = parseInt(results[i].balance_after);
                        rep['deposit_after'] = parseInt(results[i].deposit_after);
                        rep['withdraw_after'] = parseInt(results[i].withdraw_after);
                        rep['interest_after'] = parseInt(results[i].interest_after);
                        rep['fee_after'] = parseInt(results[i].fee_after);
                        rep['total_bonus'] = parseInt(results[i].bonus_total);
                    } else {
                        rep['datetime_finish'] = 'NONE';
                        unfinish_count = unfinish_count + 1;
                    }
                    reports.push(rep);
                }

                if (unfinish_count > 0) {
                    // 3) Get current financial status for each agent ...
                    $http.get('/getCurrentReportStatus')
                    .success(function(response, status, headers, config) {

                        // alert(JSON.stringify(response));
                        if (response.code != '999999') {
                            alert('Warning : ' + response.message);

                            if (response.data) {
                                for (var i=0; i<reports.length; i++) {
                                    if (reports[i].isFinish == 'N') {
                                        reports[i]['credit_after'] = parseInt(response.data[reports[i].agent_name].currentCredit);
                                        reports[i]['balance_after'] = parseInt(response.data[reports[i].agent_name].currentBalance);
                                        reports[i]['deposit_after'] = parseInt(response.data[reports[i].agent_name].currentDeposit);
                                        reports[i]['withdraw_after'] = parseInt(response.data[reports[i].agent_name].currentWithdraw);
                                        reports[i]['interest_after'] = parseInt(response.data[reports[i].agent_name].currentInterest);
                                        reports[i]['fee_after'] = parseInt(response.data[reports[i].agent_name].currentFee);
                                        reports[i]['total_bonus'] = parseInt(response.data[reports[i].agent_name].bonus_total);
                                    }
                                }
                            } else {
                                for (var i=0; i<reports.length; i++) {
                                    if (reports[i].isFinish == 'N') {
                                        reports[i]['credit_after'] = '-';
                                        reports[i]['balance_after'] = '-';
                                        reports[i]['deposit_after'] = '-';
                                        reports[i]['withdraw_after'] = '-';
                                        reports[i]['interest_after'] = '-';
                                        reports[i]['fee_after'] = '-';
                                        reports[i]['total_bonus'] = '-';
                                    }
                                }
                            }
                            
                        } else {
                            // alert(JSON.stringify(response.data));
                            var agentReportDict = response.data;

                            for (var i=0; i<reports.length; i++) {
                                if (reports[i].isFinish == 'N') {
                                    reports[i]['credit_after'] = agentReportDict[reports[i].agent_name].currentCredit ? parseInt(agentReportDict[reports[i].agent_name].currentCredit) : '-';
                                    reports[i]['balance_after'] = agentReportDict[reports[i].agent_name].currentBalance ? parseInt(agentReportDict[reports[i].agent_name].currentBalance) : '-';
                                    reports[i]['deposit_after'] = agentReportDict[reports[i].agent_name].currentDeposit ? parseInt(agentReportDict[reports[i].agent_name].currentDeposit) : '-';
                                    reports[i]['withdraw_after'] = agentReportDict[reports[i].agent_name].currentWithdraw ? parseInt(agentReportDict[reports[i].agent_name].currentWithdraw) : '-';
                                    reports[i]['interest_after'] = agentReportDict[reports[i].agent_name].currentInterest ? parseInt(agentReportDict[reports[i].agent_name].currentInterest) : '-';
                                    reports[i]['fee_after'] = agentReportDict[reports[i].agent_name].currentFee ? parseInt(agentReportDict[reports[i].agent_name].currentFee) : '-';
                                    reports[i]['total_bonus'] = agentReportDict[reports[i].agent_name].bonus_total ? parseInt(agentReportDict[reports[i].agent_name].bonus_total) : '-';
                                }
                            }
                        }

                        // 4) assign prepared reports array to view ...
                        $scope.data_list = reports;
                        $scope.table_finance = new NgTableParams({count: 10 ,  sorting: { datetime_start: "desc", agent_name: "asc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});

                        // alert(JSON.stringify(data.data[0]));
                     /*   swal("การอ่านรายงานการเงินของ Agent สำเร็จ", {
                            icon: "success",
                        });*/
                        // swal(JSON.stringify(data.data[0]) , {
                        //     icon: "success",
                        // });
                    })
                    .error(function(response, status, headers, config) {
                        alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                    });
                } else {
                    // 4) assign prepared reports array to view ...
                    $scope.data_list = reports;
                    $scope.table_finance = new NgTableParams({count: 10, sorting: { datetime_start: "desc", agent_name: "asc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});

                    // alert(JSON.stringify(data.data[0]));
                /*    swal("การอ่านรายงานการเงินของ Agent สำเร็จ", {
                        icon: "success",
                    });*/
                    // swal(JSON.stringify(data.data[0]) , {
                    //     icon: "success",
                    // });
                }
            }
        })
        .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        });

    }

    $scope.getBankAccountsReport = function(groupName) {

        if (groupName) {

            let formData = {
                groupName: groupName
            };
            let config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            $http.post('/getBankAccountsReportByGroupName', formData, config)
            .success(function(response, status, headers, config) {

                if(response.code != '999999') {
                    swal("เกิดข้อผิดพลาดในการอ่านรายงานการเงินของ Bank Account : " + JSON.stringify(data), {
                        icon: "error",
                    });
                }
                else {
                    var bankAccountDict = response.data;

                    // "ไทยพาณิชย์"
                    // ------ Deposit
                    if (bankAccountDict['deposit']['ไทยพาณิชย์']) {
                        console.log(JSON.stringify(bankAccountDict['deposit']['ไทยพาณิชย์']));
                        $scope.scb_deposit_accOwner = bankAccountDict['deposit']['ไทยพาณิชย์'].acc_owner;
                        $scope.scb_deposit_accNumber = bankAccountDict['deposit']['ไทยพาณิชย์'].acc_number;
                        $scope.scb_deposit_balance_before = bankAccountDict['deposit']['ไทยพาณิชย์'].balance_before;
                        $scope.scb_deposit_total_deposit = bankAccountDict['deposit']['ไทยพาณิชย์'].total_deposit;
                        $scope.scb_deposit_total_withdraw = bankAccountDict['deposit']['ไทยพาณิชย์'].total_withdraw;
                        $scope.scb_deposit_balance_after = bankAccountDict['deposit']['ไทยพาณิชย์'].balance_after;
                    }
                    // ------ Withdraw
                    if (bankAccountDict['withdraw']['ไทยพาณิชย์']) {
                        console.log(JSON.stringify(bankAccountDict['withdraw']['ไทยพาณิชย์']));
                        $scope.scb_withdraw_accOwner = bankAccountDict['withdraw']['ไทยพาณิชย์'].acc_owner;
                        $scope.scb_withdraw_accNumber = bankAccountDict['withdraw']['ไทยพาณิชย์'].acc_number;
                        $scope.scb_withdraw_balance_before = bankAccountDict['withdraw']['ไทยพาณิชย์'].balance_before;
                        $scope.scb_withdraw_total_deposit = bankAccountDict['withdraw']['ไทยพาณิชย์'].total_deposit;
                        $scope.scb_withdraw_total_withdraw = bankAccountDict['withdraw']['ไทยพาณิชย์'].total_withdraw;
                        $scope.scb_withdraw_balance_after = bankAccountDict['withdraw']['ไทยพาณิชย์'].balance_after;
                    }
                    // "กสิกรไทย"
                    // ------ Deposit
                    if (bankAccountDict['deposit']['กสิกรไทย']) {
                        console.log(JSON.stringify(bankAccountDict['deposit']['กสิกรไทย']));
                        $scope.kkb_deposit_accOwner = bankAccountDict['deposit']['กสิกรไทย'].acc_owner;
                        $scope.kkb_deposit_accNumber = bankAccountDict['deposit']['กสิกรไทย'].acc_number;
                        $scope.kkb_deposit_balance_before = bankAccountDict['deposit']['กสิกรไทย'].balance_before;
                        $scope.kkb_deposit_total_deposit = bankAccountDict['deposit']['กสิกรไทย'].total_deposit;
                        $scope.kkb_deposit_total_withdraw = bankAccountDict['deposit']['กสิกรไทย'].total_withdraw;
                        $scope.kkb_deposit_balance_after = bankAccountDict['deposit']['กสิกรไทย'].balance_after;
                    }
                    // ------ Withdraw
                    if (bankAccountDict['withdraw']['กสิกรไทย']) {
                        console.log(JSON.stringify(bankAccountDict['withdraw']['กสิกรไทย']));
                        $scope.kkb_withdraw_accOwner = bankAccountDict['withdraw']['กสิกรไทย'].acc_owner;
                        $scope.kkb_withdraw_accNumber = bankAccountDict['withdraw']['กสิกรไทย'].acc_number;
                        $scope.kkb_withdraw_balance_before = bankAccountDict['withdraw']['กสิกรไทย'].balance_before;
                        $scope.kkb_withdraw_total_deposit = bankAccountDict['withdraw']['กสิกรไทย'].total_deposit;
                        $scope.kkb_withdraw_total_withdraw = bankAccountDict['withdraw']['กสิกรไทย'].total_withdraw;
                        $scope.kkb_withdraw_balance_after = bankAccountDict['withdraw']['กสิกรไทย'].balance_after;
                    }
                    // "กรุงเทพ"
                    // ------ Deposit
                    if (bankAccountDict['deposit']['กรุงเทพ']) {
                        console.log(JSON.stringify(bankAccountDict['deposit']['กรุงเทพ']));
                        $scope.blb_deposit_accOwner = bankAccountDict['deposit']['กรุงเทพ'].acc_owner;
                        $scope.blb_deposit_accNumber = bankAccountDict['deposit']['กรุงเทพ'].acc_number;
                        $scope.blb_deposit_balance_before = bankAccountDict['deposit']['กรุงเทพ'].balance_before;
                        $scope.blb_deposit_total_deposit = bankAccountDict['deposit']['กรุงเทพ'].total_deposit;
                        $scope.blb_deposit_total_withdraw = bankAccountDict['deposit']['กรุงเทพ'].total_withdraw;
                        $scope.blb_deposit_balance_after = bankAccountDict['deposit']['กรุงเทพ'].balance_after;
                    }
                    // ------ Withdraw
                    if (bankAccountDict['withdraw']['กรุงเทพ']) {
                        console.log(JSON.stringify(bankAccountDict['withdraw']['กรุงเทพ']));
                        $scope.blb_withdraw_accOwner = bankAccountDict['withdraw']['กรุงเทพ'].acc_owner;
                        $scope.blb_withdraw_accNumber = bankAccountDict['withdraw']['กรุงเทพ'].acc_number;
                        $scope.blb_withdraw_balance_before = bankAccountDict['withdraw']['กรุงเทพ'].balance_before;
                        $scope.blb_withdraw_total_deposit = bankAccountDict['withdraw']['กรุงเทพ'].total_deposit;
                        $scope.blb_withdraw_total_withdraw = bankAccountDict['withdraw']['กรุงเทพ'].total_withdraw;
                        $scope.blb_withdraw_balance_after = bankAccountDict['withdraw']['กรุงเทพ'].balance_after;
                    }
                    // "กรุงไทย"
                    // ------ Deposit
                    if (bankAccountDict['deposit']['กรุงไทย']) {
                        console.log(JSON.stringify(bankAccountDict['deposit']['กรุงไทย']));
                        $scope.ktb_deposit_accOwner = bankAccountDict['deposit']['กรุงไทย'].acc_owner;
                        $scope.ktb_deposit_accNumber = bankAccountDict['deposit']['กรุงไทย'].acc_number;
                        $scope.ktb_deposit_balance_before = bankAccountDict['deposit']['กรุงไทย'].balance_before;
                        $scope.ktb_deposit_total_deposit = bankAccountDict['deposit']['กรุงไทย'].total_deposit;
                        $scope.ktb_deposit_total_withdraw = bankAccountDict['deposit']['กรุงไทย'].total_withdraw;
                        $scope.ktb_deposit_balance_after = bankAccountDict['deposit']['กรุงไทย'].balance_after;
                    }
                    // ------ Withdraw
                    if (bankAccountDict['withdraw']['กรุงไทย']) {
                        console.log(JSON.stringify(bankAccountDict['withdraw']['กรุงไทย']));
                        $scope.ktb_withdraw_accOwner = bankAccountDict['withdraw']['กรุงไทย'].acc_owner;
                        $scope.ktb_withdraw_accNumber = bankAccountDict['withdraw']['กรุงไทย'].acc_number;
                        $scope.ktb_withdraw_balance_before = bankAccountDict['withdraw']['กรุงไทย'].balance_before;
                        $scope.ktb_withdraw_total_deposit = bankAccountDict['withdraw']['กรุงไทย'].total_deposit;
                        $scope.ktb_withdraw_total_withdraw = bankAccountDict['withdraw']['กรุงไทย'].total_withdraw;
                        $scope.ktb_withdraw_balance_after = bankAccountDict['withdraw']['กรุงไทย'].balance_after;
                    }
                }    
            })
            .error(function(response, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            });

        } else {
            alert('GroupName is NULL ...');
        }
    }

    // $scope.createAgentReports = function() {

    //     $http.get('/createAllAgentFinanceReports')
    //         .success(function(data, status, headers, config){

    //             if (data.code != '999999') {
    //                 swal("เกิดข้อผิดพลาดในการสร้างรายงานการเงินของ Agent : " + JSON.stringify(data), {
    //                     icon: "error",
    //                 });
    //             }
    //             else {
    //                 swal("สร้างรายงานการเงินของ Agent สำเร็จ", {
    //                     icon: "success",
    //                 });
    //         /*         $scope.data_list =data.data
    //                 $scope.table_finance.reload();*/
    //                 $scope.getAgentReports();   
    //             }
    //         })
    //         .error(function(data, status, headers, config) {
    //             alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
    //         });
    // }

    $scope.updateAgentReport = function(rowInput) {

        rowInput.isEditing = false ;


        if (rowInput.credit_before.length == 0 ||
            rowInput.balance_before.length == 0 || 
            rowInput.deposit_before.length == 0 ||
            rowInput.withdraw_before.length == 0 ||
            rowInput.interest_before.length == 0 ||
            rowInput.fee_before.length == 0
        ){
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            $scope.text_alert = "กรุณากรอกข้อมูลให้ครบทุกช่อง"
        } else {
            let formData = {
                reportId: rowInput.reportId,
                credit_before: rowInput.credit_before,
                balance_before: rowInput.balance_before,
                deposit_before: rowInput.deposit_before,
                withdraw_before: rowInput.withdraw_before,
                interest_before: rowInput.interest_before,
                fee_before: rowInput.fee_before
            };
            let config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            console.log(JSON.stringify(formData));
            $http.post('/updateAgentFinanceReport', formData, config)
                .success(function(data, status, headers, config) {
                    
                    if(data.code != '999999') {
                        console.log(JSON.stringify(data));
                        swal("เกิดข้อผิดพลาดในการ update รายงานการเงินของ Agent : " + JSON.stringify(data), {
                            icon: "error",
                        });
                    }
                    else {
                        swal("Update รายงานการเงินของ Agent สำเร็จ", {
                            icon: "success",
                        });
                        
                        $scope.getAgentReports($scope.groupNameSelected);   
                    }
                })
                .error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                });
        }
    }

    // $scope.finishAgentReport = function(item) {

    //     item.isEditing = false ;
    //     let agent_name = item.agent_name;

    //     var formData = {
    //         agentUsername: agent_name
    //     };
    //     let config = {
    //         headers : {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     $http.post('/finishAgentReport', formData, config)
    //         .success(function(response, status, headers, config) {
    //             if (response.code != '999999') {
    //                 swal("เกิดข้อผิดพลาดในการตัดรอบรายงานการเงินของ Agent : " + JSON.stringify(response), {
    //                     icon: "error",
    //                 });
    //             } else {
    //                 swal("ตัดรอบรายงานการเงินของ Agent สำเร็จ", {
    //                     icon: "success",
    //                 });

    //                 $scope.getAgentReports();           // reload table
    //             }
    //         })
    //         .error(function(response, status, headers, config) {
    //             alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
    //         });
    // }


    // ###############################
    //    PAGE 2
    // ###############################
    $scope.agent_search = function(){
        //buf_memberName  =  string member name
      
        alert($scope.buf_agentName);
        $scope.getMemberDetailReport_all($scope.buf_agentName);
        $scope.getAgentReportsByName($scope.buf_agentName);
    }

    $scope.getAgentReportsByName = function(agentName) {

        let username = agentName;
        let formData = {
            agentUsername: username
        };
        let config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        $http.post('/getAgentFinanceReportsByName', formData, config)
            .success(function(response, status, headers, config) {
                if (response.code != '999999') {
                    swal("เกิดข้อผิดพลาดในการอ่านข้อมูลรายงาน Agent : " + JSON.stringify(response), {
                        icon: "error",
                    });

                } else {

                    // 2) prepare reports array before send to view ... 
                    var results = response.data;
                    var rep = {
                        reportId: results[0].id,
                        agent_name: results[0].agent_name,
                        datetime_start: results[0].datetime_start,
                        credit_before: parseInt(results[0].credit_before),
                        balance_before: parseInt(results[0].balance_before),
                        deposit_before: parseInt(results[0].deposit_before),
                        withdraw_before: parseInt(results[0].withdraw_before),
                        interest_before: parseInt(results[0].interest_before),
                        fee_before: parseInt(results[0].fee_before),
                        isFinish: results[0].isFinish
                    };
                    if (rep.isFinish == 'Y') {
                        rep['datetime_finish'] = results[0].datetime_finish;
                        rep['credit_after'] = parseInt(results[0].credit_after);
                        rep['balance_after'] = parseInt(results[0].balance_after);
                        rep['deposit_after'] = parseInt(results[0].deposit_after);
                        rep['withdraw_after'] = parseInt(results[0].withdraw_after);
                        rep['interest_after'] = parseInt(results[0].interest_after);
                        rep['fee_after'] = parseInt(results[0].fee_after);
                        rep['total_bonus'] = parseInt(results[0].bonus_total);

                        // Assign values to view ...
                        $scope.page2_balance_before = rep.balance_before;
                        $scope.page2_balance_after = rep.balance_after;
                        $scope.page2_withdraw_after = rep.withdraw_after;
                        $scope.page2_bonus = rep.total_bonus;
                        $scope.page2_credit_before = rep.credit_before;
                        $scope.page2_credit_after = rep.credit_after;

                    } else {
                        rep['datetime_finish'] = 'NONE';
                    
                        // 3) Get current financial status for each agent ...
                        $http.get('/getCurrentReportStatus')
                        .success(function(response, status, headers, config) {

                            var agentReportDict = null;
                            // alert(JSON.stringify(response));
                            if (response.code != '999999') {
                                alert('Warning : ' + response.message);

                                if (response.data) {
                                    rep['credit_after'] = parseInt(response.data[rep.agent_name].currentCredit);
                                    rep['balance_after'] = parseInt(response.data[rep.agent_name].currentBalance);
                                    rep['deposit_after'] = parseInt(response.data[rep.agent_name].currentDeposit);
                                    rep['withdraw_after'] = parseInt(response.data[rep.agent_name].currentWithdraw);
                                    rep['interest_after'] = parseInt(response.data[rep.agent_name].currentInterest);
                                    rep['fee_after'] = parseInt(response.data[rep.agent_name].currentFee);
                                    rep['total_bonus'] = parseInt(response.data[rep.agent_name].bonus_total);
                                } else {
                                    rep['credit_after'] = '-';
                                    rep['balance_after'] = '-';
                                    rep['deposit_after'] = '-';
                                    rep['withdraw_after'] = '-';
                                    rep['interest_after'] = '-';
                                    rep['fee_after'] = '-';
                                    rep['total_bonus'] = '-';
                                }
                                
                            } else {
                                // alert(JSON.stringify(response.data));
                                agentReportDict = response.data;

                                rep['credit_after'] = agentReportDict[rep.agent_name].currentCredit ? parseInt(agentReportDict[rep.agent_name].currentCredit) : '-';
                                rep['balance_after'] = agentReportDict[rep.agent_name].currentBalance ? parseInt(agentReportDict[rep.agent_name].currentBalance) : '-';
                                rep['deposit_after'] = agentReportDict[rep.agent_name].currentDeposit ? parseInt(agentReportDict[rep.agent_name].currentDeposit) : '-';
                                rep['withdraw_after'] = agentReportDict[rep.agent_name].currentWithdraw ? parseInt(agentReportDict[rep.agent_name].currentWithdraw) : '-';
                                rep['interest_after'] = agentReportDict[rep.agent_name].currentInterest ? parseInt(agentReportDict[rep.agent_name].currentInterest) : '-';
                                rep['fee_after'] = agentReportDict[rep.agent_name].currentFee ? parseInt(agentReportDict[rep.agent_name].currentFee) : '-';
                                rep['total_bonus'] = agentReportDict[rep.agent_name].bonus_total ? parseInt(agentReportDict[rep.agent_name].bonus_total) : '-';

                            }

                            // Assign values to view ...
                            $scope.page2_balance_before = rep.balance_before;
                            $scope.page2_balance_after = rep.balance_after;
                            $scope.page2_withdraw_after = rep.withdraw_after;
                            $scope.page2_bonus = rep.total_bonus;
                            $scope.page2_credit_before = rep.credit_before;
                            $scope.page2_credit_after = rep.credit_after;
                        })
                        .error(function(response, status, headers, config) {
                            alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                        });
                    }
                }
            })
            .error(function(response, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            });
    }

    $scope.getMemberDetailReport_all = function(agentName) {

        let username = agentName;
        let formData = {
            agentUsername: username
        };
        let config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        $http.post('/getDetailReportByAgent', formData, config)
            .success(function(response, status, headers, config) {
                if (response.code != '999999') {
                    swal("เกิดข้อผิดพลาดในการอ่านข้อมูลรายงานการทำรายการของ Member [ALL] : " + JSON.stringify(response), {
                        icon: "error",
                    });

                    var reports = [{
                        operator: 'test',
                        username: 'test',
                        loginName: 'test',
                        fullName: 'test',
                        datetime_request: new Date(),
                        // bankName: results[i].bankName,
                        credit_request: 0,
                        totalBalance_before: 0,
                        totalBalance_withdraw: 0,
                        totalBalance_bonus: 0,
                        totalBalance_after: 0,
                        totalBalance_sbobet: 0,
                        yesterday_balance: 0,
                        outstanding_sport: 0,
                        outstanding_game: 0,
                        outstanding_horse: 0,
                        live_casino_bet_credit: 0,
                        total_bet_credit: 0,
                        credit_before: 0,
                        credit_deposit_withdraw: 0,
                        credit_after: 0,
                        credit_sbobet: 0
                    }];

                    // 4) assign prepared reports array to view ...
                    $scope.data_list = reports;
                    $scope.table_memberAllDetails = new NgTableParams({count: 10, sorting: { datetime_request: "desc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});

                } else {
                    // 2) prepare reports array before send to view ... 
                    var results = response.data;
                    var reports = [];
                    for (var i=0; i<results.length; i++) {
                        var rep = {
                            operator: results[i].operator,
                            username: results[i].username,
                            loginName: results[i].loginName,
                            fullName: results[i].fullName,
                            datetime_request: results[i].datetime_request,
                            // bankName: results[i].bankName,
                            credit_request: parseInt(results[i].credit_request),
                            totalBalance_before: parseInt(results[i].totalBalance_before),
                            totalBalance_withdraw: parseInt(results[i].totalBalance_withdraw),
                            totalBalance_bonus: parseInt(results[i].totalBalance_bonus),
                            totalBalance_after: parseInt(results[i].totalBalance_after),
                            totalBalance_sbobet: parseInt(results[i].totalBalance_sbobet),
                            yesterday_balance: parseInt(results[i].yesterday_balance),
                            outstanding_sport: parseInt(results[i].outstanding_sport),
                            outstanding_game: parseInt(results[i].outstanding_game),
                            outstanding_horse: parseInt(results[i].outstanding_horse),
                            live_casino_bet_credit: parseInt(results[i].live_casino_bet_credit),
                            total_bet_credit: parseInt(results[i].total_bet_credit),
                            credit_before: parseInt(results[i].credit_before),
                            credit_deposit_withdraw: parseInt(results[i].credit_deposit_withdraw),
                            credit_after: parseInt(results[i].credit_after),
                            credit_sbobet: parseInt(results[i].credit_sbobet)
                        }
                        reports.push(rep);
                    }

                    // 4) assign prepared reports array to view ...
                    $scope.data_list = reports;
                    $scope.table_memberAllDetails = new NgTableParams({count: 10, sorting: { datetime_request: "desc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});
                }
            })
            .error(function(response, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            });
    }

    // ###############################
    //    PAGE 3
    // ###############################

    $scope.memberSearch = function(){
        //buf_memberName  =  string member name
      
        alert($scope.buf_memberName);
        $scope.getMemberDetailReport($scope.buf_memberName);
    }

    $scope.getMemberDetailReport = function(memberName) {

        let username = memberName;
        let formData = {
            memberUsername: username
        };
        let config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        $http.post('/getDetailReportByMember', formData, config)
            .success(function(response, status, headers, config) {
                if (response.code != '999999') {
                    swal("เกิดข้อผิดพลาดในการอ่านข้อมูลรายงานการทำรายการของ Member : " + JSON.stringify(response), {
                        icon: "error",
                    });

                    var reports = [{
                        operator: 'test',
                        username: 'test',
                        loginName: 'test',
                        fullName: 'test',
                        datetime_request: new Date(),
                        // bankName: results[i].bankName,
                        credit_request: 0,
                        totalBalance_before: 0,
                        totalBalance_withdraw: 0,
                        totalBalance_bonus: 0,
                        totalBalance_after: 0,
                        totalBalance_sbobet: 0,
                        yesterday_balance: 0,
                        outstanding_sport: 0,
                        outstanding_game: 0,
                        outstanding_horse: 0,
                        live_casino_bet_credit: 0,
                        total_bet_credit: 0,
                        credit_before: 0,
                        credit_deposit_withdraw: 0,
                        credit_after: 0,
                        credit_sbobet: 0
                    }];

                    // 4) assign prepared reports array to view ...
                    $scope.data_list = reports;
                    $scope.table_memberDetails = new NgTableParams({count: 10, sorting: { datetime_request: "desc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});

                } else {
                    // 2) prepare reports array before send to view ... 
                    var results = response.data;
                    var reports = [];
                    for (var i=0; i<results.length; i++) {
                        var rep = {
                            operator: results[i].operator,
                            username: results[i].username,
                            loginName: results[i].loginName,
                            fullName: results[i].fullName,
                            datetime_request: results[i].datetime_request,
                            // bankName: results[i].bankName,
                            credit_request: parseInt(results[i].credit_request),
                            totalBalance_before: parseInt(results[i].totalBalance_before),
                            totalBalance_withdraw: parseInt(results[i].totalBalance_withdraw),
                            totalBalance_bonus: parseInt(results[i].totalBalance_bonus),
                            totalBalance_after: parseInt(results[i].totalBalance_after),
                            totalBalance_sbobet: parseInt(results[i].totalBalance_sbobet),
                            yesterday_balance: parseInt(results[i].yesterday_balance),
                            outstanding_sport: parseInt(results[i].outstanding_sport),
                            outstanding_game: parseInt(results[i].outstanding_game),
                            outstanding_horse: parseInt(results[i].outstanding_horse),
                            live_casino_bet_credit: parseInt(results[i].live_casino_bet_credit),
                            total_bet_credit: parseInt(results[i].total_bet_credit),
                            credit_before: parseInt(results[i].credit_before),
                            credit_deposit_withdraw: parseInt(results[i].credit_deposit_withdraw),
                            credit_after: parseInt(results[i].credit_after),
                            credit_sbobet: parseInt(results[i].credit_sbobet)
                        }
                        reports.push(rep);
                    }

                    // 4) assign prepared reports array to view ...
                    $scope.data_list = reports;
                    $scope.table_memberDetails = new NgTableParams({count: 10, sorting: { datetime_request: "desc" }}, { counts: [20, 100, 500], dataset: $scope.data_list});
                }
            })
            .error(function(response, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            });
    }
    
});