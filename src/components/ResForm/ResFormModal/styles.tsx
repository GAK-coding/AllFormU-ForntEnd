import styled from 'styled-components';
import { Modal } from 'antd';

export const ResModalTitle = styled.h2`
  color: var(--color-main);
`;

export const ResModal = styled(Modal)`
  .ant-modal-content {
    border: 3px solid var(--color-main);
    border-radius: 3rem;
  }
`;
