import styled from 'styled-components';

export const DirectWrapper = styled.div`
  font-size: 4rem;
`;

export const Drag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  width: 8rem;
  height: 3rem;

  font-size: 2.5rem;
  cursor: grab;

  border: 1px solid black;
  border-bottom: none;
  border-radius: 1rem 1rem 0 0;

  background-color: #ececec;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 2rem;
`;

export const BtnWrapper = styled.div``;

export const AddQuestion = styled.button`
  width: 4rem;
  height: 13rem;

  margin-top: 2rem;
  position: fixed;

  border: transparent;
  border-radius: 2rem;
  background-color: var(--color-sub-blue);
  cursor: pointer;

  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  & > span {
    font-size: 1.4rem;
    font-weight: 700;
    writing-mode: vertical-rl;
  }
`;
