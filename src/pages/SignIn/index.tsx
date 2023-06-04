import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import validator from 'validator';

function SignIn() {
    const stringEmtpy: string = 'Vui lòng nhập trường này';
    const [username, setUsername] = useState<string>('');
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(true);
    const inputUsername = useRef<HTMLDivElement>(null);

    const [password, setPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<Boolean>(true);
    const inputPassword = useRef<HTMLDivElement>(null);
    const [typePass, setTypePass] = useState<'password' | 'text'>('password');

    //Handle Check Valid Username
    const handleCheckValidUsername = () => {
        if (validator.isEmpty(username) === true) {
            inputUsername.current!.append(stringEmtpy);
            setIsValidUsername(false);
            return;
        }
    };
    const handleFocusUsernameInput = () => {
        inputUsername.current!.innerHTML = '';
        setIsValidUsername(true);
    };

    // Handle Check Valid Password
    const handleCheckValidPassword = () => {
        if (validator.isEmpty(password) === true) {
            inputPassword.current!.innerText = stringEmtpy;
            setIsValidPassword(false);
            return;
        }
    };
    const handleFocusPasswordInput = () => {
        inputPassword.current!.innerHTML = '';
        setIsValidPassword(true);
    };

    return (
        <div className="mx-auto mt-3 px-2" style={{ maxWidth: '43.75rem' }}>
            <h2 className="text-center">Đăng nhập</h2>
            <Form className="mt-3 d-flex flex-column">
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Tên người dùng</Form.Label>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
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
                    ></Form.Text>
                </Form.Group>

                <Button
                    className="mt-3 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    Đăng nhập
                </Button>
                <div className="my-4 d-flex justify-content-center">
                    <p>Bạn chưa có tài khoản ?</p>
                    <Link to="/sign-up" className="ms-2 text-danger">
                        Đăng ký ngay
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default SignIn;
