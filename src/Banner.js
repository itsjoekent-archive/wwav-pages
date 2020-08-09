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
  return (
    <Container>
      <Text>30 days until election day. Are you registered to vote?</Text>
    </Container>
  );
}
