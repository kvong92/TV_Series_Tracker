import Connexion from "./connexion";
import Inscription from "./inscription";

interface AuthManagerProps {
  component: string;
}

export default function AuthManager({ component }: AuthManagerProps) {
    return (
        <div>
            {component === "connexion" && <Connexion />}
            {component === "inscription" && <Inscription />}
        </div>
    )
}