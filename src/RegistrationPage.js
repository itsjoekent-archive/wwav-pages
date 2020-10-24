import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';

const fadeInFrames = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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

  opacity: 0;
  animation: ${fadeInFrames} 0.5s forwards;

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
  margin-bottom: 24px;
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
  line-height: 1.4;
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

const RegisterButton = styled.a`
  display: block;

  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 800;
  font-size: 28px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;

  background: ${({ theme }) => theme.colors.purple};
  border-radius: 4px;

  cursor: pointer;
  border: none;

  padding: 12px 24px;
  margin-bottom: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.navy};
  }
`;

const PlanLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 300;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.navy};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const ShareRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 36px;

  @media (min-width: 1024px) {
    margin-bottom: 48px;
  }

  a {
    margin-right: 12px;
    cursor: pointer;

    img {
      width: 32px;
    }
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

  const [shareLinks, setShareLinks] = React.useState({ twitterLink: '', facebookLink: '' });

  React.useEffect(() => {
    const hashtag = process.env.PROGRAM === 'msv' ? '#MySchoolVotes' : '#WhenWeAllVote'

    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(highlightTitle || '')} ${hashtag}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${highlightTitle || ''} ${hashtag}\n${window.location.href}`)}`;

    setShareLinks({ facebookLink, twitterLink });
  }, []);

  const highlightTitle = totalSignups
    ? `${firstName} has registered ${totalSignups} voter${totalSignups > 1 ? 's' : ''} so far!`
    : `${firstName} is trying to register 20 new voters before the voter registration deadline`;

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={promptAnswer} />
        <meta name="og:description" content={promptAnswer} />
        <meta name="twitter:description" content={promptAnswer} />
      </Helmet>
      <React.Fragment>
        <ImageColumn>
          <img src={gifUrl} alt={gifTitle} />
        </ImageColumn>
        <ContentColumn>
          <Title>{title}</Title>
          <Byline>Created by <strong>{firstName} {lastName}</strong></Byline>
          <PromptTitle>Why voting is important to me</PromptTitle>
          <PromptResponse>{promptAnswer}</PromptResponse>
          <ShareRow>
            <a href={shareLinks.facebookLink}>
              <img src="/facebook.png" alt="Facebook logo" />
            </a>
            <a href={shareLinks.twitterLink}>
              <img src="/twitter.png" alt="Twitter logo" />
            </a>
          </ShareRow>
          <HighlightBox>
            <HighlightTitle>{highlightTitle}</HighlightTitle>
            <HighlightCopy>Make sure you are registered to vote by completing this online registration form. Then share with all your friends to make sure they are registered too!</HighlightCopy>
            <RegisterButton href={`https://register.whenweallvote.org/?utm_campaign=msv_custom&utm_medium=web&utm_source=${slug}`}>
              register to vote
            </RegisterButton>
            <PlanLink href="https://www.whenweallvote.org/vrh/?utm_campaign=msv&utm_medium=relationaltool&utm_source=MSVrelationaltool&utm_content=msvrelationaltool&utm_term=msvrelationaltool">
              Already registered? Make a plan to vote!
            </PlanLink>
          </HighlightBox>
        </ContentColumn>
      </React.Fragment>
    </Page>
  );
}
