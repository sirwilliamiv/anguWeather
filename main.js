



  // Initialize Firebase



angular
.module('anguweathar', ['ngRoute'])
.config(($routeProvider)=> {
   firebase.initializeApp({
    apiKey: "AIzaSyBCoNFSPsc6RxWrkrbRUDgPrmgjjlDltAg",
    authDomain: "anguweather-d6a57.firebaseapp.com",
    databaseURL: "https://anguweather-d6a57.firebaseio.com",
    storageBucket: "anguweather-d6a57.appspot.com",
    messagingSenderId: "295727730664"
  });
const checkForAuth = {
  checkForAuth:  function  ($location){
    // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
     const unsuscribe = firebase.auth().onAuthStateChanged(user => {
        unsuscribe()
          if(!user) {
            $location.url('/')
          }
      })
    }
  }

  $routeProvider
  .when('/', {
    controller: 'RootCtrl',
    templateUrl: '/partials/root.html'
  })
  .when('/weather/:zipcode', {
    controller:'WeatherCtrl',
    templateUrl:'/partials/weather.html',
    resolve: checkForAuth
      })
    })



.controller('RootCtrl', function ($scope, $location) {
  $scope.gotoWeather = ()=> $location.url(`/weather/${$scope.zip}`)


}).controller('WeatherCtrl', function ($routeParams,$scope, weatherFactory) {
  console.log('I am a weather controller')

  weatherFactory.getWeather($routeParams.zipcode)
  .then((weather) => {
    $scope.temperature = weather.temp
    $scope.city = weather.city
  })
})

  .factory('weatherFactory', ($http) => {
      return {
        getWeather (zipcode) {
            return $http.
            get(`http://api.wunderground.com/api/a1249dabec6b07ed/conditions/q/${zipcode}.json`)
            .then((response) => {
              return {
            temp: response.data.current_observation.temp_f,
            city: response.data.current_observation.display_location.full,
          }
        })

      },

      }

})
  .factory('authFactory',($q)=> {
    return {
      login (email,password) {
        return $q.resolve(firebase.signInwithEmailAndPassword(email,password)) //<== turns ES6 promise into angular promise, no scope apply needed
      }
      getUserId () {
        return firebase.auth().currentUser.uid

      }
    }
  })
