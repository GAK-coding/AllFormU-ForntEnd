import { atom } from 'recoil';
import {
  FormInfo,
  DescriptionQue,
  SelectionQue,
  GridQue,
  DESCRIPTION_SHORT,
  DESCRIPTION_LONG,
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_TIME,
  SELECTION_LINEAR,
  SELECTION_DROPDOWN,
  SELECTION_CHECKBOX,
  SELECTION_OPTION,
  GRID_RADIO,
  GRID_CHECKBOX,
  SectionType,
} from '../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export const questionTypes = atom({
  key: 'questionTypes',
  default: {
    Description: [DESCRIPTION_SHORT, DESCRIPTION_LONG, DESCRIPTION_DATE, DESCRIPTION_TIME, DESCRIPTION_IMG],
    Selection: [SELECTION_OPTION, SELECTION_CHECKBOX, SELECTION_DROPDOWN, SELECTION_LINEAR],
    Grid: [GRID_RADIO, GRID_CHECKBOX],
  },
});

export const nowQuestion = atom<{ row: number; col: number }>({
  key: 'nowQuestion',
  default: { row: 0, col: 0 },
});

export const nowFocusIndex = atom<number>({
  key: 'nowFocusIndex',
  default: 0,
});

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', content: '' } });

export const questions = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'questions',
  default: [
    [
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: false,
        title: '',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const promiseTemplate = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'promiseTemplate',
  default: [
    [
      {
        type: SELECTION_CHECKBOX,
        tempId: uuid(),
        required: true,
        title: '가능한 요일을 선택해 주세요.',
        sectionNum: 0,
        options: [
          {
            content: '월',
          },
          {
            content: '화',
          },
          {
            content: '수',
          },
          {
            content: '목',
          },
          {
            content: '금',
          },
        ],
      },
      {
        type: DESCRIPTION_TIME,
        tempId: uuid(),
        required: true,
        title: '예상 도착 시간',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '논의할 내용',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '기타 의견',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const attendanceTemplate = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'attendanceTemplate',
  default: [
    [
      {
        type: SELECTION_OPTION,
        tempId: uuid(),
        required: true,
        title: '참석 가능하신가요?',
        sectionNum: 0,
        options: [
          {
            content: '네',
          },
          {
            content: '아니요',
          },
        ],
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: false,
        title: '같이 참석하는 사람이 있으면 적어주세요.',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: SELECTION_OPTION,
        tempId: uuid(),
        required: false,
        title: '행사에 관해 어떻게 알게 되셨나요?',
        sectionNum: 0,
        options: [
          {
            content: '웹사이트',
          },
          {
            content: '광고',
          },
          {
            content: 'SNS',
          },
          {
            content: '지인',
          },
        ],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '기타 의견',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const resumeTemplate = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'resumeTemplate',
  default: [
    [
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '이름',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '이메일',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '전화번호',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: SELECTION_OPTION,
        tempId: uuid(),
        required: true,
        title: '관심 있는 직책',
        sectionNum: 0,
        options: [
          {
            content: '직책 1',
          },
          {
            content: '직책 2',
          },
          {
            content: '직책 3',
          },
        ],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: true,
        title: '지원동기를 작성해주세요.',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const evaluationTemplate = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'evaluationTemplate',
  default: [
    [
      {
        type: SELECTION_DROPDOWN,
        tempId: uuid(),
        required: true,
        title: '노력한 정도',
        sectionNum: 0,
        options: [
          {
            content: '부족함',
          },
          {
            content: '괜찮음',
          },
          {
            content: '만족스러움',
          },
          {
            content: '매우 좋음',
          },
          {
            content: '훌륭함',
          },
        ],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '어떤 면이 가장 유용하거나 가치 있었나요?',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '어떻게 개선할 수 있을까요?',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '종합적인 평가를 해주세요.',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const demandTemplate = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'demandTemplate',
  default: [
    [
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '주문하려는 상품이 무엇인가요?',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
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
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '이름',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '이메일',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '전화번호',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: DESCRIPTION_LONG,
        tempId: uuid(),
        required: false,
        title: '추가 문의 사항을 적어주세요.',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const sectionNames = atom<string[]>({ key: 'sectionNames', default: [''] });

export const sectionLens = atom<number[]>({ key: 'sectionLens', default: [] });

export const changeSection = atom<boolean>({ key: 'changeSection', default: false });

export const queSectionNum = atom<SectionType[]>({ key: 'queSectionNum', default: [{ value: '0', label: '1' }] });

export const formFix = atom({ key: 'formFix', default: false });
