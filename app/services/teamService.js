/**
 * Created by rpavlov on 05/01/2015.
 * Test comment - for git
 */
"use strict";

angular.module('projTeams.services.teamService', [])
    .service('TeamService', ['$rootScope','$window','MembersService', function ($rootScope,$window,membersService) {
        var self = this;

        var activeTeam = null;

        self.refreshTeam = function(members)
        {
            if(!angular.isArray(members)) return;

            if(!activeTeam){
                $window.alert("Select team first please.");
                return;
            }

            activeTeam.members.length = 0;


            for (var i = 0; i < members.length; i++) {
                if(angular.isString(members[i])) {
                    try {
                        var memberObj = membersService.getTheOnlyMember(members[i]);

                        if(memberObj){
                            activeTeam.members.push(memberObj);
                        }
                    }
                    catch(err)
                    {
                        console.error(err);
                    }
                }
                else
                {
                    activeTeam.members.push(members[i]);
                }
            }

            $rootScope.$broadcast('teamUpdated',activeTeam);
        };

        self.deleteMember = function(member){

            if(!activeTeam){
                $window.alert("Select team first please.");
                return;
            }
            deleteItem(activeTeam.members, member);
            $rootScope.$broadcast('teamUpdated',activeTeam);
        };

        self.addMember = function(member){

            if(!activeTeam){
                $window.alert("Select team first please.");
                return;
            }
            activeTeam.members.push(member);
            $rootScope.$broadcast('teamUpdated',activeTeam);
        };

        self.setTeam = function(team){
            activeTeam = team;
            $rootScope.$broadcast('teamUpdated',activeTeam);
        };
        self.getTeam = function(){
            return activeTeam;
        };
        function deleteItem(items, item){
            var index = items.lastIndexOf(item);
            if (index >= 0) {
                items.splice(index, 1);
            }
            return index
        }

    }]);