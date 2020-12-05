import Head from 'next/head'
import React from 'react'
import { withRouter } from 'next/router'

// Components
import { GaryNavbar, ParticleEffect } from '../components/commonUI'
import { Alert, Form, Navbar, Row, Col } from 'react-bootstrap'
import styles from '../styles/UserProfile.module.css'

class UserProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			is_loading: true,
			majorEditable: true,
			minorEditable: true,
			FNEditable: true,
			LNEditable: true,
			CEditable: true,
			IGQEditable: true,
			SQEditable: true,
			formData: {
				user_name: '',
				email: '',
				first_name: '',
				last_name: '',
				intended_grad_quarter: '',
				major: '',
				minor: '',
				college: '',
				start_quarter: '',
			},
			showingAlert: false,
			alarmText: 'Error!',
			alarmSubText: 'Just error',
		}
	}
	componentDidMount() {
		// Options for the fetch request
		var formData = this.state.formData
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile'
		const options = {
			method: 'GET',
			credentials: 'include',
		}

		fetch(requestUrl, options)
			.then((response) => {
				if (response.status == 200) {
					// Success
					return response.json()
				} else if (response.status == 403) {
					//Not log in
					this.setState({
						showingAlert: true,
						alarmText: 'Not login ',
						alarmSubText: 'Please login your account.',
					})
					this.props.router.push('/login')
				} else {
					setTimeout(() => this.props.disableLoading(), 300)
					this.props.router.push('/util/error')
				}
			})
			.then((data) => {
				console.log('Success:', data) // TODO: Remove for deployment

				this.setState({ formData: data.result })
				this.setState({
					is_loading: false,
				})
			})
			.catch((error) => {
				console.error('Error:', error)
				setTimeout(() => this.props.disableLoading(), 300)
				this.props.router.push('/util/error')
			})
	}

	handleClick = (e) => {
		if (!this.validate()) {
			return
		}

		var formData = this.state.formData
		console.log('POSTing this data to server:', formData)
		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/update_profile'
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(formData),
		}
		fetch(requestUrl, options)
			.then((response) => {
				console.log(response)

				if (response.status == 200) {
					//success
				} else if (response.status == 403) {
					//not login
					this.setState({
						showingAlert: true,
						alarmText: 'Not login ',
						alarmSubText: 'Please login your account.',
					})
					this.props.router.push('/login')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
				setTimeout(() => this.props.disableLoading(), 300)
				this.props.router.push('/util/error')
			})
	}

	handleChange = (e) => {
		var formData = this.state.formData
		formData[e.target.id] = e.target.value
		this.setState({ formData })
	}

	validate() {
		const {
			user_name,
			email,
			first_name,
			last_name,
			intended_grad_quarter,
			major,
			minor,
			college,
			start_quarter,
		} = this.state.formData
	}

	render() {
		let alarmBody
		let formData = this.state.formData
		if (this.state.alarmSubText === '') {
			alarmBody = <Alert.Heading>{this.state.alarmText}</Alert.Heading>
		} else {
			alarmBody = (
				<>
					<Alert.Heading>{this.state.alarmText}</Alert.Heading>
					<div>{this.state.alarmSubText}</div>
				</>
			)
		}

		return (
			<>
				<Head>
					<title>User Profile</title>
				</Head>

				<GaryNavbar>
					<Navbar.Text>User Profile</Navbar.Text>
				</GaryNavbar>

				<div className={styles.main}>
					<br />
					<section>
						<img src="/images/profile_picture.png" width="256" height="256" />
						<div>
							<h2>Hello! {formData.user_name}</h2>
						</div>
						<br />
						<Form>
							<div class="form-row">
								<div class="col">
									<Form.Label>First Name</Form.Label>
								</div>
								<div class="col">
									<img
										id="edit"
										style={{ cursor: 'pointer' }}
										src="/images/edit.png"
										width="15"
										height="15"
										onClick={() =>
											this.setState({ FNEditable: false })
										}
									/>
								</div>
							</div>

							{this.state.FNEditable === false ? (
								<div class="form-row">
									<div class="col">
										<Form.Control
											id="first_name"
											value={formData.first_name}
											onChange={this.handleChange}
										/>
									</div>
									<div class="col">
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({ FNEditable: true }),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								formData.first_name
							)}
						</Form>
						<br />
						<Form>
							<div class="form-row">
								<div class="col">
									<Form.Label>Last Name</Form.Label>
								</div>
								<div class="col">
									<img
										id="edit"
										style={{ cursor: 'pointer' }}
										src="/images/edit.png"
										width="15"
										height="15"
										onClick={() =>
											this.setState({ LNEditable: false })
										}
									/>
								</div>
							</div>

							{this.state.LNEditable === false ? (
								<div class="form-row">
									<div class="col">
										<Form.Control
											id="last_name"
											value={formData.last_name}
											onChange={this.handleChange}
										/>
									</div>
									<div class="col">
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.handleClick()
												this.setState({ LNEditable: true })
											}}
										/>
									</div>
								</div>
							) : (
								formData.last_name
							)}
						</Form>
						<br />
						<Form>
							<div class="form-row">
								<div class="col">
									<Form.Label>Major</Form.Label>
								</div>
								<div class="col">
									<img
										id="edit"
										style={{ cursor: 'pointer' }}
										src="/images/edit.png"
										width="15"
										height="15"
										onClick={() =>
											this.setState({ majorEditable: false })
										}
									/>
								</div>
							</div>

							{this.state.majorEditable === false ? (
								<div class="form-row">
									<div class="col">
										<Form.Control
											id="major"
											value={formData.major}
											onChange={this.handleChange}
										/>
									</div>
									<div class="col">
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({ majorEditable: true }),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								formData.major
							)}
						</Form>
						<br />
						<Form>
							<div class="form-row">
								<div class="col">
									<Form.Label>Minor</Form.Label>
								</div>
								<div class="col">
									<img
										id="edit"
										style={{ cursor: 'pointer' }}
										src="/images/edit.png"
										width="15"
										height="15"
										onClick={() =>
											this.setState({ minorEditable: false })
										}
									/>
								</div>
							</div>

							{this.state.minorEditable === false ? (
								<div class="form-row">
									<div class="col">
										<Form.Control
											id="minor"
											value={formData.minor}
											onChange={this.handleChange}
										/>
									</div>
									<div class="col">
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({ minorEditable: true }),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								formData.minor
							)}
						</Form>
						<br />
						Email
						<p>{formData.email}</p>
						<br />
						<Form>
							<div class="form-row">
								<div class="col">
									<Form.Label>College</Form.Label>
								</div>
								<div class="col">
									<img
										id="edit"
										style={{ cursor: 'pointer' }}
										src="/images/edit.png"
										width="15"
										height="15"
										onClick={() =>
											this.setState({ CEditable: false })
										}
									/>
								</div>
							</div>

							{this.state.CEditable === false ? (
								<div class="form-row">
									<div class="col">
										<Form.Control
											id="college"
											value={formData.college}
											onChange={this.handleChange}
										/>
									</div>
									<div class="col">
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({ CEditable: true }),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								formData.college
							)}
						</Form>
						<br />
						Intended Graduate Quarter
						<p>{formData.intended_grad_quarter}</p>
					</section>
				</div>
				<Alert
					show={this.state.showingAlert}
					onClick={() => this.setState({ showingAlert: false })}
					variant="danger"
					className={styles.myAlert}
					dismissible>
					{alarmBody}
				</Alert>
			</>
		)
	}
}

export default withRouter(UserProfile)
