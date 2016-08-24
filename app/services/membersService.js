/**
 * Created by rpavlov on 05/01/2015.
 */
"use strict";

angular.module('projTeams.services.membersService', [])
    .service('MembersService', ['$http', '$rootScope','filterFilter', function ($http, $rootScope,filterFilter) {
        var self = this;

        self.allMembers = null;
        self.query = null;
        function queryMembers() {
            return $http.get('https://raw.githubusercontent.com/javascript-awesome/angular-911/master/datasources/staff.json');
        }

        function filterMembers(query, callBack){
            var results = filterFilter(self.allMembers, {name: query});
            if(typeof callBack !== 'undefined')
            {
                callBack(results);
            }
            return results;
        }
        self.getMembers = function (query, loadedCallback) {

            self.query = query;
            if (!self.allMembers) {
                return queryMembers()
                    .then(function (response) {
                        self.allMembers = response.data;
                        $rootScope.$broadcast('membersLoaded');
                        return query ? filterMembers(self.query,loadedCallback): loadedCallback(self.allMembers);
                    });
            }
            else {
                $rootScope.$broadcast('membersLoaded');
                return self.query ? filterMembers(self.query,loadedCallback): loadedCallback(self.allMembers);

            }
        };

        self.getTheOnlyMember = function(memberName)
        {
            var members = self.getMembers(memberName);

            if(members.length > 1)
            {
                throw "Found more than one members"
            }

            return (members.length == 1) ? members[0] : null;
        }

        self.getMemberDetails = function (member) {
            return "Grade: " + member.grade + "; Job: " + member.job + ((member.feedback)?"; Feedback:" + member.feedback:"");
        };
    }]);