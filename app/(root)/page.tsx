import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.action";

export default async function Home() {
  const user: User | null = await getCurrentUser();
  if (!user) {
    return <p>Loading or please sign in...</p>;
  }

  const userInterviews = user?.id ? await getInterviewsByUserId(user.id) : null;

  const allInterviews = user?.id
    ? await getLatestInterviews({ userId: user.id })
    : null;

  // Filter taken interviews (user's interviews that have feedback)
  const takenInterviews = userInterviews
    ? await Promise.all(
        userInterviews.map(async (interview) => {
          const feedback = await getFeedbackByInterviewId({
            interviewId: interview.id,
            userId: user.id,
          });
          return feedback ? interview : null;
        })
      ).then((results) => results.filter(Boolean))
    : [];

  // Filter available interviews (user's interviews without feedback + other users' interviews)
  const userInterviewsWithoutFeedback = userInterviews
    ? await Promise.all(
        userInterviews.map(async (interview) => {
          const feedback = await getFeedbackByInterviewId({
            interviewId: interview.id,
            userId: user.id,
          });
          return !feedback ? interview : null;
        })
      ).then((results) => results.filter(Boolean))
    : [];

  const availableInterviews = [
    ...(userInterviewsWithoutFeedback || []),
    ...(allInterviews || []),
  ];

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Available Interviews</h2>

        <div className="interviews-section">
          {availableInterviews && availableInterviews.length > 0 ? (
            availableInterviews
              .filter((interview): interview is Interview => Boolean(interview))
              .map((interview) => (
                <InterviewCard
                  key={interview?.id}
                  userId={user?.id}
                  interviewId={interview?.id}
                  role={interview?.role}
                  type={interview?.type}
                  techstack={interview?.techstack}
                  createdAt={interview?.createdAt}
                  company={interview?.company}
                />
              ))
          ) : (
            <p>No interviews available at the moment</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Taken Interviews</h2>

        <div className="interviews-section">
          {takenInterviews && takenInterviews.length > 0 ? (
            takenInterviews
              .filter((interview): interview is Interview => Boolean(interview))
              .map((interview) => (
                <InterviewCard
                  key={interview?.id}
                  userId={user?.id}
                  interviewId={interview?.id}
                  role={interview?.role}
                  type={interview?.type}
                  techstack={interview?.techstack}
                  createdAt={interview?.createdAt}
                  company={interview?.company}
                />
              ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
    </>
  );
}
