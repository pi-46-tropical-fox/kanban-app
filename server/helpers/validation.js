// const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validatePassword(password) {
	if (password.length < 8) {
		throw new Error('Password must be more than 8 characters');
	}

	return true;
}

function validateEmail(email) {
	if (!emailRegex.test(email)) {
		throw new Error('Invalid Email');
	}

	return true;
}

module.exports = { validatePassword, validateEmail };
