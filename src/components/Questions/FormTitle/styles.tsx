import styled from 'styled-components';

export const FormTitleWrapper = styled.div`
  min-height: 15rem;
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border: 2px solid lightgrey;
  border-radius: 2rem;
  padding: 2rem;

  .ant-input-affix-wrapper .ant-input {
    border: 1px solid red;
  }
`;

export const TitleInput = styled.input`
  background-color: inherit;
  border: none;
  border-bottom: 1px solid var(--color-sub-blue);

  width: 100%;
  padding-bottom: 1rem;
  font-size: 2rem;

  color: #655dbb;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;
