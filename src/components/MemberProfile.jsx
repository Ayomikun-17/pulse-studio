
import { useEffect, useState } from "react";

function MemberProfile() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/member",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load member profile."
          );
        }

        setMember(data.user);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, []);

  if (loading) {
    return <p>Loading your profile...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>{error}</p>
        <p>Please log in again if your session has expired.</p>
      </div>
    );
  }

  if (!member) {
    return <p>No member details found.</p>;
  }

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-6 text-gray-900 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Member Profile
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Full name</p>
          <p className="font-semibold">{member.full_name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email address</p>
          <p className="font-semibold">{member.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Member ID</p>
          <p className="font-semibold">{member.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Account created</p>
          <p className="font-semibold">
            {member.created_at
              ? new Date(member.created_at).toLocaleDateString()
              : "Not available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MemberProfile;

