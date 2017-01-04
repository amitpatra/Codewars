/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function ($scope, $state, mainService, $stateParams) {
	
	mainService.checkAuth();
	$scope.kataid = $stateParams.kataid;
	$scope.passed = false;
	$scope.showInstruction = true;
	$scope.showOutput = false;
	
	/** Create text areas **/
	var textarea1 = document.getElementById('solution-input');
	var solutionsCode = CodeMirror.fromTextArea(textarea1, {
		lineNumbers: true,
		theme: 'seti',
		lineSeparator: '\\n',
	});
	
	var textarea2 = document.getElementById('example-input');
	var examplesCode = CodeMirror.fromTextArea(textarea2, {
		lineNumbers: true,
		theme: 'seti',
	});
	
	$scope.languages = ['JavaScript', 'Python'];
	$scope.versions = ['Node v6.6.0'];
	$scope.output = [];
	
	//NG-SHOWS
	$scope.showOutputShow = true;
	$scope.showInstructionsShow = false;
	$scope.showOutput = function () {
		$scope.showOutputShow = false;
		$scope.showInstructionsShow = true;
	};
	$scope.showInstructions = function () {
		$scope.showOutputShow = true;
		$scope.showInstructionsShow = false;
	};
	
	// GET KATA INFORMATION
	$scope.getKataById = (kataid) => {
		mainService.getKataById(kataid).then((response) => {
			$scope.name = response.data.name;
			$scope.instructions = response.data.description.replace(/\\n/g, '\n');
			$scope.kyu = response.data.kyu;
			$scope.starter = response.data.starter_code;
			$scope.examples = response.data.examples[0].test;
			$scope.kataid = response.data.id;
		}).then(() => {
			solutionsCode.setValue($scope.starter);
			examplesCode.setValue($scope.examples);
		});
	};
	
	$scope.getKataById($scope.kataid);
	
	//Examples should be an array of objects. Returned results will be an array with the different tests and their results.
	$scope.testExamples = function () {
		var solutions = solutionsCode.getValue();
		var examples = examplesCode.getValue();
		$scope.showOutput();
		var t0 = performance.now();
		solutions = solutions
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\\n/g, " ")
			.replace(/\s+/g, " ");
		var examplesArr = [];
		examples = examples
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\n/g, ` `)
			.replace(/\s+/g, ` `);
		console.log(examples);
		mainService.testExamples(solutions, examples).then((response) => {
			var t1 = performance.now();
			$scope.answer = response.data.nest;
			console.log(response.data.nest[0]);
			$scope.time = Math.round(t1 - t0) + " ms";
			$scope.testPass = response.data.passCount;
			$scope.testFail = response.data.testCount - response.data.passCount;
		});
	};
	
	$scope.testSuite = function () {
		var solutions = solutionsCode.getValue();
		$scope.showOutput();
		var t0 = performance.now();
		solutions = solutions
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\\n/g, " ")
			.replace(/\s+/g, " ");
		mainService.testSuite(solutions, $scope.kataid).then((response) => {
			var t1 = performance.now();
			$scope.answer = response.data.nest;
			console.log(response.data.nest[0]);
			$scope.time = Math.round(t1 - t0) + " ms";
			$scope.testPass = response.data.passCount;
			$scope.testFail = response.data.testCount - response.data.passCount;

		});
	};
	
	$scope.addPointsToUser = (points, userid) => {
		mainService.addPointsToUser(mainService.pointsCalculator($scope.kyu, mainServive.user.id), mainServive.user.id)
	};
	
	$scope.submitAnswer = (solution, kataid, userid) => {
		if ($scope.passed) {
			mainService.submitAnswer(solution, kataid, userid);
		}
	}
	
});
