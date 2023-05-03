import styled from 'styled-components';

export const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  .ant-select .ant-select-selector {
    background-color: inherit;
  }

  & > span {
    margin: 0 1rem;
  }
`;

export const SelectionBoxWrapper = styled.div`
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    min-height: 6rem;

    & > span {
      margin-right: 0.5rem;
      color: #c4c4c4;
    }

    & > div {
      display: flex;
      align-items: flex-end;

      width: 40%;
      padding-left: 0.5rem;
      box-sizing: border-box;

      margin-bottom: 0.5rem;

      & > button {
        margin-right: 1rem;
      }
    }
  }
`;

export const DeleteOption = styled.span`
  font-size: 1.8em;
  margin-left: 0.5rem;
  cursor: pointer;
`;
