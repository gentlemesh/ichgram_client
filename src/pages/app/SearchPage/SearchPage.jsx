import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { Box, Typography } from '@mui/material';

import { selectUsers, searchUsers, resetUsers } from '../../../redux/slices/userSlice';
import SidePanel from '../../../components/SidePanel/SidePanel';
import User from '../../../components/SidePanel/User/User';
import { SearchInputWrapper, SearchInput, SearchClearBtn, SearchResults } from './SearchPage.styled';

function SearchPage() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const users = useSelector(selectUsers);
    const doSearch = useDebouncedCallback(inputValue => dispatch(searchUsers(inputValue)), 800);

    useEffect(() => {
        dispatch(resetUsers());
        if (inputValue.length >= 3) {
            doSearch(inputValue);
        }
    }, [inputValue, doSearch, dispatch]);

    const content = (
        <>
            <Typography variant="h1">Search</Typography>
            <SearchInputWrapper>
                <SearchInput
                    placeholder="Search"
                    value={inputValue}
                    onInput={({ target: { value } }) => setInputValue(value)}
                />
                <SearchClearBtn onClick={() => setInputValue('')} />
            </SearchInputWrapper>
            <Typography variant="h2">Recent</Typography>
            <SearchResults>
                {users && Array.isArray(users) && (
                    users.length > 0
                        ? users.map(user => <User user={user} />)
                        : <Typography variant="bodyGrey">No results found</Typography>
                )}
            </SearchResults>
        </>
    );

    return <SidePanel content={content} />;
}

export default SearchPage;