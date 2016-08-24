/**
 * Created by rpavlov on 23/12/2014.
 */
angular.module('projTeams.teams', [
    'ui.bootstrap',
    'projTeams.services.teamService',
    'projTeams.services.membersService'
])
    .controller('projTeams.teams.TeamsCtrl', [ 'TeamService','MembersService', function(teamService, membersService){

        var self = this;
        self.team = null;
        self.teams = [];

        self.validationState = {teamAlreadyExist: false};
        //self.locationService = $location;
        self.teamService = teamService;

        var lastIndexByName = function(members, name) {
            for (var j = members.length - 1; j >= 0; j--) {
                if (members[j].name == name) return j;
            }
            return -1;
        };


        self.deleteMember = function (team, member) {
            self.teamService.deleteMember(member);
        };

        self.addTeam = function () {
            var index = lastIndexByName(self.teams, self.team.name);

            self.validationState.teamAlreadyExist = index >= 0;

            if (!self.validationState.teamAlreadyExist) {
                self.teams.push({name: self.team.name, members: [], isCollapsed: true});
                self.team.name = "";
            }

        };

        self.getMemberDetails = function (member) {
           return membersService.getMemberDetails(member);
        };
        self.teamClick = function (team) {
            toggleTeamOn(team);
            self.teamService.setTeam(team);
            //self.locationService.path('/refreshTeam/' + team.name);
        };

        var toggleTeamOn = function(team){

            if(!team.isCollapsed) return;


            for (var i = 0; i < self.teams.length; i++) {
                if(!self.teams[i].isCollapsed) {
                    self.teams[i].isCollapsed = true;
                }
            }

            team.isCollapsed = false;
        };
    }]);
