if (_.isUndefined(RocketChat.models.Users)) {
	RocketChat.models.Users = {};
}

Object.assign(RocketChat.models.Users, {
	isUserInRole(userId, roleName) {
		const query = {
			_id: userId,
			// roles: roleName [IAN] 11/3/2017 coexist with OH roles
			messagingRoles: roleName
		};

		return !_.isUndefined(this.findOne(query));
	},

	findUsersInRoles(roles, scope, options) {
		roles = [].concat(roles);

		const query = {
			// roles: { $in: roles } [IAN] 11/3/2017 coexist with OH roles
			messagingRoles: { $in: roles }
		};

		return this.find(query, options);
	}
});
