angular.module('MyApp')
  .factory('Account', function($http, $state) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        console.log($state.params);
        return $http.post('/reset/'+$state.params.token, data);
      },
      findTeam: function(data) {
          console.log($state.params);
          return $http.get('/team/find', data);
      }
    };
  });