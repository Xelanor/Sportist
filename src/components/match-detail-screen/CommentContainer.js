import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.colors.back};
  border-radius: 8px;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 10px;
`;

const FirstLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 3px;
  padding-top: 6px;
  align-items: center;
`;

const Name = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-family: 'Poppins-Bold';
`;

const Date = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 12px;
  font-family: 'Poppins-MediumItalic';
`;

const SecondLine = styled.View`
  flex-direction: row;
  padding-right: 5px;
  padding-left: 10px;
  padding-bottom: 3px;
  align-items: center;
`;

const Comment = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: 'Poppins-Medium';
`;

const CommentContainer = ({comment}) => {
  return (
    <Wrapper>
      <FirstLine>
        <Name>
          {comment.user.username ? comment.user.username : 'Yeni Üye'}
        </Name>
        <Date>{moment(comment.createdAt).format('DD.MM.YY HH:mm')}</Date>
      </FirstLine>
      <SecondLine>
        <Comment>{comment.message}</Comment>
      </SecondLine>
    </Wrapper>
  );
};

export default CommentContainer;
