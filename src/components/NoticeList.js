import styled from 'styled-components';
import { formatDate } from '../utils/date';
import ContentCard from './ContentCard';
import { StrongText, Text } from './Text';

const Anchor = styled.a`
  text-decoration: none;
`;

function NoticeList({ title, notices, ...props }) {
  return (
    <ContentCard title={title} {...props}>
      <ContentCard.List>
        {notices.length === 0 && <StrongText>등록된 공지가 없어요</StrongText>}
        {notices.map(notice => (
          <ContentCard.ListItem key={notice.id}>
            <Anchor href={notice.url} target='_blank'>
              <ContentCard.ListItemRow>
                <StrongText>{notice.title}</StrongText>
              </ContentCard.ListItemRow>
              <ContentCard.ListItemRow>
                <Text type='weak' align='start'>
                  {notice.courseName}
                </Text>
                <Text type='weak' align='start'>
                  게시일자 {formatDate(notice.postedDate)}
                </Text>
              </ContentCard.ListItemRow>
            </Anchor>
          </ContentCard.ListItem>
        ))}
      </ContentCard.List>
    </ContentCard>
  );
}

export default NoticeList;
