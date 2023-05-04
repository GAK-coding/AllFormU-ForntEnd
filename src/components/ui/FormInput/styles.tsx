import styled from 'styled-components';

export const FormInputWrapper = styled.input<{ width: string; fontSize: number }>`
  border: none;
  border-bottom: 1px solid var(--color-gray);

  background-color: inherit;
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize}rem;

  padding: 0.5rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }

  ::placeholder {
    font-weight: 700;
    color: #afafaf;
  }
`;
