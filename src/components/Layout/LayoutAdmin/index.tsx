import { ReactNode } from 'react';
import Header from '../Components/Header';
import Container from 'react-bootstrap/Container';
import DrawerLeft from './Drawer';
interface LayoutAdminProps {
    children?: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
    return (
        <div>
            <Header />
            <DrawerLeft />
            <Container
                fluid
                style={{
                    marginLeft: 240,
                    minHeight: 600,
                    marginTop: 80,
                    width: 'calc(100vw - 250px)',
                }}
            >
                {children}
            </Container>
        </div>
    );
}

export default LayoutAdmin;
