import styled from 'styled-components';
import { Modal } from 'antd';

export const ResModal = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;

    border: 3px solid var(--color-main);
    border-radius: 3rem;

    min-width: 60rem;
    min-height: 70rem;

    height: 80vh;

    padding-bottom: 0;

    & > div:first-of-type {
      height: 4%;

      display: flex;
      align-items: center;
    }
  }

  .ant-modal-body {
    max-height: 95%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const ResModalTitle = styled.h2`
  color: var(--color-main);
`;

export const ResModalTalk = styled.div`
  border-bottom: none;

  overflow-y: scroll;
  height: 90%;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const ResModalInput = styled.form`
  border-top: 1px solid #c4c4c4;
  margin-left: -2.4rem;
  margin-right: -2.4rem;

  height: 10%;

  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    background-color: inherit;
  }

  & > button {
    margin-left: 3rem;
  }
`;
