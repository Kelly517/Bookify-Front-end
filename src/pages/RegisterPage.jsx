import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/registercomponents/RegisterForm.jsx";
import "../css/Register.css";

import { useRegister } from "../features/auth/hooks/useRegister";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    name, setName,
    lastname, setLastname,
    username, setUsername,
    email, setEmail,
    password, setPassword,
    errors,
    isLoading,
    serverError,
    submit,
  } = useRegister({
    onSuccessNavigate: () => navigate("/verification-code"),
  });

  return (
    <div>
      {isLoading ? (
        <div className="send-email-container">
          <div className="central-icon">✦</div>
          <div className="stars">
            <span className="star star1">✧</span>
            <span className="star star2">✦</span>
            <span className="star star3">✩</span>
            <span className="star star4">✦</span>
            <span className="star star5">✧</span>
          </div>
          <h2 id="send-email-desing">Enviando correo...</h2>
        </div>
      ) : (
        <RegisterForm
          name={name} setName={setName}
          lastname={lastname} setLastname={setLastname}
          username={username} setUsername={setUsername}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          errors={errors}
          serverError={serverError}
          onSubmit={submit}
          onGoToLogin={() => navigate("/login")}
          onGoHome={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default RegisterPage;
