import React from 'react';
import {View, Text, Vibration, TextInput, FlatList} from 'react-native';
import {IconButton} from 'react-native-paper';
import styled from 'styled-components';

import Loading from '../Loading';
import CommentContainer from './CommentContainer';

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  flex: 1;
`;

const Container = styled.View`
  padding-top: 10px;
  padding-bottom: 40px;
  flex: 1;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.back};
  font-size: 16px;
  font-family: 'Poppins-Bold';
  text-align: center;
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding-right: 7px;
  background-color: ${(props) => props.theme.colors.back};
`;

const TextInputStyle = styled.TextInput`
  height: 40px;
  font-size: 16px;
  padding-left: 15px;
  width: 90%;
  color: ${(props) => props.theme.colors.secondary};
`;

const CommentsContainer = ({comments, comment, setComment, send, sending}) => {
  return (
    <Wrapper>
      <Container>
        {sending ? (
          <View style={{position: 'absolute', left: '50%', top: '50%'}}>
            <Loading color="#10316B" />
          </View>
        ) : (
          <View />
        )}
        {comments.length !== 0 ? (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <CommentContainer comment={item} />}
          />
        ) : (
          <View>
            <Title>Bu maç ile ilgili henüz bir yorum yapılmamış.</Title>
            <Title>İlk yorumu sen yapmak ister misin ?</Title>
          </View>
        )}
        <InputContainer>
          <TextInputStyle
            onChangeText={(text) => setComment(text)}
            placeholder="Yorum yaz..."
            placeholderTextColor="#0B8457"
            value={comment}
          />
          <IconButton
            onPress={() => send()}
            style={{margin: 0, marginBottom: 5}}
            icon="send"
            size={26}
            color="#0B8457"
          />
        </InputContainer>
      </Container>
    </Wrapper>
  );
};

export default CommentsContainer;
