import styled from 'styled-components';
import { Modal } from 'antd';

export const ResModal = styled(Modal)`
  .ant-modal-content {
    border: 3px solid var(--color-main);
    border-radius: 3rem;

    min-width: 80rem;
    min-height: 60rem;

    padding-bottom: 0;
  }
`;

export const ResModalTitle = styled.h2`
  color: var(--color-main);
`;

export const ResModalTalk = styled.div`
  border-bottom: none;

  overflow-y: scroll;

  min-height: 40rem;
  max-height: 40rem;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const ResModalInput = styled.form`
  border-top: 1px solid #c4c4c4;
  width: 106.45%;
  height: 10rem;

  margin-left: -2.4rem;
  margin-right: -100rem;

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
