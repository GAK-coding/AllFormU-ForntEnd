import styled from 'styled-components';
import Button from '../../../components/ui/Button';

export const SelectContainer = styled.div`
  border: 10px solid var(--color-light-purple);
  border-radius: 2rem;

  width: 70%;
  height: 70vh;

  margin: 0 auto;
  margin-top: 7rem;
  padding: 2rem 4rem;
  box-sizing: border-box;
`;

export const SelectTop = styled.div`
  height: 20%;
  display: flex;
  align-items: center;

  & > span {
    font-size: 3rem;
    font-weight: 700;
  }
`;

export const SelectBottom = styled.div`
  height: 80%;

  display: flex;
`;

export const SelectBottomLeft = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > button {
    border-radius: 2rem;
    border: 3px solid #dbdbdb;
    margin-bottom: 2rem;

    & > span {
      font-size: 10rem;
    }

    &:hover {
      background-color: var(--color-light-purple);
      color: white;
      border: transparent;
    }
  }
  & > span {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const SelectBottomRight = styled.div`
  width: 70%;

  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    & > button {
      border-radius: 2rem;
      border: 3px solid #dbdbdb;

      margin-bottom: 1rem;

      &:hover {
        background-color: var(--color-light-purple);
        color: white;
        border: transparent;
      }

      img {
        width: 50%;
      }
    }

    & > span {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

export const Template = styled(Button)``;
