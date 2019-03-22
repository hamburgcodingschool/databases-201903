// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Student = require('../model/Student')

router.get('/student', (req, res) => {
	Student.find()
		.then(students => {
			res.json({
				confirmation: 'success',
				data: students
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				data: err.message
			})
		})
})



module.exports = router
