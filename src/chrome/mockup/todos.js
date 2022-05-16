const MOCKUP_TODO_OSS = {
  data: {
    videos: [
      {
        id: 1,
        title: 'Lab11 - Python',
        courseName: '오픈소스소프트웨어실습',
        due: new Date('2022-05-15T23:59:59'),
        url: 'https://canvas.skku.edu/courses/27609/assignments/1102255',
      },
    ],
    assignments: [
      {
        id: 1,
        title: 'Team Project',
        courseName: '오픈소스소프트웨어실습',
        due: new Date('2022-05-22T23:59:59'),
        url: 'https://canvas.skku.edu/courses/27609/assignments/1069274',
      },
      {
        id: 2,
        title: 'Assignment 3 Submission',
        courseName: '오픈소스소프트웨어실습',
        due: new Date('2022-05-19T23:59:59'),
        url: 'https://canvas.skku.edu/courses/27609/assignments/1102235',
      },
    ],
  },
};

const MOCKUP_TODO_MOBILE = {
  data: {
    videos: [],
    assignments: [
      {
        id: 4,
        title:
          'Personal Project(Persentation video & report) (submit .zip file)',
        courseName: '모바일앱프로그래밍실습',
        due: new Date('2022-05-27T23:59:59'),
        url: 'https://canvas.skku.edu/courses/27136/assignments/1087903',
      },
      {
        id: 5,
        title: 'Personal Project (Source Code)',
        courseName: '모바일앱프로그래밍실습',
        due: new Date('2022-05-31T18:59:59'),
        url: 'https://canvas.skku.edu/courses/27136/assignments/1087907',
      },
    ],
  },
};

const MOCKUP_TODO_OS = {
  data: {
    videos: [],
    assignments: [],
  },
};

export const MOCKUP_TODOS = {
  1: MOCKUP_TODO_OSS,
  2: MOCKUP_TODO_MOBILE,
  3: MOCKUP_TODO_OS,
};
