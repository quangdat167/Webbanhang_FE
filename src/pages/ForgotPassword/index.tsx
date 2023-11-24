import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../firebaseConfig/firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import validator from "validator";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import RouteConfig from "routes/Route";

function ForgotPasswordPage() {
    const userInfo = useSelector((state: RootState) => state.userInfoState);

    const stringEmtpy: string = "Vui lòng nhập trường này";

    const [loading, setLoading] = useState<Boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [isBorderNoneUsername, setIsBorderNoneUsername] = useState<Boolean>(true);
    const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
    const inputUsername = useRef<HTMLDivElement>(null);

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
                const stringFalseEmail = "Please enter correct email address";
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
        inputUsername.current!.innerHTML = "";
        setIsBorderNoneUsername(true);
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        handleCheckValidUsername();
        if (isValidUsername) {
            setLoading(true);
            // Gọi API xử lý đăng nhập
            try {
                await sendPasswordResetEmail(auth, email)
                    .then(() => {
                        setTimeout(() => {
                            window.open(RouteConfig.SIGN_IN, "_self");
                        }, 5000);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("EMAIL NOT EXIST");
                        // ..
                    });

                setLoading(false);
            } catch (error: any) {
                console.error(new Error(error.message)); // Xử lý lỗi khi đăng nhập không thành công
                setLoading(false);
            }
        }
    };

    return !userInfo?.email ? (
        <div className="mx-auto px-2" style={{ maxWidth: "30rem", marginTop: 100 }}>
            <h2 className="text-center">Forgot password</h2>
            <div className="small my-3 ">
                Lost your password? Please enter your email address. You will receive a link to
                create a new password via email
            </div>
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
                        className={`${isBorderNoneUsername ? "" : "border-danger"}`}
                    />
                    <Form.Text
                        ref={inputUsername}
                        className={`${isBorderNoneUsername ? "" : "text-danger"}`}
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
                        <span>Reset password</span>
                    )}
                </Button>
            </Form>
        </div>
    ) : (
        <Navigate to={RouteConfig.HOME} />
    );
}

export default ForgotPasswordPage;
