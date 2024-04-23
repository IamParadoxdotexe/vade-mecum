import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VButton } from '@/components/VButton';
import { VInput } from '@/components/VInput';
import { VCard } from '@/components/VCard';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { VLoader } from '@/components/VLoader';
import { useVTTUser } from '../../common/VTTUser';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .page__content {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.variable.gap.xl};
    width: 440px;

    .content__header {
      font-size: ${props => props.theme.variable.fontSize.xl};
      font-family: ${props => props.theme.variable.fontFamily.bold};
      padding-bottom: ${props => props.theme.variable.gap.xl};
      border-bottom: 1px solid ${props => props.theme.color.border.default};
    }

    .content__form {
      display: flex;
      flex-direction: column;
      gap: ${props => props.theme.variable.gap.lg};

      .form__info,
      .form__error {
        line-height: ${props => props.theme.variable.lineHeight};
        font-size: ${props => props.theme.variable.fontSize.sm};
        color: ${props => props.theme.color.text.secondary};
      }

      .form__error {
        color: ${props => props.theme.color.status.error.text};
      }
    }
  }
`;

type User = {
  id: string;
  email: string;
};

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const user = useVTTUser();

  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState<string>();

  const requestLogin = useMutation((email: string) =>
    fetch('https://api.vademecum.thenjk.com/auth/login/request', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
  );

  const login = useMutation((token: string) =>
    fetch('https://api.vademecum.thenjk.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify({
        token
      })
    }).then(response => {
      const json = response.json();
      if (response.status === 200) {
        return json as Promise<User>;
      } else {
        return json.then(Promise.reject.bind(Promise));
      }
    })
  );

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      login
        .mutateAsync(token)
        .then(user.update)
        .catch(response => {
          if (response.detail) {
            setLoginError(response.detail as string);
          }
        });
    }
  }, []);

  const onSend = () => {
    requestLogin.mutate(email);
  };

  return (
    <Page>
      {login.isLoading ? (
        <VLoader />
      ) : (
        <div className="page__content">
          <div className="content__header">Sign Up or Log In</div>

          <div className="content__form">
            <VCard style={{ padding: 0 }}>
              <VInput
                placeholder="Email"
                value={email}
                onChange={setEmail}
                disabled={requestLogin.isLoading || requestLogin.isSuccess}
                onEnter={onSend}
              />
            </VCard>

            <VButton
              size="large"
              type="primary"
              onClick={onSend}
              disabled={requestLogin.isSuccess || !email}
              loading={requestLogin.isLoading}
            >
              Continue
            </VButton>

            {requestLogin.isSuccess && (
              <div className="form__info">
                A magic link has been emailed to <strong>{email}</strong>.
                <br />
                Click the link to finish signing up or logging in.
              </div>
            )}
            {!requestLogin.isSuccess && login.isError && (
              <div className="form__error">{loginError ?? 'Something went wrong.'}</div>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};
