import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create New Interview
      </h1>
      {user?.id && <InterviewForm userId={user?.id} />}
    </div>
  );
};

export default Page;
