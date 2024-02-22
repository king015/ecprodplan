import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ProductionPlan({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Production Plan
                </h2>
            }
        >
            <Head title="Production Plan" />
        </AuthenticatedLayout>
    );
}
