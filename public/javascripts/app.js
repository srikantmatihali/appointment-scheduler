var app = angular.module('taskApp', ['angularjs-datetime-picker']);

angular.module('taskApp').run(function($rootScope) {
      $rootScope.gmtDate = new Date('2015-01-01 00:00:00 -00:00');
});

// app.controller('formCtrl',function($scope){});
function myCtrl($scope,$http,$compile,$sce){ //console.log(123123);

	$scope.showLogin = 1;
	$scope.myText = "";  
	$scope.showUser = 0;
	$scope.formData = {};
	$scope.dateData = {};

	$scope.addAppointment = function(){

		//console.log('I am here');//console.log($scope.dateData);
		$http({
			method:"POST",
			url:"users/bookappointment",
			data:$scope.dateData,
			headers: { 'Content-Type': 'application/json' }
		}).success(function(data){
			switch(data.status){
				case 200:						
						  $scope.appointments.push(data.appointment);						  
						break;
				default:						
				case 404: alert('Unable to add an Appointment');
						break;
			}
		});
	};



	$scope.saveUserForm = function(){ //if($scope.formData.$valid){} // console.log($scope.formData);		

		$http({
			method : 'POST',
			url: "/users/login",
			data: $scope.formData,
			headers: { 'Content-Type': 'application/json' }
		}).success(function(data){

			var d = new Date();			
			var newdate = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();						  
			document.getElementById('date').value = newdate;
			$scope.dateData.date = newdate;

			switch(data.status){
				
				case 201: 						  
							$scope.showLogin = 0;
							$scope.myText = $sce.trustAsHtml("Error in Appointments display");							
							if(data.user.role_type=="super"){
								$scope.showUser = 1;
								document.getElementById('uid').value = data.user._id;
								$scope.dateData.uid = data.user._id;
							}						
						   break;

				case 203: 						  
							$scope.showLogin = 0;
							$scope.myText = $sce.trustAsHtml("No Appointments.");														
							if(data.user.role_type=="super"){
								$scope.showUser = 1;
								document.getElementById('uid').value = data.user._id;
								$scope.dateData.uid = data.user._id;
							}
						   break;						
				case 200: 	
							$scope.showLogin = 0;							
							$scope.appointments = data.appointments;

							if(data.user.role_type=="super"){
								$scope.showUser = 1;
								document.getElementById('uid').value = data.user._id;
								$scope.dateData.uid = data.user._id;
							}
						break;						   
				default:
				case 1001: 						
				case 1002: 						
				case 1004:
						  alert('username or password is wrong');
						break;
			}		

		});//end of http

	};
}