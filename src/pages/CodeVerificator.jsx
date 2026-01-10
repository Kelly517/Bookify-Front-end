import React from "react";
import { useNavigate } from "react-router-dom";
import CodeForm from "../components/registercomponents/CodeForm";
import { useEmailVerification } from "../features/auth/hooks/useEmailVerification";

const CodeVerificator = () => {
  const navigate = useNavigate();

  const {
    email,
    code,
    setCode,
    isLoading,
    isResending,
    errorMessage,
    infoMessage,
    submit,
    resend,
  } = useEmailVerification({
    onVerified: () => navigate("/login"),
  });

  return (
    <div>
      <CodeForm
        email={email}
        code={code}
        onCodeChange={setCode}
        onSubmit={submit}
        onResend={resend}
        isLoading={isLoading}
        isResending={isResending}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
      />
    </div>
  );
};

export default CodeVerificator;
