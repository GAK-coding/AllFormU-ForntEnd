import { useRecoilValue } from 'recoil';
import Button from '../../../../components/ui/Button';
import { BottomBox, ButtonWrapper, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../../recoil/Color/atom';
import { useCallback, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { deleteFrom, getMakeForms, getPagingInfo } from '../../../../api/getFormInfo';
import { Col, Row } from 'antd';
import { GetForm } from '../../../../typings/getForm';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { formInfo } from '../../../../recoil/MakeForm/atom';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();
  const page = 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: infiniteIsLoading,
    isFetching: infiniteIsFetching,
    isError: infiniteIsError,
    error,
  } = useInfiniteQuery('makeForms', ({ pageParam = page }) => getPagingInfo({ userId: 1, pageParam }), {
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextPage) {
        // return page++;
      } else return undefined;
    },
  });

  console.log('여기', data?.pages[0]?.pagingData);

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

  const loadMoreItems = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

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
            {data?.pages[0]?.pagingData?.map((formInfo) => (
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
            ))}
          </FormListWrapper>
        </InfiniteScroll>

        {/* {makeFormInfo?.map((formInfo) => { */}
        {/*   return ( */}
        {/*     <div key={formInfo.id}> */}
        {/*       <Title> */}
        {/*         <span>{formInfo.title}</span> */}
        {/*         <span>{formInfo.content}</span> */}
        {/*       </Title> */}

        {/*       <ButtonWrapper> */}
        {/*         <div> */}
        {/*           <Button */}
        {/*             onClick={() => navigate(`/mypage/editform/${formInfo.id}`)} */}
        {/*             color={'black'} */}
        {/*             bgColor={lightPurple} */}
        {/*             fontSize={1.3} */}
        {/*             width={4} */}
        {/*             height={8} */}
        {/*           > */}
        {/*             수정 */}
        {/*           </Button> */}
        {/*           <Button */}
        {/*             onClick={() => deleteForm(formInfo.id)} */}
        {/*             color={'black'} */}
        {/*             bgColor={lightPurple} */}
        {/*             fontSize={1.3} */}
        {/*             width={4} */}
        {/*             height={8} */}
        {/*           > */}
        {/*             삭제 */}
        {/*           </Button> */}
        {/*         </div> */}
        {/*         <div> */}
        {/*           <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}> */}
        {/*             응답보기 */}
        {/*           </Button> */}
        {/*         </div> */}
        {/*       </ButtonWrapper> */}
        {/*     </div> */}
        {/*   ); */}
        {/* })} */}
        <BottomBox />
      </Col>

      <Col span={4} />
    </Row>
  );
}
