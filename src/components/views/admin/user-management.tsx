"use client";

import { useSupabaseClient } from "@/lib/hooks/context/use-supabase-context";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

const UserManagement = () => {
  const supabaseClient = useSupabaseClient();
  const [userList, setUserList] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Select the Role");
  const [roleList, setRoleList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient.rpc("get_user_list", {
        search_param: "",
        page_size: 100,
        page_offset: 0,
      });
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setUserList(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleAddUser = async (event: React.FormEvent) => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    event.preventDefault();
    try {
      await supabaseClient.auth
        .signUp({ email: email, password: password })
        .then(async (res) => {
          if (res.data) {
            if (session) await supabaseClient.auth.setSession(session);
            await supabaseClient
              .from("user_profiles")
              .insert({ id: res.data.session?.user.id, role_id: role })
              .single()
              .then(() => {
                fetchUsers();
                setEmail("");
                setPassword("");
                setIsModalOpen(false);
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (item: any) => {
    try {
      await supabaseClient
        .rpc("delete_user_id", { user_id: item.id })
        .then(() => fetchUsers());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabaseClient.from("roles").select("*");
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setRoleList(data.map((item) => ({ label: item.id, value: item.id })));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center w-full items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.role_id}</td>
                  <td>
                    {user.role_id !== "admin" && (
                      <HiOutlineTrash
                        size={16}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleDeleteUser(user)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog
        open={isModalOpen}
        id="my_modal_1"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add User</h3>
          <div className="modal-action justify-center">
            <form method="dialog" onSubmit={handleAddUser}>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  className="input input-bordered input-ghost w-full min-w-72"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="input input-bordered input-ghost w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  className="select select-bordered select-ghost w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option disabled value={"Select the Role"}>
                    Select the Role
                  </option>
                  {roleList.map((role: any, index: number) => (
                    <option key={index} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-4 pt-4 justify-end">
                <button className="btn btn-neutral">Add</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEmail("");
                    setPassword("");
                    setRole("Select the Role");
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UserManagement;
