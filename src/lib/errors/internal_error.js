module.exports = function InternalError() {
	this.error = 'internal_server_error';
	this.status_code = 500;
	this.error_description = 'Internal server error';
};
