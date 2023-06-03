import { useRecoilValue } from 'recoil';
import Button from '../../../../components/ui/Button';
import { BottomBox, ButtonWrapper, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../../recoil/Color/atom';
import { useCallback } from 'react';
import { useInfiniteQuery, useMutation } from 'react-query';
import { deleteFrom, getPagingInfo } from '../../../../api/getFormInfo';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();

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
      getNextPageParam: (lastPage) => {
        if (lastPage?.nextPage) {
          const nextPageNumber = lastPage.pagingData.length;
          return nextPageNumber % 2 === 0 ? nextPageNumber + 1 : nextPageNumber;
        } else {
          return undefined;
        }
      },
      // onSuccess: (data) => {
      //   console.log(data);
      // },
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  // const { data: makeFormInfo, isLoading, error, isError } = useQuery<GetForm[]>('myMakeForm', getMakeForms);

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
    isSuccess: deleteIsSuccess,
  } = useMutation(deleteFrom);

  const deleteForm = useCallback((id: number) => {
    deleteMutate(id);
  }, []);

  const loadMoreItems = useCallback(
    (page: number) => {
      fetchNextPage({ pageParam: page });
    },
    [fetchNextPage]
  );

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
        <InfiniteScroll loadMore={loadMoreItems} hasMore={hasNextPage}>
          <FormListWrapper>
            {data?.pages.map((page) =>
              page?.pagingData.map((formInfo) => (
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
                        onClick={() => deleteForm(formInfo.id)}
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
