import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { followUser, unfollowUser } from '../../redux/slices/userSlice';
import {
    InfoContainer,
    UserAvatar,
    TextContainer,
    Top,
    Username,
    Buttons,
    ProfileButton,
    Stat,
    StatItem,
    AboutText,
    AboutTextToggle,
    WebsiteLink,
    WebsiteLinkMarker,
} from './ProfileInfo.styled';

const aboutTextDefaultLength = 105;

function ProfileInfo({ user, setShouldReload, isCurrent = false }) {
    const dispatch = useDispatch();
    const isAboutMoreBtnVisible = user.about && user.about.length > aboutTextDefaultLength;
    const [isFullAbout, setIsFullAbout] = useState(false);

    const toggleFollow = () => {
        if (user.isFollowed) {
            dispatch(unfollowUser(user.id));
        } else {
            dispatch(followUser(user.id));
        }
        setShouldReload(true);
    }

    return (
        <InfoContainer>
            <UserAvatar src={user.picture} />
            <TextContainer>
                <Top>
                    <Username>{user.username}</Username>
                    <Buttons>
                        {isCurrent ? (
                            <NavLink to={'/profile/current/edit/'}>
                                <ProfileButton variant="contained" color="secondary">Edit profile</ProfileButton>
                            </NavLink>
                        ) : (
                            <>
                                <ProfileButton variant="contained" onClick={toggleFollow}>
                                    {user.isFollowed ? 'Unfollow' : 'Follow'}
                                </ProfileButton>
                                <NavLink to={`/messages/${user.id}`}>
                                    <ProfileButton variant="contained" color="secondary">Message</ProfileButton>
                                </NavLink>
                            </>
                        )}
                    </Buttons>
                </Top>

                <Stat>
                    <StatItem><strong>{user.postsCount}</strong> posts</StatItem>
                    <StatItem><strong>{user.followersCount}</strong> followers</StatItem>
                    <StatItem><strong>{user.followsCount}</strong> following</StatItem>
                </Stat>

                {user.about && (
                    <AboutText>
                        {!isFullAbout && isAboutMoreBtnVisible ? `${user.about.substring(0, aboutTextDefaultLength)} …` : user.about}
                        {isAboutMoreBtnVisible && (
                            <AboutTextToggle onClick={() => setIsFullAbout(prev => !prev)}>
                                {isFullAbout ? 'less' : 'more'}
                            </AboutTextToggle>
                        )}
                    </AboutText>
                )}

                {user.website && (
                    <Link to={user.website} target="_blank" style={{ alignSelf: 'flex-start' }}>
                        <WebsiteLinkMarker />
                        <WebsiteLink>{user.website}</WebsiteLink>
                    </Link>
                )}

            </TextContainer>
        </InfoContainer>
    );
}

export default ProfileInfo;