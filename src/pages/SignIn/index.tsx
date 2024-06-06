import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import RouteConfig from 'routes/Route';
import Config from 'utils/Config';
import validator from 'validator';
import { auth } from '../../firebaseConfig/firebase';
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

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        handleCheckValidUsername();
        handleCheckValidPassword();
        if (isValidPassword && isValidUsername) {
            setLoading(true);
            // Gọi API xử lý đăng nhập
            try {
                await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // const user = userCredential.user;
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
    useEffect(() => {
        if (userInfo?.email) {
            if (window.location.pathname !== RouteConfig.SIGN_IN) {
                window.location.reload();
            } else {
                userInfo.role === Config.USER_ROLE_ADMIN
                    ? window.open(RouteConfig.ADMIN_HOME, '_self')
                    : window.open(RouteConfig.HOME, '_self');
            }
        }
    }, [userInfo?.email]);

    return (
        <div className="mx-auto px-2 mt-4" style={{ maxWidth: '30rem' }}>
            <h2 className="text-center">Đăng nhập</h2>
            <Form className="mt-3 d-flex flex-column" ref={formRef} onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Control
                        type="text"
                        placeholder="Email"
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
                            placeholder="Mật khẩu"
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
                        Quên mật khẩu?
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
                        <span>Đăng nhập</span>
                    )}
                </Button>
                <div className="my-4 d-flex justify-content-center">
                    <p>Bạn chưa có tài khoản?</p>
                    <Link to={RouteConfig.SIGN_UP} className="ms-2 text-danger">
                        Đăng ký ngay!
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export const PopupSignIn = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <SignIn />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SignIn;
