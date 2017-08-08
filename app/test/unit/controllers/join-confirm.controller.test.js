describe('JoinConfirmController', function() {
    var controller, scope, state;
    beforeEach(module('MyApp'));

    beforeEach(inject(function($controller, $state) {
        scope = {};
        state = $state;
        controller = $controller('JoinConfirmController', {
            $scope: scope,
            $state: state
        });
    }));

    it('should exist', function() {
        expect(controller).to.be.ok;
    });

    it('should have a function GoToFindTeam', function() {
        expect(scope.goToFindTeam).to.be.ok;
    });

    it('should make a transition to find-team state', function() {
        var spy = sinon.spy(state, 'go');
        scope.goToFindTeam();
        assert(spy.calledWith('find-team'));
    });
});