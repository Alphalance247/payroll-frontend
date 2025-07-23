import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";
import ProtectedRoute from "../common/protectedRoute";

const Storage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <HeadingSubHead heading="Storage" withSubHead={false} />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
