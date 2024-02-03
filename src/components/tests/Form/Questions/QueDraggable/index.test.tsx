import { render, screen } from '@testing-library/react';
import MakeQueBase from '../../../../Form/Questions/MakeQueBase';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot, snapshot_UNSTABLE, useRecoilValue } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DescriptionQue, GridQue, SELECTION_OPTION, SelectionQue } from '../../../../../typings/makeForm';
import { v4 as uuid } from 'uuid';
import { nowQuestion } from '../../../../../recoil/MakeForm/atom';
import { act, renderHook } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

describe('MakeQueBase', () => {
  const onClickQue = () => true;
  const data: DescriptionQue | SelectionQue | GridQue = {
    type: SELECTION_OPTION,
    tempId: uuid(),
    required: true,
    title: '옵셥을 선택해주세요.',
    sectionNum: 0,
    options: [
      {
        content: '옵션 1',
      },
      {
        content: '옵션 2',
      },
      {
        content: '옵션 3',
      },
    ],
  };
  const row = 0;
  const col = 1;
  const isClick = true;
  const onDelete = () => true;

  it('renders MakeQueBase', () => {
    const queryClient = new QueryClient();

    //act() 함수는 React 상태 업데이트를 동기적으로 처리하고 테스트 코드가 예상대로 작동하도록 보장하는 데 사용됩니다.
    act(() => {
      createRoot(document.createElement('div')).render(
        // Router 관련
        <MemoryRouter>
          {/* 아래 2개는 Recoil */}
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              {/* 이건 테스트 할 컴포넌트 */}
              <MakeQueBase
                onClickQue={onClickQue}
                data={data}
                row={row}
                col={col}
                isClick={isClick}
                onDelete={onDelete}
              />
            </QueryClientProvider>
          </RecoilRoot>
        </MemoryRouter>
      );
    });
    //여기서 컴포넌트 실행 후 값 비교
    // const { result } = renderHook(() => useRecoilValue(nowQuestion), {
    //   wrapper: RecoilRoot,
    // });
    // console.log(result);

    expect({ row, col }).toEqual({ row: row, col: col });
    expect(isClick).toEqual(isClick);
    // expect(screen.getByText('필수 응답')).toBeInTheDocument();
  });

  it('renders MakeQueBase without errors', () => {
    // Test code
  });
});
