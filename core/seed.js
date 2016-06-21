"use strict";

let logger 			= require('./logger');
let config 			= require("../config");

let User 			= require("../models/user");

module.exports = function() {
	return User.find({}).exec(function(err, docs) {
		var admin, test;
		if (docs.length === 0) {
			logger.warn("Load default Users to DB...");

			let admin = new User({
				fullName: "Administrator",
				email: "admin@boilerplate-app.com",
				username: "admin",
				password: "admin1234",
				provider: "local",
				roles: ["admin", "user"]
			});

			admin.save(function(err) {
				if (err) 
					return logger.warn("Unable to create default admin user!");

				let test = new User({
					fullName: "Test User",
					email: "test@boilerplate-app.com",
					username: "test",
					password: "test1234",
					provider: "local",
					roles: ["user"]
				});
				
				test.save(function() {
					if (err) 
						return logger.warn("Unable to create default admin user!");
					
					logger.info("Default users created!");
				});

			});
		}
	});
};