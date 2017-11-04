RocketChat.models.Users.roleBaseQuery = function(userId) {
	return { _id: userId };
};

RocketChat.models.Users.findUsersInRoles = function(roles, scope, options) {
	roles = [].concat(roles);

	const query = {
		// roles: { $in: roles } [IAN] 11/3/2017 coexist with OH roles
    messagingRoles: { $in: roles }
	};

	return this.find(query, options);
};

// [IAN] 11/3/2017 overriding these default methods
// defined in the "Base" model to use `messagingRoles`
// instead of `roles` to coexist with OH roles
RocketChat.models.Users.findRolesByUserId = function(userId/*, options*/) {
  const query = this.roleBaseQuery(userId);
  return this.find(query, { fields: { messagingRoles: 1 } });
};

RocketChat.models.Users.isUserInRole = function(userId, roleName, scope) {
  const query = this.roleBaseQuery(userId, scope);

  if (query == null) {
    return false;
  }

  query.messagingRoles = roleName;
  return !_.isUndefined(this.findOne(query));
};

RocketChat.models.Users.addRolesByUserId = function(userId, roles, scope) {
  roles = [].concat(roles);
  const query = this.roleBaseQuery(userId, scope);
  const update = {
    $addToSet: {
      messagingRoles: { $each: roles }
    }
  };
  return this.update(query, update);
};

RocketChat.models.Users.removeRolesByUserId = function(userId, roles, scope) {
  roles = [].concat(roles);
  const query = this.roleBaseQuery(userId, scope);
  const update = {
    $pullAll: {
      messagingRoles
    }
  };
  return this.update(query, update);
};
