import styled from 'styled-components';
import { Radio } from 'antd';

export const LinearWrapper = styled.div`
  .ant-radio-wrapper {
    display: flex;
    flex-direction: column-reverse;

    margin-top: -2rem;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  gap: 2%;
`;
