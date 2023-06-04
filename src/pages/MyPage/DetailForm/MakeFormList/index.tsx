import { useRecoilValue } from 'recoil';
import Button from '../../../../components/ui/Button';
import { BottomBox, ButtonWrapper, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../../recoil/Color/atom';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { deleteFrom, getPagingInfo } from '../../../../api/getFormInfo';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { useMessage } from '../../../../hooks/useMessage';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();
  const ref = useRef<number | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: infiniteIsLoading,
    isFetching: infiniteIsFetching,
    isError: infiniteIsError,
    error,
  } = useInfiniteQuery(
    'makeForms',
    ({ pageParam = 0 }) => getPagingInfo({ userId: 1, pageParam }), // pageParam의 초기값을 0으로 설정
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.nextPage) {
          return allPages.length + 1;
        }
      },
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  const queryClient = useQueryClient();

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
    isSuccess: deleteIsSuccess,
  } = useMutation(deleteFrom, {
    onMutate: async (id: number) => {
      const snapshot = queryClient.getQueryData('makeForms');

      queryClient.setQueryData('makeForms', (old: any) =>
        old.pages[ref.current!].pagingData.filter((item: any) => {
          return item.id !== id;
        })
      );

      return { snapshot };
    },
    onError: (error, newData, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData('makeForms', context.snapshot);
        showMessage('error', '삭제에 실패했습니다.');
      }
    },
    onSettled() {
      queryClient.invalidateQueries('makeForms');
    },
  });

  const deleteForm = useCallback((id: number) => {
    const confirmDelete = window.confirm('이 설문을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteMutate(id);
      showMessage('success', '삭제되었습니다.');
    }
  }, []);

  if (infiniteIsLoading) return <div>loading...</div>;
  if (infiniteIsError) return <div>error...</div>;

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <HeaderWrapper>
          <span>내 생성폼</span>
        </HeaderWrapper>

        {infiniteIsFetching && <div>loading...</div>}
        <InfiniteScroll loadMore={() => fetchNextPage({ pageParam: data?.pages.length })} hasMore={hasNextPage}>
          <FormListWrapper>
            {contextHolder}
            {data?.pages?.map((page) =>
              page?.pagingData?.map((formInfo, idx) => (
                <div key={formInfo.id}>
                  <Title>
                    <span>{formInfo.title}</span>
                    <span>{formInfo.content}</span>
                  </Title>
                  <ButtonWrapper>
                    <div>
                      <Button
                        onClick={() => navigate(`/mypage/editform/${formInfo.id}`)}
                        color={'black'}
                        bgColor={lightPurple}
                        fontSize={1.3}
                        width={4}
                        height={8}
                      >
                        수정
                      </Button>
                      <Button
                        onClick={() => {
                          deleteForm(formInfo.id);
                          ref.current = idx;
                        }}
                        color={'black'}
                        bgColor={lightPurple}
                        fontSize={1.3}
                        width={4}
                        height={8}
                      >
                        삭제
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => navigate(`/statistic/${formInfo.id}`)}
                        color={'black'}
                        bgColor={blue}
                        fontSize={1.3}
                        width={10}
                        height={3.5}
                      >
                        응답보기
                      </Button>
                    </div>
                  </ButtonWrapper>
                </div>
              ))
            )}
          </FormListWrapper>
        </InfiniteScroll>
        <BottomBox />
      </Col>

      <Col span={4} />
    </Row>
  );
}
