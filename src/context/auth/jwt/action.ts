
import { setSession } from './index';
import axios, { endpoints } from '../../../lib/axios';

export type SignInParams = {
  username: string;
  password: string;
};

export type SignUpParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ username, password }: SignInParams): Promise<void> => {
  try {
    const params = { username, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(res.data));
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};



/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
