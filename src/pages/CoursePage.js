import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoticeList from '../components/NoticeList';
import PageContentContainer from '../components/PageContentContainer';
import TodoList from '../components/TodoList';
import useNotices from '../hooks/useNotices';
import useTodos from '../hooks/useTodos';
import { MOCKUP } from '../utils/constants';

const ContentContainer = styled.section`
  display: flex;
  width: 100%;
  margin-bottom: 48px;
`;

const StyledTodoList = styled(TodoList)`
  flex: 1;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const StyledNoticeList = styled(NoticeList)`
  flex: 1;
`;

function CoursePage() {
  const { courseId } = useParams();
  const { todos, isLoading: isTodoLoading } = useTodos({
    courseId,
    mockup: MOCKUP,
  });
  const { notices, isLoading: isNoticesLoading } = useNotices({
    courseId,
    mockup: MOCKUP,
  });

  if (isTodoLoading || isNoticesLoading) return <main>Loading...</main>;

  return (
    <PageContentContainer title='Course'>
      <ContentContainer>
        <StyledTodoList title='수업' todos={todos.data.videos} />
        <StyledTodoList title='과제' todos={todos.data.assignments} />
      </ContentContainer>
      <ContentContainer>
        <StyledNoticeList title='공지사항' notices={notices.data} />
      </ContentContainer>
    </PageContentContainer>
  );
}

export default CoursePage;
