const User = require('../models/user');

module.exports = function(req, res, next){
   User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			else if (user) {
				res.locals.user = user; 
				return next();
			}
			else {
				let userModel = new User({
						name: req.body.name,
						surname: req.body.surname,
						email: req.body.email,
						jobTitle: req.body.jobTitle,
						username: req.body.email.split("@")[0],
						imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTSsJ6EnBZtfR8HdfMz4cFSyPBrE6JBuBfk2-WleX9xFNrvVW7np7oq6Ms",
						isAdmin: true
				});

				userModel.save((err, userSaved) => {
					if (err) {
						return res.status(500).json({ error: err });
					}
					else {
						res.locals.user = userSaved;
						next();
					}
				});
			}
	});
};