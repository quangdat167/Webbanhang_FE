/* eslint-disable react-hooks/exhaustive-deps */
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { loginReducer } from 'redux/reducer/userinfo';
import { loginApi } from 'service/authen.service';
import validator from 'validator';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import Config from 'utils/Config';

function SignUp() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfoState);
    const textWarningPass: string =
        'Password must have more than 8 characters, at least 1 lowercase letter, 1 uppercase letter, 1 number';
    const stringEmtpy: string = 'Please enter this field';

    const [loading, setLoading] = useState<Boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isBorderNoneUsername, setIsBorderNoneUsername] = useState<Boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
    const inputUsername = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState<string>('');
    const [isBorderNoneEmail, setIsBorderNoneEmail] = useState<Boolean>(true);
    const [isValidEmail, setIsValidEmail] = useState<Boolean>(false);
    const inputEmail = useRef<HTMLDivElement>(null);

    const [password, setPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<Boolean>(false);
    const [isBorderNonePassword, setIsBorderNonePassword] = useState<Boolean>(true);
    const inputPassword = useRef<HTMLDivElement>(null);

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<Boolean>(false);
    const [isBorderNonePasswordConfirm, setIsBorderNonePasswordConfirm] = useState<Boolean>(true);
    const inputPasswordConfirm = useRef<HTMLDivElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    // Handle Check Valid Email
    const handleCheckValidEmail = () => {
        if (inputEmail.current) {
            if (validator.isEmpty(email) === true) {
                inputEmail.current.innerText = stringEmtpy;
                setIsBorderNoneEmail(false);
                setIsValidEmail(false);
                return;
            }
            if (validator.isEmail(email) === false) {
                const stringFalseEmail = 'Please enter correct email address';
                inputEmail.current.innerText = stringFalseEmail;
                setIsBorderNoneEmail(false);
                setIsValidEmail(false);
            } else {
                inputEmail.current.innerHTML = '';
                setIsBorderNoneEmail(true);
                setIsValidEmail(true);
            }
        }
    };
    const handleFocusEmailInput = () => {
        if (inputEmail.current) {
            inputEmail.current.innerHTML = '';
            setIsBorderNoneEmail(true);
        }
    };

    // Handle Check Valid Password
    const handleCheckValidPassword = () => {
        if (inputPassword.current) {
            if (validator.isEmpty(password) === true) {
                inputPassword.current.innerText = stringEmtpy;
                setIsBorderNonePassword(false);
                setIsValidPassword(false);
                return;
            }
            if (
                validator.isStrongPassword(password, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                }) === false
            ) {
                setIsBorderNonePassword(false);
                setIsValidPassword(false);
            } else {
                setIsBorderNonePassword(true);
                setIsValidPassword(true);
            }
        }
    };
    const handleFocusPasswordInput = () => {
        if (inputPassword.current) {
            inputPassword.current.innerHTML = textWarningPass;
            setIsBorderNonePassword(true);
        }
    };

    // Handle Check Valid Password Confirm
    const handleCheckValidPasswordConfirm = () => {
        if (inputPasswordConfirm.current) {
            if (validator.isEmpty(passwordConfirm) === true) {
                inputPasswordConfirm.current.innerText = stringEmtpy;
                setIsBorderNonePasswordConfirm(false);
                setIsValidPasswordConfirm(false);
                return;
            }
            if (password !== passwordConfirm) {
                const stringFalsePass = 'Confirm password is incorrect';
                inputPasswordConfirm.current.innerText = stringFalsePass;
                setIsBorderNonePasswordConfirm(false);
                setIsValidPasswordConfirm(false);
            } else {
                inputPasswordConfirm.current.innerHTML = '';
                setIsBorderNonePasswordConfirm(true);
                setIsValidPasswordConfirm(true);
            }
        }
    };

    const handleFocusPasswordConfirmInput = () => {
        if (inputPasswordConfirm.current) {
            inputPasswordConfirm.current.innerHTML = '';
            setIsBorderNonePasswordConfirm(true);
        }
    };

    // Handle condition PasswordConfirm and Password
    useEffect(() => {
        if (passwordConfirm) {
            if (password !== passwordConfirm) {
                const stringFalsePass = 'Confirm password is incorrect';
                inputPasswordConfirm.current!.innerText = stringFalsePass;
                setIsBorderNonePasswordConfirm(false);
                setIsValidPasswordConfirm(false);
            } else {
                inputPasswordConfirm.current!.innerHTML = '';
                setIsBorderNonePasswordConfirm(true);
                setIsValidPasswordConfirm(true);
            }
        }
    }, [password]);

    //Handle Check Valid Username
    const handleCheckValidUsername = () => {
        if (inputUsername.current) {
            if (validator.isEmpty(firstName) === true) {
                inputUsername.current.innerText = stringEmtpy;
                setIsBorderNoneUsername(false);
                setIsValidUsername(false);
            }
        }
    };

    useEffect(() => {
        if (firstName.length > 0) {
            setIsValidUsername(true);
        }
    }, [firstName]);

    const handleFocusUsernameInput = () => {
        if (inputUsername.current) {
            inputUsername.current.innerHTML = '';
            setIsBorderNoneUsername(true);
        }
    };

    // Handle valid form before submit
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        handleCheckValidEmail();
        handleCheckValidPassword();
        handleCheckValidPasswordConfirm();
        handleCheckValidUsername();
        if (isValidUsername && isValidEmail && isValidPassword && isValidPasswordConfirm) {
            setLoading(true);
            // Gọi API xử lý đăng ký

            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed up
                    // let user = userCredential.user;
                    let user = await loginApi({
                        firstName,
                        lastName,
                        password,
                        email,
                    });
                    dispatch(loginReducer(user));
                    window.location.reload();
                })
                .catch((error) => {
                    alert('Sign up failed');
                });

            setLoading(false);
        }
    };

    return !userInfo?.email ? (
        <div className="mx-auto px-2" style={{ maxWidth: '30rem', marginTop: 100 }}>
            <h2 className="text-center">Sign Up</h2>
            <Form className="mt-5 d-flex flex-column" ref={formRef} onSubmit={handleSubmitForm}>
                <Form.Group as={Row} className="mb-3" controlId="formGroupUsername">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={handleCheckValidUsername}
                            onFocus={handleFocusUsernameInput}
                            className={`${isBorderNoneUsername ? '' : 'border-danger'}`}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={handleFocusUsernameInput}
                        />
                    </Col>
                    <Form.Text
                        ref={inputUsername}
                        className={`${isBorderNoneUsername ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    {/* <Form.Label>Nhập địa chỉ email</Form.Label> */}
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleCheckValidEmail}
                        onFocus={handleFocusEmailInput}
                        className={`${isBorderNoneEmail ? '' : 'border-danger'}`}
                    />
                    <Form.Text
                        className={`${isBorderNoneEmail ? '' : 'text-danger'}`}
                        ref={inputEmail}
                    ></Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formGroupPassword">
                    {/* <Form.Label>Nhập mật khẩu</Form.Label> */}
                    <div className="position-relative mb-1">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleCheckValidPassword}
                            onFocus={handleFocusPasswordInput}
                            className={`${isBorderNonePassword ? '' : 'border-danger'}`}
                        />
                    </div>
                    <Form.Text
                        ref={inputPassword}
                        className={`fs-12 ${isBorderNonePassword ? '' : 'text-danger'}`}
                    >
                        {textWarningPass}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
                    <div className="position-relative">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            onBlur={handleCheckValidPasswordConfirm}
                            onFocus={handleFocusPasswordConfirmInput}
                            className={`${isBorderNonePasswordConfirm ? '' : 'border-danger'}`}
                        />
                    </div>
                    <Form.Text
                        ref={inputPasswordConfirm}
                        className={`${isBorderNonePasswordConfirm ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>

                <Button
                    className="h-100 mt-3 py-3 fs-5 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    {loading ? (
                        <Spinner animation="border" variant="light" className="fs-5" />
                    ) : (
                        <span>Sign up</span>
                    )}
                </Button>
                <div className="my-3 d-flex justify-content-center">
                    <p>Already a member?</p>
                    <Link to={RouteConfig.SIGN_IN} className="ms-2 text-danger">
                        Login
                    </Link>
                </div>
            </Form>
        </div>
    ) : (
        <Navigate
            to={
                userInfo.role === Config.USER_ROLE_ADMIN ? RouteConfig.ADMIN_HOME : RouteConfig.HOME
            }
        />
    );
}

export default SignUp;
