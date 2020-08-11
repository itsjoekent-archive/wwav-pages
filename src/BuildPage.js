import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Banner from './Banner';

const giphyFetch = new GiphyFetch(process.env.GIPHY_SDK_KEY);

const Page = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 72px;
  padding-bottom: 72px;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 700;
  font-size: 28px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 32px;

  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const LineBreak = styled.div`
  display: block;
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 48px;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 72px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const FormQuestionColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    width: calc(50% - 48px);
    margin-right: 48px;
    margin-bottom: 0;
  }
`;

const FormQuestionStep = styled.span`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const FormQuestionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 1.2;
`;

const FormInputColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  text-transform: uppercase;
  margin-bottom: 4px;

  ${({ hasError }) => hasError && css`
    color: ${({ theme }) => theme.colors.red};
  `}
`;

const FormWordCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.navy};
  margin-left: 4px;

  ${({ hasError }) => hasError && css`
    color: ${({ theme }) => theme.colors.red};
  `}
`;

const FormLabelRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormError = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.red};
  margin-top: 4px;
`;

const FormInfo = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.navy};
  margin-top: 4px;

  strong {
    font-weight: 800;
    text-decoration: none;
  }
`;

const SingleLineTextInput = styled.input`
  display: block;
  border: 4px solid ${({ theme }) => theme.colors.navy};
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.navy};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6px 8px;

  ${({ hasError }) => hasError && css`
    border-color: ${({ theme }) => theme.colors.red};
  `}
`;

const MultiLineTextInput = styled.textarea`
  display: block;
  border: 4px solid ${({ theme }) => theme.colors.navy};
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.navy};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6px 8px;

  ${({ hasError }) => hasError && css`
    border-color: ${({ theme }) => theme.colors.red};
  `}
`;

const FormFieldVerticalLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${FormInputColumn} {
    width: 100%;
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const FormFieldSplitLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${FormInputColumn} {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 425px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    ${FormInputColumn} {
      width: calc(50% - 12px);
      margin-bottom: 0;
    }
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const GifResetButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 800;
  font-size: 12px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;

  border: 2px solid ${({ theme }) => theme.colors.gray};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;

  cursor: pointer;

  padding: 6px 12px;

  &:hover {
    color: ${({ theme }) => theme.colors.darkGray};
    border: 2px solid ${({ theme }) => theme.colors.darkGray};
  }
`;

const SubmissionRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SubmitPrompt = styled.h3`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 700;
  font-size: 32px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const SubmitButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: 800;
  font-size: 28px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  background: ${({ theme }) => theme.colors.purple};
  border-radius: 4px;

  cursor: pointer;
  border: none;

  padding: 12px 24px;

  &:hover {
    background: ${({ theme }) => theme.colors.darkPurple};
  }
`;

const SubmissionError = styled.p`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.red};
  line-height: 1.2;
  text-align: center;
  margin-top: 24px;
`;

const labelMap = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  slug: 'Page URL',
  title: 'Title',
  promptAnswer: 'Voting prompt',
};

export default function BuildPage() {
  const [state, dispatch] = React.useReducer(
    (state, action) => action(state),
    {
      values: { gifQuery: 'voting' },
      isFocused: {},
      hasFocusedOnce: {},
      validation: {},
      hasPrefilled: {},
      hideGifGallery: false,
      hasSubmitted: false,
      formError: null,
      isSlugTaken: false,
    },
  );

  const previousValuesRef = React.useRef({ gifQuery: 'vote' });
  const previousValues = previousValuesRef.current;

  React.useEffect(() => {
    previousValuesRef.current = state.values;
  }, [
    state.values,
  ]);

  function shouldShowError(fieldId) {
    return state.hasFocusedOnce[fieldId]
      && !state.isFocused[fieldId]
      && !!state.validation[fieldId];
  }

  function textFieldPropsGenerator(fieldId) {
    function onChange(event) {
      const { target: { value } } = event;

      dispatch((copy) => ({
        ...copy,
        hasSubmittedForm: false,
        values: {
          ...copy.values,
          [fieldId]: value,
        },
      }));
    }

    function onFocus() {
      dispatch((copy) => ({
        ...copy,
        hasFocusedOnce: {
          ...copy.hasFocusedOnce,
          [fieldId]: true,
        },
        isFocused: {
          ...copy.isFocused,
          [fieldId]: true,
        },
      }));
    }

    function onBlur() {
      dispatch((copy) => ({
        ...copy,
        isFocused: {
          ...copy.isFocused,
          [fieldId]: false,
        },
      }));
    }

    return {
      value: state.values[fieldId] || '',
      hasError: shouldShowError(fieldId),
      onChange,
      onFocus,
      onBlur,
    };
  }

  React.useEffect(() => {
    const required = [
      'firstName',
      'lastName',
      'email',
      'slug',
      'title',
      'promptAnswer',
    ];

    const validation = {
      firstName: null,
      lastName: null,
      email: null,
      title: null,
      promptAnswer: null,
      slug: null,
    };

    required.forEach((key) => {
      if (!state.values[key]) {
        validation[key] = `${labelMap[key]} is required.`;
      }
    });

    if (!validation['email'] && !/\S+@\S+\.\S+/.test(state.values['email'])) {
      validation['email'] = 'Incorrect email format.';
    }

    if (!validation['slug'] && !/^[a-zA-Z0-9-_]+$/.test(state.values['slug'])) {
      validation['slug'] = 'Page URL can only contain letters, numbers, dashes and underscores.';
    }

    if (!validation['slug'] && (state.values['slug'] || '').length > 30) {
      validation['slug'] = 'Page path must be 30 characters or less.';
    }

    if (!validation['slug'] && state.isSlugTaken) {
      validation['slug'] = 'Sorry, this path is already in use!';
    }

    if (!validation['title'] && (state.values['title'] || '').length > 140) {
      validation['title'] = 'Page title must be 140 characters or less.';
    }

    if (!validation['promptAnswer'] && (state.values['promptAnswer'] || '').length > 2000) {
      validation['promptAnswer'] = 'Response must be 2000 characters or less.';
    }

    const newValidation = { ...state.validation, ...validation };

    if (JSON.stringify(newValidation) !== JSON.stringify(state.validation)) {
      dispatch((copy) => ({ ...copy, validation: newValidation }));
    }
  }, [
    dispatch,
    state.values,
    state.validation,
    state.isSlugTaken,
  ]);

  React.useEffect(() => {
    const firstName = state.values['firstName'];
    const lastName = state.values['lastName'];

    const isFirstNameFocused = !!state.isFocused['firstName'];
    const isLastNameFocused = !!state.isFocused['lastName'];

    if (
      firstName
      && lastName
      && !isFirstNameFocused
      && !isLastNameFocused
      && !state.values['slug']
      && !state.hasPrefilled['slug']
    ) {
      dispatch((copy) => ({
        ...copy,
        values: {
          ...copy.values,
          slug: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
        },
        hasPrefilled: {
          ...copy.hasPrefilled,
          slug: true,
        },
      }));
    }
  }, [
    dispatch,
    state.values,
    state.isFocused,
    state.hasPrefilled,
  ]);

  const lastSlugCheck = React.useRef(null);

  React.useEffect(() => {
    let cancel = false;

    async function checkSlug() {
      try {
        const response = await fetch(`/api/page/${state.values.slug}`);
        const json = await response.json();

        if (cancel) {
          return;
        }

        if (response.status === 200) {
          dispatch((copy) => ({ ...copy, isSlugTaken: true }));
          return;
        }

        if (response.status === 404) {
          dispatch((copy) => ({ ...copy, isSlugTaken: false }));
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (state.values.slug && lastSlugCheck.current !== state.values.slug) {
      lastSlugCheck.current = state.values.slug;
      checkSlug();
    }

    return () => cancel = true;
  }, [
    dispatch,
    state.values.slug,
    state.isSlugTaken,
  ]);

  React.useEffect(() => {
    if (state.values.gifUrl) {
      return;
    }

    if (state.values.gifQuery !== previousValues.gifQuery) {
      if (!state.hideGifGallery) {
        dispatch((copy) => ({ ...copy, hideGifGallery: true }));
      }
    }

    if (state.hideGifGallery) {
      dispatch((copy) => ({ ...copy, hideGifGallery: false }));
    }
  }, [
    dispatch,
    state.values.gifUrl,
    state.values.gifQuery,
    state.hideGifGallery,
    previousValues.gifQuery,
  ]);

  React.useEffect(() => {
    if (!state.hasSubmitted) {
      return;
    }

    let cancel = false;

    async function submit() {
      try {
        const response = await fetch('/api/page', {
          method: 'post',
          body: JSON.stringify(state.values),
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();

        if (json.error) {
          dispatch((copy) => ({
            ...copy,
            hasSubmitted: false,
            formError: json.error,
          }));
          return;
        }

        if (response.status !== 200) {
          throw new Error('Failed server response');
        }

        console.log(json);
        window.location = `/${json.page.slug}`;
      } catch (error) {
        console.error(error);
        dispatch((copy) => ({ ...copy, formError: 'Encountered error submitting form. Try again?' }))
      }
    }

    submit();
    return () => cancel = true;
  }, [
    dispatch,
    state.hasSubmitted,
    state.values,
  ]);

  function onGifClick(gif, event) {
    event.preventDefault();
    dispatch((copy) => ({
      ...copy,
      hideGifGallery: true,
      values: {
        ...copy.values,
        gifUrl: gif.images.downsized_medium.url,
        gifTitle: gif.title,
      },
    }));
  }

  function resetGif() {
    dispatch((copy) => ({
      ...copy,
      hideGifGallery: false,
      values: {
        ...copy.values,
        gifUrl: null,
        gifTitle: null,
      },
    }));
  }

  function onSubmit(event) {
    event.preventDefault();

    dispatch((copy) => ({
      ...copy,
      hasSubmitted: true,
      formError: null,
      hasFocusedOnce: {
        ...copy.hasFocusedOnce,
        email: true,
        firstName: true,
        lastName: true,
        title: true,
        slug: true,
        promptAnswer: true,
      },
    }));
  }

  console.log(state);

  return (
    <React.Fragment>
      <Banner />
      <Page>
        <Title>Create your own voter registration page</Title>
        <LineBreak />
        <form onSubmit={onSubmit}>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 1.</FormQuestionStep>
              <FormQuestionText>What’s your name?</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldSplitLayout>
              <FormInputColumn>
                <FormLabel hasError={shouldShowError('firstName')}>First name</FormLabel>
                <SingleLineTextInput {...textFieldPropsGenerator('firstName')} />
                {shouldShowError('firstName') && <FormError>{state.validation['firstName']}</FormError>}
              </FormInputColumn>
              <FormInputColumn>
                <FormLabel hasError={shouldShowError('lastName')}>Last name</FormLabel>
                <SingleLineTextInput {...textFieldPropsGenerator('lastName')} />
                {shouldShowError('lastName') && <FormError>{state.validation['lastName']}</FormError>}
              </FormInputColumn>
            </FormFieldSplitLayout>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 2.</FormQuestionStep>
              <FormQuestionText>What’s your email?</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldVerticalLayout>
              <FormInputColumn>
                <FormLabel hasError={shouldShowError('email')}>Email</FormLabel>
                <SingleLineTextInput {...textFieldPropsGenerator('email')} />
                {shouldShowError('email') && <FormError>{state.validation['email']}</FormError>}
              </FormInputColumn>
            </FormFieldVerticalLayout>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 3.</FormQuestionStep>
              <FormQuestionText>What do you want the URL  of your page to be?</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldVerticalLayout>
              <FormInputColumn>
                <FormLabelRow>
                  <FormLabel hasError={shouldShowError('slug')}>Page URL</FormLabel>
                  <FormWordCount hasError={shouldShowError('slug')}>({(state.values['slug'] || '').length}/30)</FormWordCount>
                </FormLabelRow>
                <SingleLineTextInput {...textFieldPropsGenerator('slug')} />
                {shouldShowError('slug') && <FormError>{state.validation['slug']}</FormError>}
                {!shouldShowError('slug') && state.values['slug'] && (
                  <FormInfo>Your page will be located at <strong>https://register.whenweallvote.org/{encodeURIComponent(state.values['slug'])}</strong></FormInfo>
                )}
              </FormInputColumn>
            </FormFieldVerticalLayout>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 4.</FormQuestionStep>
              <FormQuestionText>Set the title of your page, get creative!</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldVerticalLayout>
              <FormInputColumn>
                <FormLabelRow>
                  <FormLabel hasError={shouldShowError('title')}>Title</FormLabel>
                  <FormWordCount hasError={shouldShowError('title')}>({(state.values['title'] || '').length}/140)</FormWordCount>
                </FormLabelRow>
                <SingleLineTextInput {...textFieldPropsGenerator('title')} />
                {shouldShowError('title') && <FormError>{state.validation['title']}</FormError>}
              </FormInputColumn>
            </FormFieldVerticalLayout>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 5.</FormQuestionStep>
              <FormQuestionText>Share why voting is important to you.</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldVerticalLayout>
              <FormInputColumn>
                <FormLabelRow>
                  <FormLabel hasError={shouldShowError('promptAnswer')}>why is voting important to you?</FormLabel>
                  <FormWordCount hasError={shouldShowError('promptAnswer')}>({(state.values['promptAnswer'] || '').length}/2000)</FormWordCount>
                </FormLabelRow>
                <MultiLineTextInput rows="4" {...textFieldPropsGenerator('promptAnswer')} />
                {shouldShowError('promptAnswer') && <FormError>{state.validation['promptAnswer']}</FormError>}
              </FormInputColumn>
            </FormFieldVerticalLayout>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormQuestionColumn>
              <FormQuestionStep>step 6.</FormQuestionStep>
              <FormQuestionText>Pick your favorite Gif to grab their attention!</FormQuestionText>
            </FormQuestionColumn>
            <FormFieldVerticalLayout>
              {!state.hideGifGallery && (
                <React.Fragment>
                  <FormInputColumn>
                    <FormLabel hasError={shouldShowError('gifQuery')}>Search Giphy</FormLabel>
                    <SingleLineTextInput {...textFieldPropsGenerator('gifQuery')} />
                    {shouldShowError('gifQuery') && <FormError>{state.validation['gifQuery']}</FormError>}
                  </FormInputColumn>
                  <Carousel
                    gifHeight={200}
                    fetchGifs={(offset) => giphyFetch.search(state.values.gifQuery, { offset, limit: 10, rating: 'g' })}
                    hideAttribution={true}
                    onGifClick={onGifClick}
                  />
                </React.Fragment>
              )}
              {state.values.gifUrl && (
                <React.Fragment>
                  <img src={state.values.gifUrl} alt={state.values.gifTitle} />
                  <GifResetButton onClick={resetGif}>Pick a different gif</GifResetButton>
                </React.Fragment>
              )}
            </FormFieldVerticalLayout>
          </FormFieldContainer>
          <SubmissionRow>
            <SubmitPrompt>Ready to share?</SubmitPrompt>
            <SubmitButton type="submit">publish</SubmitButton>
            {state.formError && (
              <SubmissionError>{state.formError}</SubmissionError>
            )}
          </SubmissionRow>
        </form>
      </Page>
    </React.Fragment>
  );
}
