const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
	static async register(req, res, next) {
		const { username, email, password } = req.body;
		try {
			const user = await User.create({ username, email, password });

			return res.status(201).json({ id: user.id, username: user.username, email: user.email, OrganizationId: user.OrganizationId });
		} catch (error) {
			return next(error);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });

			let notValid = false;
			if (user) {
				const isValidPassword = comparePassword(password, user.password);
				if (isValidPassword) {
					const access_token = generateToken({
						id: user.id,
						email: user.email,
						username: user.username,
						OrganizationId: user.OrganizationId,
					});

					return res.status(200).json({
						id: user.id,
						email: user.email,
						username: user.username,
						OrganizationId: user.OrganizationId,
						access_token,
					});
				} else {
					notValid = true;
				}
			}

			if (notValid || user === null) {
				throw { name: 'invalidLogin' };
			}
		} catch (error) {
			return next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const user = await User.update({ ...req.body }, { where: { id: req.params.id }, returning: true });

			if (user[0]) {
				return res.status(200).json({ id: user[1][0].id, username: user[1][0].username, email: user[1][0].email, OrganizationId: user[1][0].OrganizationId });
			} else {
				throw { name: 'notFoundUser' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async byId(req, res, next) {
		try {
			const user = req.user;

			if (user) {
				return res.status(200).json({ id: user.id, username: user.username, email: user.email, OrganizationId: user.OrganizationId });
			} else {
				throw { name: 'notFoundUser' };
			}
		} catch (error) {
			next(error);
		}
	}

	static googleLogin(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
		const { google_access_token } = req.headers;
		let email_google;
		client
			.verifyIdToken({
				idToken: google_access_token,
				audience: process.env.GOOGLE_CLIENT_ID,
			})
			.then(ticket => {
				return ticket.getPayload();
			})
			.then(payload => {
				email_google = payload.email;
				return User.findOne({ where: { email: payload.email, username: payload.email.split('@')[0] } });
			})
			.then(user => {
				if (!user) {
					return User.create({
						email: email_google,
						username: email_google.split('@')[0],
						password: 'heufh77efur8ufj',
					});
				} else {
					return user;
				}
			})
			.then(user => {
				const payload = {
					id: user.id,
					email: user.email,
					username: user.username,
					OrganizationId: user.OrganizationId,
				};
				const access_token = generateToken(payload);

				return res.status(200).json({
					id: user.id,
					email: user.email,
					username: user.username,
					OrganizationId: user.OrganizationId,
					access_token,
				});
			})
			.catch(err => {
				next(err);
			});
	}
}

module.exports = UserController;
