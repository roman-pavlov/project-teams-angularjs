/**
 * Created by rpavlov on 05/01/2015.
 */
"use strict";

angular.module('projTeams.directives.typeaheadTagManager', [
    'projTeams.services.membersService',
    'projTeams.services.teamService'
])
    .directive('typeaheadTagManager', ['MembersService','TeamService', function (membersService, teamService) {
        return {
            restrict: "A",
            scope: {
                loading: "="
            },
            link: function ($scope, $element) {

                var membersSource = function () {
                    return function typeaheadSource(query, loadedCallBack) {
                        $scope.loading = true;
                        membersService.getMembers(query, loadedCallBack);
                    };
                };

                var refreshActiveMemberTags = function(){

                    if (!teamService.getTeam()) return;

                    $element.tagsinput('removeAll');
                    for (var i = 0; i < teamService.getTeam().members.length; i++) {
                        $element.tagsinput('add', teamService.getTeam().members[i].name);
                    }
                };
                $scope.$on('membersLoaded', function () {
                    $scope.loading = false;
                });

                $scope.$on('teamUpdated', function() {
                    refreshActiveMemberTags();
                });

                $element.tagsinput({
                    //itemValue:'id',
                    //itemText:'name',
                    typeaheadjs: {
                        //name: 'members',
                        displayKey: 'name',
                        valueKey: 'name',
                        source: membersSource()
                    }
                });



                refreshActiveMemberTags();


            }
        }
    }]);