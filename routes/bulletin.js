var express = require('express');

var models  = require('../models/index');
var Post    = models.post;

var router  = express.Router();

// Index.
router.get('/', function(request, response) {
	Post.findAll().then(function(posts) {
		response.render('bulletin/index', {
			posts: posts
		});
	});
});

// Search.
router.get('/search', function(request, response) {
	var query     = request.query.query;
	var condition = `%${query}%`;

	Post.findAndCountAll({
		where: {
			$or: {
				title: {
					$iLike: condition
				},
				body: {
					$iLike: condition
				}
			}
		}
	}).then(function(result) {
		response.render('bulletin/search', {
			query: query,
			count: result.count,
			posts: result.rows
		});
	});
});

// Create.
router.post('/', function(request, response) {
	Post.create({
		title: request.body.title,
		body:  request.body.body,
		slug:  request.body.slug
	}).then(function(post) {
		response.redirect(post.url);
	});
});

// New.
router.get('/new', function(request, response) {
	response.render('bulletin/new');
});

// Show.
router.get('/:slug', function(request, response) {
	Post.findOne({
		where: {
			slug: request.params.slug
		}
	}).then(function(post) {
		response.render('bulletin/show', {
			post: post
		});
	});
});

module.exports = router;
