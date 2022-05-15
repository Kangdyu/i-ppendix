const MOCKUP_NOTICES_OSS = {
  data: [
    {
      id: 1,
      title: '금주 실습 강의 안내',
      courseName: '오픈소스소프트웨어실습',
      postedDate: new Date('2022-05-11T15:16:00'),
      url: 'https://canvas.skku.edu/courses/27609/discussion_topics/289317',
    },
    {
      id: 2,
      title: '팀프로젝트 멤버 관련 안내사항',
      courseName: '오픈소스소프트웨어실습',
      postedDate: new Date('2022-04-18T17:26:42'),
      url: 'https://canvas.skku.edu/courses/27609/discussion_topics/280568',
    },
    {
      id: 3,
      title: '금주 실습 강의 안내2',
      courseName: '오픈소스소프트웨어실습',
      postedDate: new Date('2022-04-12T02:24:12'),
      url: 'https://canvas.skku.edu/courses/27609/discussion_topics/289317',
    },
  ],
};

const MOCKUP_NOTICES_MOBILE = {
  data: [],
};

const MOCKUP_NOTICES_OS = {
  data: [
    {
      id: 1,
      title: 'For Your Linux Environment',
      courseName: '운영체제',
      postedDate: new Date('2022-04-22T16:46:11'),
      url: 'https://canvas.skku.edu/courses/30186/discussion_topics/282863',
    },
  ],
};

export const MOCKUP_NOTICES = {
  1: MOCKUP_NOTICES_OSS,
  2: MOCKUP_NOTICES_MOBILE,
  3: MOCKUP_NOTICES_OS,
};
