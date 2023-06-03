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

export const UserInfo = styled.form`
  width: 80%;

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

export const InputInfo = styled.div`
  display: flex;
  width: 70%;
`;
export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3rem;
  & > span {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #696969;
  }

  & > button {
    margin-top: 3rem;
  }

  & > span:last-of-type {
    margin-top: 2rem;
    font-size: 1.7rem;
    font-weight: 700;
    color: #f36767;
  }
`;
