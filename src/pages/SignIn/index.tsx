import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import validator from 'validator';
import * as authenService from 'service/authenService';

function SignIn() {
    const stringEmtpy: string = 'Vui lòng nhập trường này';

    const [loading, setLoading] = useState<Boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [isBorderNoneUsername, setIsBorderNoneUsername] = useState<Boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
    const inputUsername = useRef<HTMLDivElement>(null);

    const [password, setPassword] = useState<string>('');
    const [isBorderNonePassword, setisBorderNonePassword] = useState<Boolean>(true);
    const [isValidPassword, setIsValidPassword] = useState<Boolean>(false);
    const inputPassword = useRef<HTMLDivElement>(null);
    const [typePass, setTypePass] = useState<'password' | 'text'>('password');

    const formRef = useRef<HTMLFormElement>(null);

    //Handle Check Valid Username
    const handleCheckValidUsername = () => {
        if (validator.isEmpty(username) === true) {
            inputUsername.current!.innerText = stringEmtpy;
            setIsBorderNoneUsername(false);
            setIsValidUsername(false);
        }
    };
    useEffect(() => {
        if (username.length > 0) {
            setIsValidUsername(true);
        }
    }, [username]);
    const handleFocusUsernameInput = () => {
        inputUsername.current!.innerHTML = '';
        setIsBorderNoneUsername(true);
    };

    // Handle Check Valid Password
    const handleCheckValidPassword = () => {
        if (validator.isEmpty(password) === true) {
            inputPassword.current!.innerText = stringEmtpy;
            setisBorderNonePassword(false);
            setIsValidPassword(false);
        }
    };
    useEffect(() => {
        if (password.length > 0) {
            setIsValidPassword(true);
        }
    }, [password]);
    const handleFocusPasswordInput = () => {
        inputPassword.current!.innerHTML = '';
        setisBorderNonePassword(true);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        handleCheckValidUsername();
        handleCheckValidPassword();
        if (isValidPassword && isValidUsername) {
            setLoading(true);
            // Gọi API xử lý đăng nhập
            try {
                const result = await authenService.signIn({
                    username,
                    password,
                });
                // Xử lý phản hồi từ server sau khi đăng nhập thành công
                if (result) {
                    console.log(result);
                    // window.location.href = 'http://localhost:3000';
                }
                setLoading(false);
            } catch (error: any) {
                console.error(new Error(error.message)); // Xử lý lỗi khi đăng nhập không thành công
                setLoading(false);
            }
        }
    };

    return (
        <div className="mx-auto mt-3 px-2" style={{ maxWidth: '43.75rem' }}>
            <h2 className="text-center">Đăng nhập</h2>
            <Form className="mt-3 d-flex flex-column" ref={formRef} onSubmit={handleSubmitForm}>
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
                        className={`${isBorderNoneUsername ? '' : 'border-danger'}`}
                    />
                    <Form.Text
                        ref={inputUsername}
                        className={`${isBorderNoneUsername ? '' : 'text-danger'}`}
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
                            className={`${isBorderNonePassword ? '' : 'border-danger'}`}
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
                        className={`${isBorderNonePassword ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>

                <Button
                    className="mt-3 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    {loading ? (
                        <Spinner animation="border" variant="light" className="fs-5" />
                    ) : (
                        <span>Đăng nhập</span>
                    )}
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
