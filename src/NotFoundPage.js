import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 50vh;
`;

const Header = styled.h1`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 700;
  font-size: 36px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.navy};
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function NotFoundPage() {
  return (
    <Container>
      <Header>Page not found</Header>
      <Link href="/">← Back home</Link>
    </Container>
  );
}
