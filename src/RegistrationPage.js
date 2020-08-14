import React from 'react';
import styled from 'styled-components';
import Banner from './Banner';

const Page = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 72px;
  padding-bottom: 72px;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ImageColumn = styled.div`
  margin-bottom: 32px;

  img {
    width: 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    width: calc(33.33% - 24px);
    margin-bottom: 0;
  }
`;

const ContentColumn = styled.div`
  @media (min-width: 768px) {
    width: calc(66.66% - 24px);
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 900;
  font-size: 32px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 16px;

  @media (min-width: 1024px) {
    font-size: 48px;
    margin-bottom: 18px;
  }
`;

const Byline = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 36px;

  @media (min-width: 1024px) {
    margin-bottom: 48px;
  }

  strong {
    font-weight: 800;
  }
`;

const PromptTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 800;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 12px;
`;

const PromptResponse = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 36px;

  @media (min-width: 1024px) {
    margin-bottom: 48px;
  }
`;

const HighlightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.lightPurple};
`;

const HighlightTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 900;
  font-size: 24px;
  line-height: 1.2;
  text-align: center;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 16px;

  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const HighlightCopy = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 24px;
`;

const RegisterButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 800;
  font-size: 28px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  background: ${({ theme }) => theme.colors.navy};
  border-radius: 4px;

  cursor: pointer;
  border: none;

  padding: 12px 24px;

  &:hover {
    background: ${({ theme }) => theme.colors.purple};
  }
`;

export default function RegistrationPage(props) {
  const {
    pageFields: {
      firstName,
      lastName,
      email,
      slug,
      title,
      promptAnswer,
      gifTitle,
      gifUrl,
      totalSignups,
    },
  } = props;

  const highlightTitle = totalSignups
    ? `${firstName} has registered ${totalSignups} new voter${totalSignups > 1 ? 's' : ''} voters so far!`
    : `${firstName} is trying to reigster 20 new voters before election day`;

  return (
    <React.Fragment>
      <Banner />
      <Page>
        <ImageColumn>
          <img src={gifUrl} alt={gifTitle} />
        </ImageColumn>
        <ContentColumn>
          <Title>{title}</Title>
          <Byline>Created by <strong>{firstName} {lastName}</strong></Byline>
          <PromptTitle>Why voting is important to me</PromptTitle>
          <PromptResponse>{promptAnswer}</PromptResponse>
          <HighlightBox>
            <HighlightTitle>{highlightTitle}</HighlightTitle>
            <HighlightCopy>Make sure you and all of your friends  are registered to vote by using our online voter registration form and sharing this page.</HighlightCopy>
            <RegisterButton>register to vote</RegisterButton>
          </HighlightBox>
        </ContentColumn>
      </Page>
    </React.Fragment>
  );
}
