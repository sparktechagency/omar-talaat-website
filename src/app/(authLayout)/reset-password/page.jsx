import { Suspense } from "react";
import ResetPasswordCom from "@/components/auth/ResetPassword";
import Spinner from "@/app/(commonLayout)/Spinner";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ResetPasswordCom />
      </Suspense>
    </div>
  );
};

export default page;
