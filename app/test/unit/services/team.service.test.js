/*jshint strict:false */
describe('ContactCtrl', function() {
    var httpBackend, TeamService;

    beforeEach(module('MyApp'));

    beforeEach(inject(function($httpBackend, _TeamService_) {
        httpBackend = $httpBackend;
        TeamService = _TeamService_;
    }));

    it('TeamService should exist', function() {
        expect(TeamService).to.be.ok;
    });

    describe('TeamService createTeam', function(){

        it('function createTeam should exist', function() {
            expect(TeamService.createTeam).to.be.ok;
        });

        // it('should return a rejected promise', function(done){
        //     //var promise = TeamService.createTeam('', {});
        //     //promise.should.not.been.fulfilled()
        //     done();
        // });
    });

});
