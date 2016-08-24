# SUMMARY
This is a sample project created using AngularJs 1.38
# IMPLEMENTATION DETAILS 
## Modules:

The 'projTeams' App module depends on the three main modules:

### projTeams.teams
Implements the right area showing a list of teams with their current members.

It supports the following features implemented by the projTeams.teams.TeamsCtrl controller:
- Add team
- Expand/Collapse team
- Show team members
- Remove team member from the team

teams.html - implements the view of this module.

Dependencies:
- Members service
- Team Service


### projTeams.manageTeams.refreshTeamTab 
Implements the left area Tab 1 to refresh "active" (selected) team. 

It supports the following features:
Typeahead member candidates ( serving by typeahead-tag-manager custom directive)
Tag member candidates ( serving by typeahead-tag-manager custom directive)
Refresh team with the tagged members ( serving by projTeams.manageTeams.refreshTeamTab.RefreshTeamsCtrl controller)

refreshTeamTab.html - implements the view of this module

Dependencies:
Team Service


### projTeams.manageTeams.membersTab 
Implements the left area Tab 2 to work with all the people available.

It supports the following features:
- Asynchronous Loading/View all people
- Filter by name
- Sort by Name/Job/Grade/Age
- Adding a member to the team
- Extending with a feedback
- Basic Paging

membersTab.html - implements the view of this module
projTeams.manageTeams.membersTab.MembersCtrl - controller

Dependencies:
- Members service
- Team Service

## Services
### Members service 
Acts as all members repository with asynchronous loading and caching mechanism
Wraps $http service
Provides filtering based in AngularJS Filter filter.
Broadcasts 'membersLoaded' event (to notify subscribers when the operation has completed i.e. for  progress indicator handling)

### Team Service
Acts a shared resource of the active team (the one which is being managed)
provides required API to manage the "active" team:
Set team
Delete team member
Add team members
Refresh team

Broadcasts the 'teamUpdated' event to notify an operation has completed. The subscribers are controllers/dircetive which need to synchronize its state with the Team service state

## Custom directives
typeaheadTagManager

Created a custom directive to wrap typeaheadjs (http://twitter.github.io/typeahead.js/) and twitter bootstrap tags input directive (http://timschlechter.github.io/bootstrap-tagsinput/examples/)
This directive doesn't provide any templates but behaviour:
Initializes typeahead source using membersService;
Initializes its state based on the selected team.
Handles some useful events and updates its state


## Routing
Implemented some basic routing which works when tabs get switched.
Also there is a support a url like: /refreshTeam/{team}
and /members/{page}

When RUN please note:
the Origin Policy may not allow to request the test data
The Teams/Team members get stored in memory and won't be preserved after restart.

## Filters
Only standard AngularJS filters were used.