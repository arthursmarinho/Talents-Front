import { SignInContent } from "./components/SignInContent";
import HeroContent from "./components/HeroContent";

const SignInPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <SignInContent />
      <HeroContent />
    </div>
  );
};

export default SignInPage;
