// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Student = require('../model/Student')

router.get('/student', (req, res) => {
	const query = req.query

	Student.find(query)
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

router.get('/student/:id', (req, res) => {
	const id = req.params.id

	Student.findById(id)
		.then(student => {
			res.json({
				confirmation: 'success',
				data: student
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				data: err.message
			})
		})
})

router.post('/student', (req, res) => {
	Student.create(req.body)
		.then(student => {
			res.json({
				confirmation: 'success',
				data: student
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
