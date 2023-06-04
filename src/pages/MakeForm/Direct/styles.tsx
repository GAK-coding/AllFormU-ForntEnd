import styled from 'styled-components';

export const DirectForm = styled.form`
  & > button {
    margin: 0 auto;
    margin-bottom: 4rem;
  }
`;

export const AddQuestion = styled.button`
  width: 4rem;
  height: 13rem;

  margin-top: 4rem;
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

export const AddSection = styled(AddQuestion)`
  margin-left: 5em;
`;

export const ImgArea = styled.div`
  width: 100%;

  margin: 2rem 0;
  text-align: center;

  .image-item__btn-wrapper {
    display: flex;
    justify-content: center;
    gap: 2%;
    margin-top: 1rem;
  }
`;
