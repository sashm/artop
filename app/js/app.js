


var myApp = angular.module("myApp", ["ngRoute"]);


   myApp.config(['$routeProvider', function($routeProvider) {
     $routeProvider
		.when("/entry", {
		    templateUrl: "app/entry.html",
		})
		.when('/index', {
		    templateUrl: "app/index.html",
		})
		.when('/tarif', {
		    templateUrl: "templates/tarif.html",
		})
		.when('/patients', {
		    templateUrl: "templates/patients.html",

		})
		.when('/projects', {
		    templateUrl: "templates/projects.html",
		})
		.when('/printDoc', {
		    templateUrl: "templates/printDoc.html",
		})
		
		.otherwise({ redirectTo: '/entry' });
}]);


myApp.service("patientService",function($http,$q){
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/artop/collections/patients?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo').then(function (data) {
		deferred.resolve(data);
	});
	this.getPatients = function(){
		return deferred.promise;
	}
})

myApp.service("projectsService", function ($http, $q) {
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/artop/collections/Projects?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo').then(function (data) {
		deferred.resolve(data);
	});
	this.getForms = function(){
		return deferred.promise;
	}
})

myApp.controller('patientController', function ($scope, $http, $q, patientService) {
	var promise = patientService.getPatients();
	promise.then(function(data){
 		$scope.patients = data.data;
	});
	
	function resetItem(){
	   $scope.patient = {
	       projectName: '',
	       patientName: '',
	       adresse: '',
		   phone : '',
		   EMail : '',
		   communicate: '',
		   payments: ''
	   };              
	   $scope.displayForm = '';
	   
	}
	resetItem();
	
	$scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };
	 
	 
	 
	 
	 
	 $scope.editItem = function (data) { 
            console.log("eddit");	 
			$scope.patient = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
		 
    $scope.create = function(data) {
        $http.post('https://api.mlab.com/api/1/databases/artop/collections/patients?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectName': $scope.patient.projectName, 'patientName': $scope.patient.patientName, 'adresse': $scope.patient.adresse, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail, 'communicate': $scope.patient.communicate, 'payments': $scope.patient.payments })
            .then(function(response) {
                console.log("data entered");
				$('#myModal').modal('hide');
	          });
           
    };
	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
	    $http.put('https://api.mlab.com/api/1/databases/artop/collections/patients/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectName': $scope.patient.projectName, 'patientName': $scope.patient.patientName, 'adresse': $scope.patient.adresse, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail, 'communicate': $scope.patient.communicate, 'payments': $scope.patient.payments })
            .success(function(response) {
                console.log('updated');
            });
    }
	
	
		
		
	
    $scope.removeItem = function(id,patient) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
		    $http['delete']('https://api.mlab.com/api/1/databases/artop/collections/patients/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo')
            .then(function(response) {
				console.log(patient.firstName);
				
				$scope.patients.splice($scope.patients.indexOf(patient), 1);
				
                console.log('Deleted');
            });
		   
		}
	}
	
    
	
	  $scope.removeModal= function(){
          $scope.displayForm = false;		 		  
      };
	  
	  $scope.removeModal2= function(){
          $scope.displayForm2 = false;		 		  
      };
	
})

myApp.controller('projectsController', function ($scope, $http, $q, projectsService, patientService) {
    var promise = projectsService.getForms();
	promise.then(function(data){
 		$scope.Projects = data.data[0];
 		console.log("this is my data", $scope.Projects);
	});
	var promise2 = patientsService.getPatients();
	promise2.then(function(data){
 		$scope.patient = data.data[0];
		console.log("this is my data",$scope.patient);
	});
	
	function resetItem(){
	   $scope.Projects = {
	       projectStatus: '',
	       urgencyLevel: '',
	       pickupColors: '',
	       vision: '',
	       schedule: '',
		  
	   };              
	   $scope.displayForm = '';
	   
	}
	resetItem();
	
	$scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };
	 
	 
	 $scope.editItem = function (data) { 
            console.log("eddit");	 
			$scope.Projects = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
	
	 $scope.create = function(data) {
	     $http.post('https://api.mlab.com/api/1/databases/artop/collections/Projects?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectStatus': $scope.Projects.projectStatus, 'urgencyLevel': $scope.Projects.urgencyLevel, 'pickupColors': $scope.Projects.pickupColors, 'vision': $scope.Projects.vision, 'schedule': $scope.Projects.schedule })
            .then(function(response) {
                console.log("data entered");
				$('#myModal').modal('hide');
	          });
           
	 };

	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
	    $http.put('https://api.mlab.com/api/1/databases/artop/collections/Projects/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectStatus': $scope.Projects.projectStatus, 'urgencyLevel': $scope.Projects.urgencyLevel, 'pickupColors': $scope.Projects.pickupColors, 'vision': $scope.Projects.vision, 'schedule': $scope.Projects.schedule })
            .success(function(response) {
                console.log('updated');
            });
    };
	
	

	
	 $scope.removeItem = function(id,Projects) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
		    $http['delete']('https://api.mlab.com/api/1/databases/artop/collections/Projects/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo')
            .then(function(response) {
				console.log(patient.firstName);
				
				$scope.patients.splice($scope.Forms.indexOf(Projects), 1);
				
                console.log('Deleted');
            });
		   
		}
	}
	
	
});


