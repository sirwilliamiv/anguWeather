
angular
.module('anguweathar', ['ngRoute'])
.config(($routeProvider)=> {
  $routeProvider
  .when('/', {
    controller: 'RootCtrl',
    templateUrl: '/partials/root.html'
  })
  .when('/weather/:zipcode', {
    controller:'WeatherCtrl',
    templateUrl:'/partials/weather.html'

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
