import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ScrollToTopEle from 'components/scroll-top';
import { auth } from 'firebaseConfig/firebase';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { clearSnackbar } from 'redux/reducer/snackbar';
import { getUserInfoReducer } from 'redux/reducer/userinfo';
import { RootState } from 'redux/store';
import { getUserInfoApi } from 'service/authen.service';
import Config from 'utils/Config';
import { DefaultLayout } from './components/Layout';
import { privateRoutes, publicRoutes } from './routes';

function App() {
    const dispatch = useDispatch();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const userInfoState = useSelector((state: RootState) => state.userInfoState);
    const snackbarState = useSelector((state: RootState) => state.snackbarState);
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            if (user?.email && !userInfoState?.email) {
                const userInfo = await getUserInfoApi({ email: user?.email });
                if (userInfo?.email) {
                    dispatch(getUserInfoReducer(userInfo));
                }
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if (snackbarState.open) {
            setTimeout(() => {
                dispatch(clearSnackbar({}));
            }, 5000);
        }
    }, [snackbarState.open]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout: React.ComponentType | typeof Fragment = DefaultLayout;
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {userInfoState.role === Config.USER_ROLE_ADMIN ? (
                        privateRoutes.map((route, index) => {
                            let Layout: React.ComponentType | typeof Fragment = DefaultLayout;
                            if (route.layout === null) {
                                Layout = Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })
                    ) : (
                        <></>
                        // Redirect to sign-in if not signed in
                        // <Route path="*" element={<Navigate to={RouteConfig.SIGN_IN} />} />
                    )}
                </Routes>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={snackbarState.open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={snackbarState.severity ?? 'success'}
                        sx={{ width: '100%' }}
                    >
                        {snackbarState.content}
                    </Alert>
                </Snackbar>
                <ScrollToTopEle />
            </div>
        </Router>
    );
}

export default App;
