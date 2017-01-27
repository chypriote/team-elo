import {bindable} from 'aurelia-framework';
import {TeamsAPI} from '../utility/teamsAPI';

export class PlayerTeam {
	@bindable team;
	@bindable pid;
	api = new TeamsAPI();
	selectedTeam;
	edition; available;

	edit() {
		if (!this.available)
			this.api.getTeams().then(data => this.available = data);
		this.edition = !this.edition;
	}

	removeTeam() {
		let vm = this;
		this.api.addTeamToPlayer(vm.pid, 0).then(
			function(data) {
				vm.team = null;
			}
		);
	}

	addTeam() {
		let vm = this;
		this.api.addTeamToPlayer(vm.pid, vm.selectedTeam.id).then(
			function(data) {
				vm.team = data;
				if (vm.team.logo) {
					vm.team.image = '/assets/teams/192/' + vm.team.logo + '.png';
				}
				vm.edition = !vm.edition;
			}
		);
	}
}
