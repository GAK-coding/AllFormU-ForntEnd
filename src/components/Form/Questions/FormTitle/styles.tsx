import styled from 'styled-components';

export const FormTitleWrapper = styled.div`
  min-height: 15rem;
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 2rem;
  padding: 2rem;
  background-color: #f5f5f5;

  & > img {
    width: 50%;
    height: 50%;
    min-width: 20rem;
    min-height: 20rem;

    margin: 1rem 0;
  }
`;

export const TitleInput = styled.input`
  background-color: inherit;
  border: none;
  border-bottom: 1px solid #c4c4c4;

  width: 100%;
  padding-bottom: 1rem;
  font-size: 2rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;
