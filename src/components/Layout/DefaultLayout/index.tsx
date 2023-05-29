import { ReactNode } from 'react';
import Header from './Header';

interface DefaultLayoutProps {
    children?: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            <div className="container" style={{ minHeight: '2000px' }}>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
