import React, { useEffect } from 'react';
import { useVTTUser } from '../../common/VTTUser';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RollModalProvider } from './rolls/RollModal';
import { SessionConnectionProvider } from '@/pages/vtt/sessions/useSessionConnection';
import { RollsProvider } from '@/pages/vtt/rolls/useRolls';

export const VTT: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useVTTUser();

  const forwardToLogin = !user.authenticated && location.pathname != '/vtt/login';
  const forwardToApp = user.authenticated && location.pathname == '/vtt/login';

  useEffect(() => {
    if (forwardToLogin) {
      navigate('/vtt/login');
    } else if (forwardToApp) {
      navigate('/vtt/characters');
    }
  }, [user, location]);

  if (forwardToLogin || forwardToApp) {
    return null;
  }

  return (
    <>
      <SessionConnectionProvider>
        <RollsProvider>
          <RollModalProvider>
            <Outlet />
          </RollModalProvider>
        </RollsProvider>
      </SessionConnectionProvider>
    </>
  );
};
