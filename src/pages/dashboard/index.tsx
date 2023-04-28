import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";

const Dashboard = (props: { session: Session }) => {
  const { data: session } = useSession();
  return <div>Dashboard</div>;
};

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async ({ req }: GetServerSidePropsContext) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
