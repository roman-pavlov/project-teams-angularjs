/**
 * Created by rpavlov on 25/12/2014.
 */
angular.module('projTeams.manageTeams.membersTab', [
    'ui.bootstrap',
    'ngRoute',
    'projTeams.services.membersService',
    'projTeams.services.teamService'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/members', {
        templateUrl: 'manageTeams/membersTab.html',
        controller: 'projTeams.manageTeams.membersTab.MembersCtrl',
        controllerAs: "ctrl"
    })
        .when('/members/:page', {
            templateUrl: 'manageTeams/membersTab.html',
            controller: 'projTeams.manageTeams.membersTab.MembersCtrl',
            controllerAs: "ctrl"
        })
}])
    .controller('projTeams.manageTeams.membersTab.MembersCtrl', ['$routeParams', 'MembersService', 'TeamService', function ($routeParams, membersService, teamService) {
        var self = this;

        var getPagesArray = function(size)
        {
            var a = [];
            for(var i = 1; i <= size; i++)
            {
                a.push(i);
            }
            return a;
        };

        var onDataLoaded = function (members) {

            self.members =  members;
            self.pages = getPagesArray(Math.ceil(members.length/self.pageSize));

        };
        self.navigatePage = function(p){
            self.pageNumber = p;
            //if(p) {
            //    $location.path("/members/" + p);
            //}
            //else
            //{
            //    $location.path("/members");
            //}

        };
        self.getMembers = function () {
            self.pageNumber = 1;
            membersService.getMembers(self.filter, onDataLoaded);
        };

        self.sortPredicate = "+name";
        self.filter = null;

        //
        self.pageSize = 25;
        var pageNum = parseInt($routeParams.page); // parse/convert human readbale page to 0- based page number
        self.pageNumber = !isNaN(pageNum) ? pageNum: 1;
        self.pages = [];

        if (self.pageNumber < 0) {
            self.pageNumber = 1
        }
        // Initial load
        self.getMembers();

        self.isSelected = function(member){
            return (teamService.getTeam()) ? teamService.getTeam().members.indexOf(member) >= 0: false;
        };

        self.addMember = function (event,member) {
            teamService.addMember(member);
            event.stopPropagation();
        };

        self.isOnActivePage = function(member, index){

            var start = (self.pageNumber - 1)* self.pageSize;

            return index >= start && index < start + self.pageSize;
        };

        self.getMemberDetails = function (member) {
            return membersService.getMemberDetails(member);
        };
    }]);



