// React and Next
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Image from 'next/image';

// Components
import { Form, Button, Navbar, Alert } from 'react-bootstrap';
import { GaryNavbar, ParticleEffect } from '../components/commonUI';
import LoadingOverlay from 'react-loading-overlay';

// Styles
import styles from '../styles/Register.module.css'

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: "",
				pwd: "",	
			},
			isLoading: false,
			loadingText: "Please Wait",
			showingAlert: false,
		}
	}


	// Invoked when the user hit click
	handleClick = (e) => {
		// First, enable loading animation
		this.setState({isLoading: true})

		console.log("POSTing this data to server:", JSON.stringify(this.state));

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/login';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // Everything account related
			body: JSON.stringify(this.state.formData),
		};

		fetch(requestUrl, options)
		.then(response => {
			const data = response.json();

			if (response.status == 200) {
				// User successfully created
				this.setState({loadingText: "Success! Redirecting..."})

				this.props.router.push('/temp/testProfile');
			} else if (response.status == 300) {
				// User Already Existed!
				this.setState({showingAlert: true})
			} else {
				// Server issue
				this.setState({showingAlert: true})
			}
			setTimeout(() => this.setState({isLoading: false}), 1000);
			console.log('Success:', data); // TODO: Remove for deployment
		})
		.catch((error) => {
			console.error('Error:', error);
			// this.setState({isLoading: false});
		});
	}

	
	// Invoked everytime the value in the two textboxes changes
	handleChange = (e) => {
		this.setState({
			formData: {
				[e.target.id]: e.target.value
			}
		});
	}

	render() {
		return (
			<>
				<Head>
					<title>Log in</title>
				</Head>



				<div className={styles.outer}>

					<GaryNavbar>
						<Navbar.Text>Log in</Navbar.Text>
					</GaryNavbar>

					<ParticleEffect />
	
					{/* Start of the login component */}

					<div className={styles.loginWrapper} >
						<div className={styles.login}>
							<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
								<a href="/intro">
									<Image
										id="loginlogo"
										src="/logo/PCLogo-Color.svg"
										height="70"
										width="49"
										alt="logo"
										className=""
									/>
								</a>
								<h3 className="mt-3 ml-1" style={{ paddingLeft: '10px' }}>
									Gary <br /> Planner
								</h3>
							</Form.Group>

							<h3>Log in</h3>
							<Form>
								{/* Here are the two credentials */}
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control 
										type="text"
										value={this.state.formData.email}
										onChange={this.handleChange}
									/>
								</Form.Group>
			
								<Form.Group controlId="pwd">
									<Form.Label >Passowrd</Form.Label>
									<Form.Control 
										type="password"
										value={this.state.formData.pwd}
										onChange={this.handleChange}
									/>
								</Form.Group>
			
								<Form.Group>
									<Form.Label>
										<Form.Check
											type="checkbox"
											name="remember"
											label="Remember me"
										/>
									</Form.Label>
								</Form.Group>
			
								<Form.Group>
									<Form.Text style={{ fontSize: '.85rem' }}>
										New to GaryPlanner?{' '}
										<Link href="/signup" >
											<a style={{ color: '#0067b8' }}>
												Create an account
											</a>
										</Link>
									</Form.Text>
								</Form.Group>
								<div style={{ textAlign: 'right' }}>
									<Button
										value="submit"
										onClick={this.handleClick}
									>
										Login
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>


				<Alert 
					show={this.state.showingAlert} 
					onClick={() => this.setState({showingAlert: false})} 
					variant='danger'
					className='alert'
					dismissible
				>
					<Alert.Heading>Email and password doesn't match!</Alert.Heading>
					<p>Have you registered?</p>
				</Alert>
			</>
		)
	}
}

export default withRouter(Login);