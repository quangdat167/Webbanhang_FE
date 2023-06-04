/* eslint-disable react-hooks/exhaustive-deps */
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import validator from 'validator';

function SignUp() {
    const textWarningPass: string =
        'Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số';
    const stringEmtpy: string = 'Vui lòng nhập trường này';

    const [username, setUsername] = useState<string>('');
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(true);
    const inputUsername = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<Boolean>(true);
    const inputEmail = useRef<HTMLDivElement>(null);

    const [password, setPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<Boolean>(true);
    const inputPassword = useRef<HTMLDivElement>(null);
    const [typePass, setTypePass] = useState<'password' | 'text'>('password');

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<Boolean>(true);
    const inputPasswordConfirm = useRef<HTMLDivElement>(null);
    const [typePassConfirm, setTypePassConfirm] = useState<'password' | 'text'>('password');

    // Handle Check Valid Email
    const handleCheckValidEmail = () => {
        if (inputEmail.current) {
            if (validator.isEmpty(email) === true) {
                inputEmail.current.append(stringEmtpy);
                setIsValidEmail(false);
                return;
            }
            if (validator.isEmail(email) === false) {
                const stringFalseEmail = 'Vui lòng nhập địa chỉ email chính xác';
                inputEmail.current.append(stringFalseEmail);
                setIsValidEmail(false);
            } else {
                inputEmail.current.innerHTML = '';
                setIsValidEmail(true);
            }
        }
    };
    const handleFocusEmailInput = () => {
        if (inputEmail.current) {
            inputEmail.current.innerHTML = '';
            setIsValidEmail(true);
        }
    };

    // Handle Check Valid Password
    const handleCheckValidPassword = () => {
        if (inputPassword.current) {
            if (validator.isEmpty(password) === true) {
                inputPassword.current.innerText = stringEmtpy;
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
                setIsValidPassword(false);
            } else {
                setIsValidPassword(true);
            }
        }
    };
    const handleFocusPasswordInput = () => {
        if (inputPassword.current) {
            inputPassword.current.innerHTML = textWarningPass;
            setIsValidPassword(true);
        }
    };

    // Handle Check Valid Password Confirm
    const handleCheckValidPasswordConfirm = () => {
        if (inputPasswordConfirm.current) {
            if (validator.isEmpty(passwordConfirm) === true) {
                inputPasswordConfirm.current.append(stringEmtpy);
                setIsValidPasswordConfirm(false);
                return;
            }
            if (password !== passwordConfirm) {
                const stringFalsePass = 'Mật khẩu nhập lại không đúng';
                inputPasswordConfirm.current.append(stringFalsePass);
                setIsValidPasswordConfirm(false);
            } else {
                inputPasswordConfirm.current.innerHTML = '';
                setIsValidPasswordConfirm(true);
            }
        }
    };

    const handleFocusPasswordConfirmInput = () => {
        if (inputPasswordConfirm.current) {
            inputPasswordConfirm.current.innerHTML = '';
            setIsValidPasswordConfirm(true);
        }
    };

    useEffect(() => {
        if (passwordConfirm) {
            if (password !== passwordConfirm) {
                const stringFalsePass = 'Mật khẩu nhập lại không đúng';
                if (inputPasswordConfirm.current?.innerText === stringFalsePass) {
                    return;
                }
                inputPasswordConfirm.current?.append(stringFalsePass);
                setIsValidPasswordConfirm(false);
            } else {
                inputPasswordConfirm.current!.innerHTML = '';
                setIsValidPasswordConfirm(true);
            }
        }
    }, [password]);

    //Handle Check Valid Username
    const handleCheckValidUsername = () => {
        if (inputUsername.current) {
            if (validator.isEmpty(username) === true) {
                inputUsername.current.append(stringEmtpy);
                setIsValidUsername(false);
                return;
            }
        }
    };
    const handleFocusUsernameInput = () => {
        if (inputUsername.current) {
            inputUsername.current.innerHTML = '';
            setIsValidUsername(true);
        }
    };

    return (
        <div className="mx-auto mt-3 px-2" style={{ maxWidth: '43.75rem' }}>
            <h2 className="text-center">Đăng ký tài khoản</h2>
            <Form className="mt-3 d-flex flex-column">
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Nhập tên người dùng</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleCheckValidUsername}
                        onFocus={handleFocusUsernameInput}
                        className={`${isValidUsername ? '' : 'border-danger'}`}
                    />
                    <Form.Text
                        ref={inputUsername}
                        className={`${isValidUsername ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Nhập mật khẩu</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={typePass}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleCheckValidPassword}
                            onFocus={handleFocusPasswordInput}
                            className={`${isValidPassword ? '' : 'border-danger'}`}
                        />
                        {typePass === 'password' && (
                            <span onClick={() => setTypePass('text')}>
                                <FontAwesomeIcon
                                    className="position-absolute top-50 end-2 translate-middle-y"
                                    icon={faEye}
                                    style={{ color: 'var(--primary)' }}
                                />
                            </span>
                        )}
                        {typePass === 'text' && (
                            <span onClick={() => setTypePass('password')}>
                                <FontAwesomeIcon
                                    className="position-absolute top-50 end-2 translate-middle-y"
                                    icon={faEyeSlash}
                                    style={{ color: 'var(--primary)' }}
                                />
                            </span>
                        )}
                    </div>
                    <Form.Text
                        ref={inputPassword}
                        className={`${isValidPassword ? '' : 'text-danger'}`}
                    >
                        Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={typePassConfirm}
                            placeholder="Password"
                            name="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            onBlur={handleCheckValidPasswordConfirm}
                            onFocus={handleFocusPasswordConfirmInput}
                            className={`${isValidPasswordConfirm ? '' : 'border-danger'}`}
                        />
                        {typePassConfirm === 'password' && (
                            <span onClick={() => setTypePassConfirm('text')}>
                                <FontAwesomeIcon
                                    className="position-absolute top-50 end-2 translate-middle-y"
                                    icon={faEye}
                                    style={{ color: 'var(--primary)' }}
                                />
                            </span>
                        )}
                        {typePassConfirm === 'text' && (
                            <span onClick={() => setTypePassConfirm('password')}>
                                <FontAwesomeIcon
                                    className="position-absolute top-50 end-2 translate-middle-y"
                                    icon={faEyeSlash}
                                    style={{ color: 'var(--primary)' }}
                                />
                            </span>
                        )}
                    </div>
                    <Form.Text
                        ref={inputPasswordConfirm}
                        className={`${isValidPasswordConfirm ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Nhập địa chỉ email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleCheckValidEmail}
                        onFocus={handleFocusEmailInput}
                        className={`${isValidEmail ? '' : 'border-danger'}`}
                    />
                    <Form.Text
                        className={`${isValidEmail ? '' : 'text-danger'}`}
                        ref={inputEmail}
                    ></Form.Text>
                </Form.Group>
                <Button
                    className="mt-3 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    Đăng ký
                </Button>
                <div className="my-4 d-flex justify-content-center">
                    <p>Bạn đã có tài khoản ?</p>
                    <Link to="/sign-in" className="ms-2 text-danger">
                        Đăng nhập ngay
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default SignUp;
