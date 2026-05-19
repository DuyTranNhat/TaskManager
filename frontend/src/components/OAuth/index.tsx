import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '~/utils/firebase';
import { useAuth } from '~/Context';
import { LoginGoogleRequest, LoginRequest } from '~/Models';

export default function OAuth() {
  const { loginGoogle } = useAuth()
  const handleGoogleClick = async ( event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const loginRequestDTO: LoginGoogleRequest = {
        fullName: result.user.displayName!,
        email: result.user.email!,
      }

      loginGoogle(loginRequestDTO)
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <div className="flex items-center justify-center cursor-pointer dark:bg-gray-800">
     <button onClick={handleGoogleClick} className="cursor-pointer px-4 py-2 flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  outline-none">   <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <span>Login with Google</span>
      </button>
    </div>

  );
}



// className="bg-gradient-color  my-2 h-8 w-full cursor-pointer rounded-lg font-bold text-white hover:shadow-lg"
