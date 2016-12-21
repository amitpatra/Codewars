/************* MAIN SERVICE ***************/

angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

this.user = {}

// POST
  this.testExamples = (solution, examples) => {
    return $http({
      method: 'POST',
      url: `http://192.168.0.186:3030/api/test/examples`,
      data: {
        script: solution,
        examples: examples
      }
    });
  };

  this.testSuite = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/api/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

  this.setSolution = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/api/solution/` + kataid,
      data: {
         script: solution
      }
    });
  };


// GET
  this.getUser = () => {
    return $http({
      method: 'GET',
      url: `/api/me`
    })
  }

  this.getKatas = () => {
    return $http({
      method: 'GET',
      url: `/api/katas`
    });
  };

  // homeCtrl - displaying one kata withing range
  this.getRandomKata = (id) => { // eventually we will want it to return a random kata based on the users experience. THAT IS WHY THERE IS AN ID PARAM
    return $http({
      method: 'GET',
      url: `/api/random-kata` 
    });
  };

  // trainingCtrl
  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/kata/` + kataid
    });
  };

  //kata_listCtrl
    // this.getRandomKatas (userid)
    // this.searchKatasByName (input)

  // kata_listCtrl
  this.getKatasByKyu = (kyu) => {
    return $http({
      method: 'GET',
      url: `/api/katas-by-kyu` + kyu 
    });
  };

  // solutionsCtrl 
  this.getKataSolutions = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/solutions/` + kataid
    });
  };

  // profileCtrl - brings back a specific users kata information (script, name, kyu, description) - use on kata tab soltion tab
  this.getUserKatas = () => {
    return $http({
      method: 'GET',
      url: `/api/get-user-katas`
    });
  };




});
