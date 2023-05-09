import styled from 'styled-components';
import { Modal } from 'antd';

export const MakeFormModalWrapper = styled(Modal)`
  .ant-modal-content {
    display: flex;
    flex-direction: column;

    border: 3px solid var(--color-main);
    border-radius: 3rem;

    min-width: 6rem;
    min-height: 30rem;

    padding-bottom: 0;

    & > div:first-of-type {
      height: 4%;

      display: flex;
      align-items: center;
    }
  }

  .ant-modal-body {
    max-height: 95%;
    min-height: 95%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
