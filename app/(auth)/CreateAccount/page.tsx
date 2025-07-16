import HeroContent from "../login/components/HeroContent";
import Register from "./components/Register";

export default function CreateAccount() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Register />
      <HeroContent />
    </div>
  );
}
