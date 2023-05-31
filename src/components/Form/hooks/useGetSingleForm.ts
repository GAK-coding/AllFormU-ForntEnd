import { useQuery } from 'react-query';
import { GetFormInfo } from '../../../typings/getForm';
import { getFormInfo } from '../../../api/getFormInfo';
import { useRecoilState } from 'recoil';
import { formInfo } from '../../../recoil/MakeForm/atom';

export function useGetSingleForm(id: string): [data: GetFormInfo, isLoading: boolean, isFetching: boolean] {
  const [info, setInfo] = useRecoilState(formInfo);

  const { data, isLoading, error, isError, isFetching } = useQuery<GetFormInfo>(
    ['getFormInfo', id],
    () => getFormInfo(1, +id!),
    {
      onSuccess: (data) => {
        setInfo(data);
      },
      staleTime: 60000, // 10분
      cacheTime: 90000, // 15분
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  return [data!, isLoading, isFetching];
}
