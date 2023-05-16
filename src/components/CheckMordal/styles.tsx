import styled from 'styled-components';
import { Modal } from 'antd';

export const CheckModalWrapper = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;

    border: 3px solid var(--color-main);
    border-radius: 3rem;

    min-width: 6rem;
    min-height: 30rem;

    padding: 1rem 3rem 1rem 3rem;
    //& > div:first-of-type {
    //  height: 4%;
    //
    //  display: flex;
    //  align-items: center;
    //}
  }

  .ant-modal-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const ModalTitle = styled.h3`
  color: var(--color-main);
`;

export const UserInfo = styled.div`
  width: 70%;

  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;

  margin: auto;

  & > span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #696969;
    margin: 1rem 0 2rem 0;
  }

  & > button {
    margin-top: 2.5rem;
  }
`;
