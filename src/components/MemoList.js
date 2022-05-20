import { useRef, useState } from 'react';
import styled from 'styled-components';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { LOCALSTORAGE_KEYS } from '../utils/constants';
import ContentCard from './ContentCard';
import { StrongText } from './Text';

const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #555;
  font-size: 18px;
  margin-right: 8px;
  padding: 6px 0;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  color: red;
`;

const MemoItemRow = styled(ContentCard.ListItemRow)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MemoText = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

function MemoList({ title, ...props }) {
  const [memos, setMemos] = useLocalStorageState(LOCALSTORAGE_KEYS.memos, []);

  const inputRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    if (!inputRef) return;

    const memo = {
      id: Date.now(),
      content: inputRef.current.value,
    };

    setMemos(memos.concat(memo));
    inputRef.current.value = '';
  }

  function onClickDeleteButton(targetMemo) {
    setMemos(memos.filter(memo => memo.id !== targetMemo.id));
  }

  return (
    <ContentCard title={title} {...props}>
      <FormContainer onSubmit={onSubmit}>
        <Input type='text' placeholder='메모를 입력하세요' ref={inputRef} />
        <Button type='submit'>+</Button>
      </FormContainer>
      <ContentCard.List>
        {memos.length === 0 && <StrongText>등록된 메모가 없어요</StrongText>}
        {memos.map(memo => (
          <ContentCard.ListItem key={memo.id}>
            <MemoItemRow>
              <MemoText>{memo.content}</MemoText>
              <DeleteButton onClick={() => onClickDeleteButton(memo)}>
                x
              </DeleteButton>
            </MemoItemRow>
          </ContentCard.ListItem>
        ))}
      </ContentCard.List>
    </ContentCard>
  );
}

export default MemoList;
