import styled from 'styled-components';
import { Modal } from 'antd';

export const MakeFormModalWrapper = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;

    border: 3px solid var(--color-main);
    border-radius: 3rem;

    min-width: 6rem;
    min-height: 35rem;

    padding-bottom: 0;

    //& > div:first-of-type {
    //  height: 4%;
    //
    //  display: flex;
    //  align-items: center;
    //}
  }

  .ant-modal-body {
    //max-height: 95%;
    //min-height: 95%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const FormInfoWrapper = styled.div`
  //border: 1px solid;
  //height: 100%;
`;

export const FormInfo = styled.div`
  display: flex;
  margin-bottom: 4rem;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > span:first-of-type {
    width: 30%;

    font-weight: 700;
    font-size: 1.8rem;
  }

  & > span:last-of-type {
    width: 70%;

    display: flex;
    justify-content: space-evenly;

    //& > button {
    //  border: 1px solid #c4c4c4;
    //}
  }
`;

export const CreateForm = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
