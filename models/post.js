module.exports = function(sequelize, Sequelize) {
	return(sequelize.define('post', {
		title: Sequelize.STRING,
		body:  Sequelize.TEXT,
		slug:  Sequelize.STRING
	}, {
		defaultScope: {
			order: [['createdAt', 'DESC']]
		},
	  getterMethods: {
			url: function() {
				return(`/bulletin/${this.slug}`);
			}
	  }
	}));
};
