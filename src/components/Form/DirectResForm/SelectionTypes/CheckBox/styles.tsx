import styled from 'styled-components';
import { Checkbox } from 'antd';

export const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CustomCheckBoxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ant-checkbox-wrapper {
    margin: 0;
    margin-bottom: 1rem;
  }
`;
