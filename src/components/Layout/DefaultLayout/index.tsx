import { ReactNode } from 'react';
import Header from './Header';
import Container from 'react-bootstrap/Container';
interface DefaultLayoutProps {
    children?: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            <Container>{children}</Container>
        </div>
    );
}

export default DefaultLayout;
