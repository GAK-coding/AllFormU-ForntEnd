import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';

export const FormTitleWrapper = styled.div`
  min-height: 20rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const TitleInput = styled.input`
  background-color: inherit;
  border: none;
  border-bottom: 1px solid #c4c4c4;

  width: 100%;
  padding-bottom: 1rem;
  font-size: 3rem;

  &:focus {
    outline: none;
  }
`;

export const Description = styled(TextArea)`
  border: none;
  background-color: black;

  &:focus {
    outline: none;
  }
`;
