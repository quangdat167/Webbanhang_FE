import { ReactNode } from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
    children: ReactNode;
}

function GlobalStyles({ children }: GlobalStylesProps) {
    return <>{children}</>;
}

export default GlobalStyles;
