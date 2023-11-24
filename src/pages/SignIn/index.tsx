import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../../firebaseConfig/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import validator from 'validator';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';

function SignIn() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const stringEmtpy: string = 'Vui lòng nhập trường này';

    const [loading, setLoading] = useState<Boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [isBorderNoneUsername, setIsBorderNoneUsername] = useState<Boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
    const inputUsername = useRef<HTMLDivElement>(null);

    const [password, setPassword] = useState<string>('');
    const [isBorderNonePassword, setisBorderNonePassword] = useState<Boolean>(true);
    const [isValidPassword, setIsValidPassword] = useState<Boolean>(false);
    const inputPassword = useRef<HTMLDivElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    //Handle Check Valid Username
    const handleCheckValidUsername = () => {
        if (inputUsername.current) {
            if (validator.isEmpty(email) === true) {
                inputUsername.current!.innerText = stringEmtpy;
                setIsBorderNoneUsername(false);
                setIsValidUsername(false);
            }
            if (validator.isEmail(email) === false) {
                const stringFalseEmail = 'Please enter correct email address';
                inputUsername.current.innerText = stringFalseEmail;
                setIsBorderNoneUsername(false);
                setIsValidUsername(false);
            }
        }
    };
    useEffect(() => {
        if (email.length > 0) {
            setIsValidUsername(true);
        }
    }, [email]);
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
                await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                    })
                    .catch((error) => {
                        alert('Sign in failed');
                    });

                setLoading(false);
            } catch (error: any) {
                console.error(new Error(error.message)); // Xử lý lỗi khi đăng nhập không thành công
                setLoading(false);
            }
        }
    };

    return !userInfo?.email ? (
        <div className="mx-auto px-2" style={{ maxWidth: '30rem', marginTop: 100 }}>
            <h2 className="text-center">Sign In</h2>
            <Form className="mt-3 d-flex flex-column" ref={formRef} onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleCheckValidUsername}
                        onFocus={handleFocusUsernameInput}
                        className={`${isBorderNoneUsername ? '' : 'border-danger'}`}
                    />
                    <Form.Text
                        ref={inputUsername}
                        className={`${isBorderNoneUsername ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>

                <Form.Group className="mb-2 " controlId="formBasicPassword">
                    <div className="position-relative">
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
                        className={`${isBorderNonePassword ? '' : 'text-danger'}`}
                    ></Form.Text>
                </Form.Group>

                <div className="small mb-2 d-flex justify-content-end">
                    <a href={RouteConfig.FORGOT_PASSWORD} className="text-reset">
                        Forgot your password?
                    </a>
                </div>

                <Button
                    className="mt-3 py-3 w-75 border rounded-pill align-self-center "
                    variant="danger"
                    type="submit"
                >
                    {loading ? (
                        <Spinner animation="border" variant="light" className="fs-5" />
                    ) : (
                        <span>Sign In</span>
                    )}
                </Button>
                <div className="my-4 d-flex justify-content-center">
                    <p>Not have account?</p>
                    <Link to={RouteConfig.SIGN_UP} className="ms-2 text-danger">
                        Sign up now!
                    </Link>
                </div>
            </Form>
        </div>
    ) : (
        <Navigate to={RouteConfig.HOME} />
    );
}

export default SignIn;
