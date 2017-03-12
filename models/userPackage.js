//schema for user data

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


var UserPackageSchema = new Schema({
	user_status:		String,
	user_created:	Date,
	user_updated:	{type: Date, default: Date.now},
	user_role:		String,
	user_activity:		String,
	contact_info:	{
		user_name:	{
			user_first:		String,
			user_middle:	String,
			user_last:		String,
			user_preferred:	String
		},

		user_dob:	{
			dob_date:	Date
		},

		user_phone: {
			user_pref:		String,
			user_ophone:	String
		},

		user_email:			String,

		user_address: 	{
			u_line1: 	String,
			u_line2:	String,
			u_city:		String,
			u_state:	String,
			u_zip:		String
		},

		user_emergency: {
			uec_name:	String,
			uec_relationship:	String,
			uec_phone:	String
		},

	},
	hash : String,
	salt: String,


	user_documents: {
		waiver_signed:		Boolean,
		background_check:	Boolean,
		ID_badge:			Boolean,
		ID_Date:			Boolean,
	}





});

UserPackageSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserPackageSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash == hash;
};

//determine if user has vetting privilages
UserPackageSchema.methods.isVetting = function(cb) {
	if(this.user_role == "VET"  || this.user_role == "ADMIN") {
		return true;
	}
	else
		return false;
}

//determine if user has admin privilages
UserPackageSchema.methods.isAdmin = function() {
	if(this.user_role == "ADMIN") {
		return true;
	}
	else {
		return false;
	}
}

//determine if user has site agent privilages
UserPackageSchema.methods.isSite = function() {
	if(this.user_role == "SITE" || this.user_role == "ADMIN") {
		return true;
	}
	else {
		return false;
	}
}
var UserPackage = mongoose.model('UserPackage', UserPackageSchema);
module.exports = UserPackage;
