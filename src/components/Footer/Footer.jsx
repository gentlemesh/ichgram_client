import { NavLink } from 'react-router-dom';

import navItems from '../../menu';
import { FooterBox, BottomMenu, MenuItem, Copyright } from './Footer.styled';

function Footer() {
    return (
        <FooterBox>
            <BottomMenu component="nav">
                {navItems.map(({ title, path }) => (
                    <NavLink key={path} to={path}>
                        <MenuItem>
                            {title}
                        </MenuItem>
                    </NavLink>
                ))}
            </BottomMenu>
            <Copyright>&copy; {new Date().getFullYear()} ICHgram</Copyright>
        </FooterBox>
    );
}

export default Footer;