/**
 * Created by arif on 12/5/16.
 */

function myCtrl($scope, $http) {
    console.log('hello world from controller');


    $scope.countries = {
        'India': ['Maharashtra','Madhya Pradesh','Rajasthan'],
        'USA': ['Alabama', 'California', 'Illinois'],
        'Australia':['New South Wales', 'Victoria']
    };

    $scope.country=Object.keys($scope.countries);

    $scope.driver = {
        hoby : []
    };
    console.log('$scope.country',$scope.country);
    $scope.selectCities=function (key) {
        $scope.cities=$scope.countries[key];
        console.log('cities',$scope.cities);
    };
    var refresh = function () {
        $http.get('/driverlist').success(function (res) {
            console.log('i recieved data what i reqiusted');
            console.log('i recieved data what i reqiusted' + JSON.stringify(res));
            $scope.driverlist = res;
        });
    }
    refresh();
    $scope.AddDetails = function () {
        console.log('data' + JSON.stringify($scope.driver));

        $http.post('/driverlist', $scope.driver).success(function (result) {
            console.log('result' + JSON.stringify(result));
            $scope.driver = ''
            refresh();
        })
    }

    $scope.remove = function (driver) {
        console.log('driver' + JSON.stringify(driver._id));
        $http.delete('/driverlist/' + driver._id).success(function (data) {
            console.log('data removed' + JSON.stringify(data));
            refresh();
        })
    }
    $scope.hobs ='';
    $scope.addNewValues = function(){
        console.log(' $scope.hobs=======' + JSON.stringify($scope.hobs));

        $scope.driver.hoby = $scope.hobs;
        console.log('final : ' + JSON.stringify($scope.driver));
    }
    $scope.hobby = [{name : 'cricket',value : false},{name : 'foot', value : false},{name : 'volley',value : false}];
    $scope.Edit = function (id) {

        $http.get('/driverlist/' + id).success(function (data1) {

            $scope.driver = data1;
            for(var i =0 ; i < $scope.hobby.length ; i++){
                console.log('$scope.hobby[i].name : ' + JSON.stringify($scope.hobby[i].name));
                $scope.hobs = $scope.driver.hoby;
                if($scope.driver.hoby.indexOf($scope.hobby[i].name) > -1){
                    console.log('if : ' + JSON.stringify($scope.hobby[i]));
                    $scope.hobby[i].value = true;
                }else{
                    console.log('else : ' + JSON.stringify($scope.hobby[i]));
                    $scope.hobby[i].value = false;
                }
            }

            console.log('end $scope.hobby ========' + JSON.stringify($scope.hobby))
            $scope.cities=$scope.countries[$scope.driver.country];
        })
    }

    $scope.update = function () {
        console.log('$scope.driver._id' + JSON.stringify($scope.driver._id, $scope.driver))
        $http.put('/driverlist/' + $scope.driver._id, $scope.driver).success(function (tttt) {
            refresh();
        })
    }

    $scope.clear = function () {
        $scope.driver = ''
    }





}
