import { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export default function Login(props) {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	//useEffect(async () => {logout();}, []);
	const history = useHistory();
	const onChangeHandler = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("here");
		await login(formData.email, formData.password);
		history.push("/");
	};
	return (
		<div className='container-fluid login'>
			<div className='col d-flex justify-content-center'>
				<Form className='form-container' onSubmit={onSubmit}>
					<Form.Group controlId='formEmail'>
						<Form.Control
							className='row input-field'
							type='email'
							name='email'
							placeholder='Your Email Address'
							size='lg'
							required
							onChange={onChangeHandler}
						/>
					</Form.Group>
					<Form.Group controlId='formPassword'>
						<Form.Control
							className='row input-field'
							type='password'
							name='password'
							placeholder='Your Password'
							size='lg'
							required
							onChange={onChangeHandler}
						/>
					</Form.Group>
					<button type='submit' className='row btn btn-outline-primary'>
						SIGN IN
					</button>
				</Form>
			</div>
		</div>
	);
}
