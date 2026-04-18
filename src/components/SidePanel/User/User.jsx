import { NavLink } from 'react-router-dom';

import { UserItem, UserAvatar, UserText, UserTitle } from './User.styled';

function User({ user: { id, picture, username, text } }) {
    return (
        <UserItem>
            <NavLink to={`/profile/${id}`}>
                <UserAvatar src={picture} />
            </NavLink>
            <UserText>
                <NavLink to={`/profile/${id}`}>
                    <UserTitle>{username}</UserTitle>
                </NavLink>
                {text}
            </UserText>
        </UserItem>
    );
}

export default User;