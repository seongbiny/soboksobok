import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Search/SearchBar';
import ResultBoard from '../components/Search/ResultBoard';
import Keyword from '../components/Search/Keyword';

function Search(){
    return(
        <StyledContainer>
            <h1>통합검색</h1>
            <SearchBar />
            <StyledMain>
                <ResultBoard />
                <Keyword />
            </StyledMain>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
    display: grid;
    justify-content: center;
    padding-top: 30px;
`;
const StyledMain = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 5vh;
`;

export default Search;