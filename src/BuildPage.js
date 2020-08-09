import React from 'react';
import styled, { css } from 'styled-components';
import Banner from './Banner';

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

const labelMap = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  slug: 'Page URL',
};

export default function BuildPage() {
  const [state, dispatch] = React.useReducer(
    (state, action) => action(state),
    {
      values: {},
      isFocused: {},
      hasFocusedOnce: {},
      validation: {},
      hasPrefilled: {},
    },
  );

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
    ];

    const validation = {};

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

    if (JSON.stringify(validation) !== JSON.stringify(state.validation)) {
      dispatch((copy) => ({ ...copy, validation }));
    }
  }, [
    dispatch,
    state.values,
    state.validation,
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

  return (
    <React.Fragment>
      <Banner />
      <Page>
        <Title>Create your own voter registration page</Title>
        <LineBreak />
        <form>
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
                <FormLabel hasError={shouldShowError('slug')}>Page URL</FormLabel>
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
                <FormLabel>Title</FormLabel>
                <SingleLineTextInput />
              </FormInputColumn>
            </FormFieldVerticalLayout>
          </FormFieldContainer>
        </form>
      </Page>
    </React.Fragment>
  );
}
