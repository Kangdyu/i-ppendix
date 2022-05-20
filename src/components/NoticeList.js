import styled from 'styled-components';
import { formatDate } from '../utils/date';
import ContentCard from './ContentCard';
import { StrongText, Text } from './Text';

const Anchor = styled.a`
  width: 100%;
  text-decoration: none;
`;

const FavoriteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 30px;
  height: 30px;
  margin-right: 12px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
`;

function NoticeList({ title, notices, ...props }) {
  return (
    <ContentCard title={title} {...props}>
      <ContentCard.List>
        {notices.length === 0 && <StrongText>등록된 공지가 없어요</StrongText>}
        {notices.map(notice => (
          <ContentCard.ListItem key={notice.id}>
            <FavoriteButton onClick={() => console.log('clicked')}>
              ☆
            </FavoriteButton>
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
