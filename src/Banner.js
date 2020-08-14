import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  padding: 12px 24px;
  box-sizing: border-box;
`;

const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export default function Banner() {
  const electionDay = new Date('11/03/2020');
  const difference = electionDay.getTime() - Date.now();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  let message = `${days} day${days > 1 ? 's' : ''} until election day. Are you registered to vote?`;

  if (days === 0) {
    message = 'Today is election day, make sure your voice is heard.';
  }

  if (days < 0) {
    message = 'The election happened.';
  }

  return (
    <Container>
      <Text>{message}</Text>
    </Container>
  );
}
