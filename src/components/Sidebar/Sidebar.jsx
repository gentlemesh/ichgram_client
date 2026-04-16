import { NavLink } from 'react-router-dom';
import { List, ListItem } from '@mui/material';

import navItems from '../../menu';
import { SideBox, MenuItem, LinkProfile } from './Sidebar.styled';
import logo from '../../assets/logo.png';
import ProfileLinkAvatar from '../../components/ProfileLinkAvatar/ProfileLinkAvatar';

function Sidebar() {
    return (
        <SideBox>
            <NavLink to="/">
                <img src={logo} alt="Logo" width={97} />
            </NavLink>
            <List>
                {navItems.map(({ code, title, path }) => (
                    <ListItem key={path} sx={{ paddingLeft: 0 }}>
                        <NavLink to={path}>
                            {({ isActive }) => (
                                <MenuItem className={`${code} ${isActive ? 'active' : ''}`}>
                                    {title}
                                </MenuItem>
                            )}
                        </NavLink>
                    </ListItem>
                ))}
            </List>
            <NavLink to="/profile/current">
                {({ isActive }) => (
                    <LinkProfile className={isActive ? 'active' : ''}>
                        <ProfileLinkAvatar />Profile
                    </LinkProfile>
                )}
            </NavLink>
        </SideBox>
    );
}

export default Sidebar;