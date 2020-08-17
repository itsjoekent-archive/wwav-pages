import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.white};
  border-top: 2px solid ${({ theme }) => theme.colors.navy};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 300px;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.openSans};
    font-weight: 300;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.navy};
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.5px;

    @media (min-width: 768px) {
      text-align: right;
    }
  }
`;

const LegalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: 0;
    align-items: flex-end;
  }
`;

const LegalLinksRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 12px;

  a {
    font-family: ${({ theme }) => theme.fonts.openSans};
    font-weight: 300;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.navy};
    text-decoration: underline;

    margin-left: 12px;
  }
`;

export default function Footer() {
  return (
    <Layout>
      <a href="https://www.whenweallvote.org/">
        <img src="/logo.png" alt="When We All Vote logo" />
      </a>
      <LegalContainer>
        <LegalLinksRow>
          <a href="https://www.whenweallvote.org/terms-and-conditions">Terms and Conditions</a>
          <a href="https://www.whenweallvote.org/privacy-policy">Privacy Policy</a>
        </LegalLinksRow>
        <span>When We All Vote is a 501(c)(3) non-profit organization</span>
      </LegalContainer>
    </Layout>
  );
}
