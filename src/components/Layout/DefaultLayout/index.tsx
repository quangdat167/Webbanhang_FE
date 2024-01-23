import { ReactNode } from 'react';
import Header from '../Components/Header';
import Container from 'react-bootstrap/Container';
import Footer from './Footer';
interface DefaultLayoutProps {
    children?: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            <Container fluid style={{ minHeight: 600, marginTop: 80 }}>
                {children}
            </Container>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
